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

import {useAuth} from "@/libs/auth";
import {useEffect, useState} from "react";
import {retrieveCustomer} from "@/services/stripe-store";
import PaymentMethods from "@/components/settings/billing/payment/PaymentMethods";


const SetPaymentPayments = (props: { updateMethod: Function, cid?: any }) => {
  const {token, user} = useAuth()

  const [paymentId, setPaymentId] = useState("")

  useEffect(() => {
    if (paymentId == "") {
      retrieveCustomer(token, props.cid ? props.cid : user?.stripeCustomerId).then((result) => {
        props.updateMethod(result.data.invoice_settings?.default_payment_method)
        setPaymentId(result.data.invoice_settings?.default_payment_method)
      })
    }
  }, [paymentId, props, token, user])

  useEffect(() => {
    if (paymentId != "") {
      props.updateMethod(paymentId)
    }
  }, [paymentId, props])

  return (
    <div>
      <PaymentMethods initialMethodId={paymentId} updateMethod={setPaymentId} type={"Method"} cid={props.cid}/>
    </div>
  )
}

export default SetPaymentPayments
