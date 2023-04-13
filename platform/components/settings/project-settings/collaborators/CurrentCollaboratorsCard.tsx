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

import {useEffect, useState} from "react";
import {classNames, splitAndCapitalize} from "@/utils/general";
import Collaborators from "./Collaborators";
import {useRouter} from "next/router";
import {getTeamInvites, getTeamUsers} from "@/services/team-store";


export default function CurrentCollaboratorsCard(props: any) {

  const router = useRouter();
  const {projectId} = router.query;

  const [users, setUsers] = useState<any>();
  const [invites, setInvites] = useState<any>([]);

  useEffect(() => {
    if (projectId) {
      const unsubscribe = getTeamUsers(projectId as string).onSnapshot((snapshot) => {
        const users = snapshot.docs.map((doc) => {
          const data = doc.data();

          if (data.level >= 0) {
            return {...data, id: doc.id};
          }
        })
        const filtered = users.filter(x => x !== undefined);
        setUsers(filtered)
      })
      return () => unsubscribe();
    }
  }, [projectId])

  useEffect(() => {
    const unsubscribe = getTeamInvites(projectId as string).onSnapshot((snapshot) => {
      const inviteUsers = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {...data, id: doc.id};
      })
      setInvites(inviteUsers);
    })
    return () => unsubscribe();
  }, [projectId])


  const [currTab, setTab] = useState<any>('members');

  return (
    <div className="mt-8 relative container border border-gray-200 w-full h-auto bg-white rounded-md pt-6">
      <div className="flex justify-between px-8 items-center">
        <h1 className="text-xl font-medium">Current {splitAndCapitalize(currTab, ' ')}</h1>
        <nav className="flex space-x-4" aria-label="Tabs">
          <button
            onClick={() => setTab('members')}
            className={classNames(
              currTab === 'members'
                ? "bg-gray-100 text-gray-700"
                : "text-gray-500 hover:text-gray-700",
              "px-3 py-2 font-medium text-sm rounded-md"
            )}
            aria-current={currTab === 'members' ? "page" : undefined}
          >
            Members
          </button>
          <button
            onClick={() => setTab('invitations')}
            className={classNames(
              currTab === 'invitations'
                ? "bg-gray-100 text-gray-700"
                : "text-gray-500 hover:text-gray-700",
              "px-3 py-2 font-medium text-sm rounded-md"
            )}
            aria-current={currTab === 'invitations' ? "page" : undefined}
          >
            Invitations
          </button>
        </nav>
      </div>
      <hr className="mt-4"/>
      {
        currTab == 'members' ? <Collaborators type={"user"} data={users}/> :
          <Collaborators type={"invite"} data={invites}/>}

    </div>
  )
}
