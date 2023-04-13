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
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";
import BlueButton from "@/components/general/buttons/BlueButton";
import {useRouter} from "next/router";
import {useAuth} from "@/libs/auth";
import {processEpoch} from "@/utils/date";
import {classNames} from "@/utils/general";
import {querySubscription, retrieveProduct} from "@/services/stripe-store";
import ChangePlanModal from "@/components/settings/billing/modals/ChangePlanModal";

function BillingPlans(props: { cid: string }) {
  const router = useRouter();
  const {token} = useAuth();

  const [quantity, setQuantity] = useState(0);
  const [changePlan, setChangePlan] = useState(false)
  const [subscription, setSub] = useState<any>({});
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    if (token && props.cid) {
      querySubscription(token, props.cid)
        .then((subResult: any) => {
          const productId = subResult.data.items.data[0].plan.product;
          const quantity = subResult.data.items.data[0].quantity;
          setQuantity(quantity);
          retrieveProduct(token, productId)
            .then((prodResult: any) => {
              const sub = {
                name: prodResult.data.name,
                renewDate: processEpoch(subResult.data.current_period_end),
                priceDesc: prodResult.data.metadata.priceDesc
              }
              setSub(sub);
            })
        })
    }
  }, [token, props.cid, update]);

  return (
    <div className="pb-16 pt-8">
      <h2 className="font-medium my-2 text-lg">CURRENT PLAN</h2>
      <hr className="my-2"/>
      <div className="flex justify-between mt-6">
        <div>
          <h1
            className={classNames(subscription.name === "Blankly Pro" ? "text-blue-500" : "text-black", "font-bold my-1 text-2xl")}>{quantity} x {subscription.name}</h1>
          <p className="">{subscription.priceDesc}</p>
          <p className="">Your plan renews on {subscription.renewDate}</p>
        </div>
        <div className="flex flex-col">
          <BlueButton additionalClasses="mb-2" click={() => setChangePlan(true)}>
            Change Plan
          </BlueButton>
          <MediumOutlineButton click={() => window.open('https://blankly.finance/pricing/')}>
            Compare Plans
          </MediumOutlineButton>
        </div>
      </div>
      <ChangePlanModal cid={props.cid} open={changePlan} close={() => {
        setChangePlan(false)
      }} update={() => setUpdate(!update)}/>
    </div>
  );
}

export default BillingPlans;
