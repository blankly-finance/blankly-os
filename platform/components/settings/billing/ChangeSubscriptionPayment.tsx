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

import React, {useState} from 'react';
import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import BlueButton from "@/components/general/buttons/BlueButton";
import BillingErrorModal from "@/components/settings/billing/modals/BillingErrorModal";

function PaymentForm(props: { priceId: string }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorModal, setErrorModal] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const priceId = props.priceId;

  // This function gets called when user clicks subscribe
  async function handleSubmit(event: any) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const {error} = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `https://app.blankly.finance/404`,
      }
    });

    if (error && error.message) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment.
      setErrorMsg(error.message);
      setErrorModal(true);
    }
    // Customer will get redirected to return_url after a possible intermediate check
  }

  return (
    <div className="w-full">
      <PaymentElement/>
      <BlueButton click={handleSubmit} additionalClasses={"w-full mt-6"}>
        Subscribe
      </BlueButton>
      <BillingErrorModal open={isErrorModal} close={() => setErrorModal(false)} errorMsg={errorMsg}/>
    </div>
  );
}

export default PaymentForm;
