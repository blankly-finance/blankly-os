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

import {Popover, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {AnnotationIcon} from "@heroicons/react/outline";

const TradeAnnotation = ({ annotation }: { annotation: string }) => {
    return (
        <Popover onClick={() => {}} as="div" className="relative inline-block text-left">
            <div>
                <Popover.Button>
                    <AnnotationIcon className="w-5 h-5 text-blue-500 hover:text-blue-600 mr-5"/>
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
                    className="origin-top-right absolute right-0 mt-2 w-auto z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div>
                        <div className="pt-4 pb-4 px-4 bg">
                            <h1 className="text-sm font-semibold text-blue-500">Trade Annotation</h1>
                            <div className="mt-3 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">
                                {annotation}
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

export default TradeAnnotation;
