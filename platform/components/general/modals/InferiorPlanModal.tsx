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

import React, {Fragment, useCallback} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {StopIcon} from '@heroicons/react/solid';
import {useRouter} from "next/router";
import OutlineButton from "@/components/general/buttons/OutlineButton";
import BlackButton from "@/components/general/buttons/BlackButton";

export default function InferiorPlanModal(props: { open: boolean, close: any, switchToInferior: any, planName: string }) {
    const router = useRouter();

    const closeModal = useCallback(() => {
        props.close(false);
    }, [props]);

    function switchInferior() {
        props.switchToInferior(props.planName);
        props.close();
    }

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
                            <div>
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                    <StopIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div>
                                    <Dialog.Title as="h3" className="mt-8 text-xl leading-6 font-medium text-gray-900">
                                        <div>
                                            Switch to {props.planName} Plan
                                        </div>
                                    </Dialog.Title>
                                    <div className="mt-2 p-4">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to switch back to Blankly {props.planName}?
                                            You&apos;ll lose all of the benefits of pro including backtest histories, live params, and more...
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <div>
                                    <OutlineButton width='full' click={switchInferior}>
                                        Yes, Switch Me to {props.planName}
                                    </OutlineButton>
                                </div>
                                <div>
                                    <BlackButton width='full' click={closeModal}>
                                        No, Take me Back 🥺
                                    </BlackButton>
                                </div>
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
