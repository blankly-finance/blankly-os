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
import {ChevronDownIcon} from '@heroicons/react/solid';
import NewBacktestModal from './modals/NewBacktestModal';
import {classNames} from '@/utils/general';
import NotFinishedModal from '../../general/modals/NotFinishedModal';


export default function RunNewBacktest(props: any) {
  const [backtestModal, setBacktestModal] = useState(false);
  const [configModal, setConfigModal] = useState(false);

  return (
    <>

      <Menu as="div" className="relative w-full md:w-auto inline-block text-left mt-2">
        <Menu.Button
          className="border w-full md:w-auto  rounded-md bg-black hover:bg-gray-800 focus:ring-2 focus:ring-gray-800">
          <div className="my-3 ml-5 mr-3 roboto text-sm text-white">
            Run New Backtest
            <ChevronDownIcon className="w-4 h-4 inline ml-1"/>
          </div>
        </Menu.Button>

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
            className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({active}) => (
                  <a
                    onClick={() => setBacktestModal(true)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-black',
                      'block px-4 py-2 text-sm cursor-pointer'
                    )}
                  >
                    Run New Backtest
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({active}) => (
                  <a
                    onClick={() => setConfigModal(true)}
                    className={classNames(
                      active ? 'bg-gray-100 text-blue-700' : 'text-blue-600',
                      'block px-4 py-2 text-sm cursor-pointer z-10'
                    )}
                  >
                    Create New Config
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <NewBacktestModal open={backtestModal} close={() => setBacktestModal(false)}/>
      <NotFinishedModal open={configModal} close={() => setConfigModal(false)} type={'feature'}
                        featureName={'backtest-configs'}/>
    </>
  )
}
