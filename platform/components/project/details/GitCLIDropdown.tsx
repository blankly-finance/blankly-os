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

export default function GitCLIDropdown(props: any) {
    const [activeOption, setActiveOption] = useState("CLI");

    function changeActive() {
        if (activeOption === "Git") {
            setActiveOption("CLI");
            props.setActiveModal("CLI");
        } else {
            setActiveOption("Git");
            props.setActiveModal("Git");
        }
    }

    return (
        <Menu as="div" className="relative inline-block text-left mt-2">
            <Menu.Button className="border border-gray-300 rounded-md pl-6 pr-2 text-sm py-1.5 border-solid focus:ring-2 focus:ring-gray-800">
                <div className="font-semibold">
                    {activeOption}
                    <ChevronDownIcon className="w-4 h-4 inline ml-2" />
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
                <Menu.Items className="origin-top-right mt-2 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={changeActive}
                                    className={'block flex flex-row justify-center px-4 py-2 text-sm cursor-pointer'}
                                >
                                    <p className="font-semibold">
                                    { activeOption === "CLI" ? "Git" : "CLI"}
                                    </p>
                                </a>
                            )}
                        </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
