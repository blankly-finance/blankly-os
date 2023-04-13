/*******************************************************************/
/*                                                                 */
/*                  BLANKLY FINANCE CONFIDENTIAL                   */
/*                   _ _ _ _ _ _ _ _ _ _ _ _ _                     */
/*                                                                 */
/* Copyright 2022 Blankly Finance Incorporated                     */
/* All Rights Reserved.                                            */
/*                                                                 */
/* NOTICE:  All information contained herein is, and remains the   */
/* property of Blankly Finance Incorporated and its suppliers, if  */
/* any.  The intellectual and technical concepts contained         */
/* herein are proprietary to Blankly Finance Incorporated and its  */
/* suppliers and may be covered by U.S. and Foreign Patents,       */
/* patents in process, and are protected by trade secret or        */
/* copyright law.  Dissemination of this information or            */
/* reproduction of this material is strictly forbidden unless      */
/* prior written permission is obtained from Blankly Finance       */
/* Incorporated.                                                   */
/*                                                                 */
/*******************************************************************/

import {Fragment, useEffect, useState} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {ShareIcon} from '@heroicons/react/solid'
import {classNames, isEmail} from '@/utils/general';
import {useTeam} from '@/libs/team';
import {
  createViewOnlyCollaborator,
  getProjectInvites,
  getProjectOnce,
  getProjectUsers
} from "@/services/projects-store";
import {useRouter} from "next/router";
import UserInviteLine from "@/components/settings/project-settings/collaborators/UserInviteLine";

export default function ShareProjectButton(props: any) {
  const {active} = useTeam();
  const [name, setName] = useState(""); // what is this used for?
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const [users, setUsers] = useState<any>([]);
  const [invites, setInvites] = useState<any>([]);
  const [collaborators, setCollaborators] = useState(users);

  const router = useRouter();
  const {projectId} = router.query;

  useEffect(() => {
    const unsubscribe = getProjectUsers(projectId as string).onSnapshot((snapshot) => {
      const viewUsers = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {...data, id: doc.id};
      })
      setUsers(viewUsers)
    })
    return () => unsubscribe();
  }, [projectId])

  useEffect(() => {
    getProjectOnce(projectId as string).then((doc) => {
      const data = doc.data() as any;
      setName(data?.name);
    })
  }, [projectId])

  useEffect(() => {
    const unsubscribe = getProjectInvites(projectId as string).onSnapshot((snapshot) => {
      const inviteUsers = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {...data, id: doc.id};
      })
      setInvites(inviteUsers);
    })
    return () => unsubscribe();
  }, [projectId])

  useEffect(() => {
    setCollaborators([...users, ...invites])
  }, [users, invites])


  const handleInvite = () => {
    setValidEmail(isEmail(email));

    if (validEmail) {
      createViewOnlyCollaborator(projectId as string, {email: email, status: "invited"}).then(() => {
          setEmail("");
        }
      )
    }
  }

  return (
    <Popover as="div" className="relative z-10 inline-block text-left">
      <div>
        <Popover.Button
          className="text-sm text-gray-500 mt-.5 flex transition ease-in duration-100  items-center font-medium border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-100">
          <span className="h-4 w-4 mr-2 text-gray-400"><ShareIcon/></span> Share
        </Popover.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel
          className={classNames('origin-top-right border border-gray-100 absolute right-0 mt-2 rounded-md min-w-xl shadow-2xl bg-white  focus:outline-none w-96')}>
          <div>
            <div className="pt-6 pb-4">
              <div className="px-6">
                <div>
                  <h1 className="font-medium">Share {name}</h1>
                  <p className='text-xs mt-2 text-gray-500'>Share project models and portfolio metrics
                    seamlessly</p>
                  {
                    active.type !== 'user' ?
                      (
                        <p className="text-xs text-blue-600 mt-1">Note: Your team member permissions are separate</p>
                      ) : null
                  }
                </div>
                <hr className="my-5 -mx-6"/>
                <div className="mb-5">
                  <span className="text-sm font-medium text-gray-900">View Only Collaborators</span>
                  <div className="flex items-center mt-2">
                    <input
                      id="email"
                      name="email"
                      placeholder="Add New Email..."
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      className="appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                    <button
                      className="rounded-md transition ease-in duration-100  px-3 py-1.5 ml-2 text-sm focus:ring-gray-700 bg-gray-900 hover:bg-gray-700 text-white"
                      onClick={() => {
                        handleInvite();
                      }}
                    >Invite
                    </button>
                  </div>
                  <div className="text-red-400 w-max">
                    {
                      !validEmail ? <div className="text-sm text-center px-auto">
                        Invalid Email Address
                      </div> : null
                    }
                  </div>
                  <div className="space-y-2 mt-5">
                    {
                      collaborators?.map((user: any, index: number) => {
                        if (user.email || user?.level <= 0) {
                          return (
                            <div key={index}>
                              <UserInviteLine user={user}/>
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
