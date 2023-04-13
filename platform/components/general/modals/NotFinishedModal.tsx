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

import {Fragment, useCallback, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ThumbUpIcon} from '@heroicons/react/solid'
import {getUpvotes, incrementUpvote} from '@/services/upvote-store';

export default function NotFinishedModal(props: { open: boolean, type: 'feature' | 'documentation', featureName: string, close: any }) {
  const [counter, setCounter] = useState(0);
  const [upvotes, setUpvotes] = useState(0);

  let text = props.type

  const closeModal = useCallback(() => {
    props.close();
    incrementUpvote(props.featureName, counter);
  }, [props, counter]);

  useEffect(() => {
    async function asyncUpvotes() {
      const response = await getUpvotes(props.featureName);
      const data = response.data();
      if (data) {
        setUpvotes(data.upvotes);
      } else {
        setUpvotes(0);
      }
      if (props.open) {
        setCounter(0);
      }
    }

    asyncUpvotes();
  }, [props])

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={closeModal}>
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
              className="inline-block align-bottom bg-white rounded-lg px-8 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-8">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    This {text} has not been implemented yet
                  </Dialog.Title>
                  <div className="mt-8">
                    <p className="text-sm text-gray-500">
                      Oops, looks like you&apos;ve found something we haven&apos;t finished yet. Kudos to you!
                      Let us know if you want this feature ASAP!
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border mb-2 border-transparent shadow-sm px-4 py-3 bg-gray-700 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
                  onClick={() => setCounter(counter + 1)}
                >
                  <span className="mr-3"><ThumbUpIcon/></span> Upvote this {text} 🎉 <span
                  className="ml-3">(Upvoted {upvotes + counter} times) </span>
                </button>
                <br/>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => closeModal()}
                >
                  Got it, take me back
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
