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

import React, {Fragment, useCallback, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {PhoneIcon} from '@heroicons/react/solid';
import {updateBillingInfo} from "@/services/stripe-store"
import BlackButton from "@/components/general/buttons/BlackButton";
import {useFormik} from 'formik';
import {useAuth} from "@/libs/auth";

const AttachCardModal = (props: { open: boolean, close: any, setPhone: any }) => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const {token} = useAuth();
    const setPhone = props.setPhone;

    const closeModal = useCallback(() => {
        props.close(false);
    }, [props]);

    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        onSubmit: async (values) => {
            if (values.phone !== '') {
                updateBillingInfo(token, {phone: values.phone});
                setPhone(values.phone);
                closeModal();
            }
            return;
        },
    });


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
                      <form onSubmit={formik.handleSubmit} className="h-screen">
                          <div
                            className="inline-block align-center bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                              <div>
                                  <div
                                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                                      <PhoneIcon className="h-6 w-6 text-indigo-600" aria-hidden="true"/>
                                  </div>
                                  <div className="mt-3 text-center sm:mt-5">
                                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                          Update Billing Phone Number
                                      </Dialog.Title>
                                      <div className="mt-4">
                                          <input
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            placeholder="Phone Number"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.phone}
                                            autoComplete="phone"
                                            className="text-center appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                          />
                                      </div>
                                  </div>
                              </div>
                              <div className="flex justify-center items-center mt-2 font-semibold text-red-500">
                                  {errorMsg}
                              </div>
                              <div className="mt-2">
                                  <BlackButton width="full">
                                      <button type="submit">
                                          {
                                              loading ?
                                                <div className="flex justify-center align-center">
                                                    {/* Loading icon */}
                                                    <svg className="animate-spin h-5 w-5 mr-3 text-white"
                                                         viewBox="0 0 24 24">
                                                        <path className="opacity-75" fill="currentColor"
                                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                </div>
                                                :
                                                <p className="roboto">Update Phone Number</p>
                                          }
                                      </button>
                                  </BlackButton>
                              </div>
                          </div>
                      </form>
                  </Transition.Child>
              </div>
          </Dialog>
      </Transition.Root>
    )
}

export default AttachCardModal;
