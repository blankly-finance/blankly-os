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

import React, {useCallback, useEffect, useState} from 'react';
import {detachCard, getPaymentMethods} from "@/services/stripe-store";
import {useAuth} from "@/libs/auth";
import {PlusIcon} from '@heroicons/react/solid';
import CardDisplay from "@/components/settings/billing/payment/CardDisplay";
import AddPaymentModal from "@/components/settings/billing/modals/AddPaymentModal";

function PaymentMethods(props: { initialMethodId: string, updateMethod: Function, type: string, cid?: string }) {
  const {user, token} = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<any>([]);

  const updateMethod = props.updateMethod;

  const [addPayment, setAddPayment] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const [cid, setCid] = useState("")

  useEffect(() => {
    if (props.cid) {
      setCid(props.cid)
    } else {
      setCid(user?.stripeCustomerId)
    }
  }, [props.cid, user.stripeCustomerId])

  const detachMethod = useCallback((methodId: string) => {
    detachCard(token, methodId)
      .then(() => {
        setPaymentMethods(paymentMethods.filter((method: any) => {
          return method.id !== methodId
        }));
      })
  }, [paymentMethods, token])

  useEffect(() => {
    if (cid !== "") {
      getPaymentMethods(token, cid)
        .then((result: any) => {
          let methods: any = [];
          // Add all methods to our state
          result.data?.data?.forEach((method: any) => {
            const newMethod = {
              id: method.id,
              type: method.card.brand,
              expires: `${method.card.exp_month}/${method.card.exp_year}`,
              last4Digits: method.card.last4
            };
            methods.push(newMethod);
          })

          if (methods.length === 1) {
            updateMethod(methods[0]) // this should automatically set the default method
          }

          setPaymentMethods(methods);
        });
    }
  }, [refresh, cid, user, token, updateMethod]);

  useEffect(() => {
    if (refresh) {
      setAddPayment(false)
      setRefresh(false)
    }
  }, [refresh])

  return (
    <div className="my-2 pb-6">
      <h2 className="font-medium my-2 text-lg flex">
        PAYMENT METHOD
        <div className="ml-auto">
          <button className="py-1.5 px-3 border border-gray-300 rounded-md hover:bg-gray-100"
                  onClick={() => setAddPayment(true)}>
            {/*router.push(`${router.pathname}/payment-methods`)*/}
            <div className="flex items-center space-x-2 text-sm">
              Add Payment Method
              <PlusIcon className="h-4 w-4 text-black ml-3"/>
            </div>
          </button>
          <AddPaymentModal open={addPayment} close={() => setAddPayment(false)} refresh={refresh}
                           setRefresh={setRefresh} cid={cid}/>
        </div>
      </h2>
      <hr className="my-2"/>
      {
        paymentMethods?.length > 0 ?
          <div>
            {paymentMethods?.map((method: any, index: number) => (
              <CardDisplay key={index} type={props.type} method={method} initialMethod={props.initialMethodId}
                           updatePayment={updateMethod}
                           detachMethod={detachMethod}/>
            ))
            }
          </div>
          :
          <div className="w-3/5 mx-auto my-12 text-center roboto text-md text-gray-700">
            You currently do not have any payment methods added.
          </div>
      }

    </div>
  );
}

export default PaymentMethods;
