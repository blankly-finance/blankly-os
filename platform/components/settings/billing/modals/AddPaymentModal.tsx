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

import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useCallback, useEffect, useState} from "react";
import {useAuth} from "@/libs/auth";
import {createSetupIntent, stripePromise} from "@/services/stripe-store";
import {Elements} from "@stripe/react-stripe-js";
import PaymentForm from "@/components/settings/billing/PaymentForm";

const AddPaymentModal = (props: { cid: string, open: boolean, close: Function, refresh?: boolean, setRefresh?: Function }) => {

  const closeModal = useCallback(() => {
    props.close();
  }, [props])

  const {user, token} = useAuth();
  const [options, setOptions] = useState({clientSecret: ""});

  const retrieveSetupIntent = useCallback(() => {
    if (token && props.cid) {
      createSetupIntent(token, props.cid).then((res: any) => {
        setOptions({clientSecret: res.data.client_secret})
      }).catch((e) => {
        console.error(e)
      })
    }
  }, [props.refresh, props.cid, token]);

  useEffect(() => {
    retrieveSetupIntent();
  }, [retrieveSetupIntent]);

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
              className="inline-block align-bottom bg-white rounded-lg px-8 pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              {
                options.clientSecret == "" ?
                  <button onClick={() => closeModal()}></button>
                  :
                  <Elements stripe={stripePromise} options={options}>
                    <h2 className="text-lg">
                      ADD A NEW PAYMENT METHOD

                      {/*this button is here so the modal has a focuasable element*/}
                      <button onClick={() => closeModal()}></button>
                    </h2>
                    <hr className="pt-3 my-2"/>
                    <PaymentForm refresh={props.refresh} setRefresh={props.setRefresh}/>
                  </Elements>
              }
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )

}

export default AddPaymentModal
