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

import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {classNames} from '@/utils/general';
import {CheckIcon, PlusCircleIcon, SelectorIcon} from "@heroicons/react/outline";
import {updateUser} from "@/services/user-store";
import {useAuth} from "@/libs/auth";
import {useRouter} from "next/router";
import {useTeam} from '@/libs/team';
import RoundedProfileIconWithUrl from '../profile/RoundedProfileIconWithUrl';

export default function TeamDropdown(props: { light: boolean, personal: any, options: any[] }) {

  const {uid} = useAuth();
  const {active} = useTeam();
  const router = useRouter();

  function handleClick(activeId: string) {
    updateUser(uid, {activeId: activeId}).then(() => {
      router.push(`/${activeId}`)
    })
  }

  return (
    <Menu as="div" className="relative z-10 inline-block mx-auto">
      <div>
        <Menu.Button className="relative z-10 h-9 w-9 relative rounded-full overflow-hidden object-cover">
          <SelectorIcon
            className={classNames("w-6 h-6 mx-auto font-extralight", props.light ? "text-white" : "text-gray-500")}/>
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
          className="origin-top-right z-10 absolute z-24 -right-16 mt-2 w-72 py-2 rounded-md shadow-xl border border-gray-100 bg-white focus:outline-none">
          <div className="py-1 z-10">
            <span className="text-xs text-gray-400 px-4 py-2 block">Individual Account</span>
            <Menu.Item>
              <div className={classNames(
                active.type == 'user' ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm flex items-center justify-between'
              )} onClick={() => handleClick(props.personal?.id)}>
                <div className='items-center flex'>
                  <div className="relative w-6 h-6">
                    <RoundedProfileIconWithUrl team={false} profileUrl={props.personal?.profileUrl}/>
                  </div>
                  <p
                    className={classNames("ml-3 text-sm", "text-black")}>{props.personal?.name}</p>
                </div>
                {
                  active.type === 'user' ? (
                    <div className="h-6 w-6">
                      <CheckIcon/>
                    </div>
                  ) : null
                }
              </div>
            </Menu.Item>
          </div>
          <div className="py-1 z-10">
            <span className='text-xs text-gray-400 px-4 py-2 block'>Teams</span>
            {
              props.options?.map((option: any) => {
                return (<div key={option.id}>
                  <Menu.Item>
                    <div className={classNames(
                      active.id === option.id ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm flex items-center hover:bg-gray-50'
                    )} onClick={() => handleClick(option.id)}>
                      <div className="flex items-center">
                        <div className="relative w-6 h-6">
                          <RoundedProfileIconWithUrl team={true} profileUrl={option.profileUrl}/>
                        </div>
                        <p
                          className={classNames("ml-3 text-sm", "text-black")}>{option.name}</p>
                      </div>
                      {
                        active.id === option.id ? (
                          <div className="h-6 w-6">
                            <CheckIcon/>
                          </div>
                        ) : null
                      }
                    </div>
                  </Menu.Item>
                </div>)
              })
            }
            <Menu.Item>
              <div onClick={() => router.push('/teams/create')}
                   className='text-gray-700 block px-4 py-2 text-sm flex items-center hover:bg-gray-50'>
                <div className="flex items-center">
                  <div className="relative w-5 h-5">
                    <PlusCircleIcon/>
                  </div>
                  <p
                    className="ml-3 text-sm text-black">Create New Team</p>
                </div>
              </div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
