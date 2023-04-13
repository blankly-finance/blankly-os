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

import {Fragment, useCallback} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useRouter} from "next/router";
import OutlineButton from "@/components/general/buttons/OutlineButton";
import CopyClipboardButton from "@/components/general/buttons/CopyClipboardButton";


const validate = (values: any) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = 'Model Name is Required';
  }
  if (!values.description) {
    errors.description = 'Model Description is Required';
  }
  return errors;
};

const profile = "https://source.unsplash.com/random";

export default function SignalsOverviewModal(props: { open: boolean, close: any, output: any, name: string }) {
  const router = useRouter();
  const closeModal = useCallback(() => {
    props.close();
  }, [props]);

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

          {/* This element is to trick the browser into centering the modal contents. */}
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
              className="inline-block max-w-4xl align-bottom bg-white rounded-lg shadow-xl transform transition-all my-8 sm:align-middle w-4/5">
              <div className="flex flex-col items-start">
                <div className="bg-white py-5 w-full rounded-t-lg border-b flex items-start justify-between">
                  <Dialog.Title as="h3" className="text-xl ml-8 font-semibold roboto">
                    {props.name} Output
                  </Dialog.Title>
                </div>
              </div>
              <div className="my-4 px-8 text-left">
                <div className="py-2">
                  <div className="rounded-md bg-gray-100 p-8 mt-4 inconsolata whitespace-pre">
                    {`${JSON.stringify(props.output, undefined, 2)}`}
                  </div>
                </div>

              </div>
              <div className="flex justify-end w-full px-6 text-right border-t py-5">
                <div className="mx-2">
                    <OutlineButton click={closeModal}>
                        Close
                    </OutlineButton>
                </div>
                <div className="mx-2">
                    <CopyClipboardButton text={JSON.stringify(props.output)}/>
                </div>
              </div>
            </div>

          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
