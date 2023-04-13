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

import React, {useEffect, useState} from 'react';
import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import BlueButton from "@/components/general/buttons/BlueButton";
import BillingErrorModal from "@/components/settings/billing/modals/BillingErrorModal";
import Loading from "@/components/general/Loading";

function PaymentForm(props: { refresh?: boolean, setRefresh?: Function }) {
  const [clicked, setClicked] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorModal, setErrorModal] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(event: any) {
    event.preventDefault();
    setClicked(true)

    if (!stripe || !elements) {
      return;
    }

    const {error} = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: 'https://app.blankly.finance/404',
      }
    });

    if (error == undefined && props.setRefresh) {
      props.setRefresh(!props.refresh)
    }

    if (error && error.message) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment.
      setClicked(false)
      setErrorMsg(error.message);
      setErrorModal(true);
    }
    // Customer will get redirected to return_url after a possible intermediate check
  }

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  })

  return (
    <div>
      <div className={!loading ? "hidden" : ""}>
        <Loading/>
      </div>
      <div className={loading ? "hidden" : ""}>
        <PaymentElement/>
      </div>
      <BlueButton click={handleSubmit} additionalClasses={"w-full mt-6"} disabled={clicked}>
        {!clicked ? "Add" : "Processing..."}
      </BlueButton>
      <BillingErrorModal open={isErrorModal} close={() => setErrorModal(false)} errorMsg={errorMsg}/>
    </div>
  );
}

export default PaymentForm;
