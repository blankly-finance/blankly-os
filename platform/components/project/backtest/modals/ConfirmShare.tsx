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

import {Dialog, Transition} from '@headlessui/react'
import React, {Fragment, useCallback} from 'react';
import {XIcon} from "@heroicons/react/solid";
import BlackButton from "@/components/general/buttons/BlackButton";


export default function ConfirmShare(props: { open: boolean, close: any, setConfirmCallback: CallableFunction }) {
  const closeModal = useCallback(() => {
    props.close();
  }, [props]);

  const confirmAndClose = async function () {
    props.setConfirmCallback(true)
    props.close()
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
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
              className="inline-block align-bottom bg-white rounded-lg pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:mt-8 sm:align-middle sm:max-w-2xl sm:w-full sm:pt-8 pb-6">
              <Dialog.Title as="h3"
                            className="text-2xl leading-6 font-medium text-gray-900 w-full flex px-8">
                <div>
                  Confirm Share
                </div>
                <button className="ml-auto -mt-2" onClick={() => closeModal()}>
                  <XIcon className="h-6 w-6 text-gray-500"/>
                </button>
              </Dialog.Title>
              <div className="mt-4 overflow-hidden border-t border-gray-200">
                <div className="py-4 px-8">
                  <div className="bg-gray-100 rounded-md h-80">
                    <div className="py-4 px-8">
                      By continuing, this will enable sharing for the entire model.
                    </div>
                  </div>
                </div>
              </div>
              <BlackButton click={() => confirmAndClose()}>
                Continue
              </BlackButton>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
