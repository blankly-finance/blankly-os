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

import {Fragment, useState} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {DotsVerticalIcon} from '@heroicons/react/solid'
import EditDescriptionModal from '@/components/general/modals/EditDescriptionModal'
import {updateVersion} from '@/services/version-store'
import {useRouter} from 'next/router'
import {classNames} from '@/utils/general'

const MoreDots = (props: any) => {
  const router = useRouter();
  const {projectId, modelId} = router.query;
  const [editDescription, setDescription] = useState(false);
  const [isRedeploy, setRedeploy] = useState(false);

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="mt-1 flex items-center text-gray-900 rounded-md">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon onClick={props.click} className="h-4 w-5" aria-hidden="true"/>
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
            className="origin-top-right absolute right-0 mt-2 w-56 z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({active}) => (
                  <a
                    onClick={() => setDescription(true)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm cursor-pointer'
                    )}
                  >
                    Edit Deployment Description
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <EditDescriptionModal
        open={editDescription}
        type='Upload'
        description={props.description}
        update={(value: string) => updateVersion(projectId as string,
          modelId as string, props.id, {description: value})}
        close={() => setDescription(false)}
      />
    </>
  )
}

export default MoreDots
