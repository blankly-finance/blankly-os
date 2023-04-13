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

import PaymentMethods from "@/components/settings/billing/payment/PaymentMethods";
import {useAuth} from "@/libs/auth";
import {useCallback, useEffect, useState} from "react";
import {retrieveCustomer, updateDefaultMethod} from "@/services/stripe-store";

const SetDefaultPayments = (props: { cid: string }) => {
  const {token, user} = useAuth()

  const [defaultMethod, setDefaultMethod] = useState("");

  const updateDefaultPay = useCallback((methodId: string) => {
    const original = defaultMethod
    setDefaultMethod(methodId);

    updateDefaultMethod(token, props.cid, methodId)
      .then((resp: any) => {
        if (resp.status != 200) {
          setDefaultMethod(original)
        }
      })
  }, [defaultMethod, props.cid, token]);

  useEffect(() => {
    if (props.cid) {
      retrieveCustomer(token, props.cid).then((result) => {
        setDefaultMethod(result.data?.invoice_settings?.default_payment_method)
      })
    }
  }, [props.cid, token, user])

  return (
    <div>
      <PaymentMethods initialMethodId={defaultMethod} updateMethod={updateDefaultPay} type={"Default"} cid={props.cid}/>
    </div>
  )
}

export default SetDefaultPayments
