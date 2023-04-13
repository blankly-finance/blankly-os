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
import {Menu, Transition} from '@headlessui/react'
import Image from 'next/image';
import Link from 'next/link';
import {useAuth} from '@/libs/auth';
import {classNames} from '@/utils/general';
import {useRouter} from 'next/router';
import {getProjectsOnce} from '@/services/projects-store';

export default function UserProfileIcon(props: any) {
  const {signout, uid} = useAuth();
  const router = useRouter();
  const [dashboard, setDashboard] = useState(false);
  let image = (<Image layout="fill" objectFit="cover" src="/default-profile.png" alt="Profile Photo"/>);
  if (props.profile) {
    // eslint-disable-next-line @next/next/no-img-element
    image = (<img className="object-cover h-full" alt="Profile Photo" src={props.profile}/>)
  }


  useEffect(() => {
    getProjectsOnce(uid).then((query) => {
      setDashboard(query.docs.length > 0);
    })
  }, [uid])

  return (
    <Menu as="div" className="relative inline-block text-left mt-2 z-30">
      <div>
        <Menu.Button className="h-9 w-9 border border-gray-100 relative rounded-full overflow-hidden object-cover">
          {image}
        </Menu.Button>
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
        <Menu.Items
          className="origin-top-right absolute border border-gray-100 right-0 mt-2 w-56 rounded-md shadow-2xl bg-white  divide-y divide-gray-100 focus:outline-none">
          {
            dashboard ? (
              <div className="py-1">
                <Menu.Item>
                  {({active}) => (
                    <Link href={`/${uid}`}>
                      <a
                        className={classNames(
                          router.route.indexOf('dashboard') !== -1 ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Dashboard
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            ) : null
          }
          <div className="py-1">
            <Menu.Item>
              {({active}) => (
                <a
                  onClick={() => router.push('/personal-settings/general')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  User Settings
                </a>
              )}
            </Menu.Item>
            {/* <Menu.Item>
              {({active}) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Command Panel
                </a>
              )}
            </Menu.Item> */}
          </div>
          <div className="py-1">
            <Menu.Item>
              {({active}) => (
                <button
                  onClick={signout}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm text-left w-full'
                  )}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
