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

import {useEffect, useState} from "react";
import {queryProductsByType, querySubscription} from "@/services/stripe-store";
import {useAuth} from "@/libs/auth";
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";
import {CheckIcon} from "@heroicons/react/solid";


const ChoosePlan = (props: { cid: string, type: string, update: Function, isValid?: Function }) => {
  const {token} = useAuth()

  const [selectedPlan, setSelectedPlan] = useState("")
  const [plans, setPlans] = useState<any>([])

  useEffect(() => {
    queryProductsByType(token, props.type).then((res) => {
      let tempPlans = res.data.data
      tempPlans.sort((a: any, b: any) => {
        if (a.metadata.order > b.metadata.order) {
          return 1;
        }
        return -1;
      })
      setPlans(res.data.data)
    })
  }, [props.type, token])

  useEffect(() => {
    if (props.cid) {
      querySubscription(token, props.cid)
        .then((subResult: any) => {
          const productId = subResult.data.items.data[0].plan.product;
          setSelectedPlan(productId)
        }).catch(() => {
      })
    }
  }, [props.cid, token])

  const selectPlan = (id: string) => {
    props.update({plan: id})
    setSelectedPlan(id)

    if (props.isValid) {
      props.isValid(true)
    }
  }

  return (
    <div className="container shadow-lg w-full h-auto bg-white rounded-lg py-8 px-10">
    <div className="">
      <h1 className="text-2xl font-semibold">Choose a Plan</h1>
      <p className="text-sm mt-2 text-gray-600">
        Choose a plan that best fits the features you need
      </p>
      <br/>
      {(Array.isArray(plans) ? plans : undefined)?.map((plan: any, index: number) => (
        <div key={index} className="my-4 flex items-center justify-between">
          <div>
            <h1
              className="text-xl font-semibold text-gray-900">
              {plan?.name}
            </h1>
            <div key={index} className="grid text-gray-800">
              <div className="col-span-4">
                <p className="">{plan?.metadata.priceDesc}</p>
                <p className="w-5/6">{plan?.description}</p>
              </div>
            </div>
          </div>
          <div className="justify-self-end">
            {
              plan?.id == selectedPlan ?
                <div className="flex items-center">
                  <CheckIcon className="h-6 w-6 text-green-600"/>
                  Selected
                </div>
                :
                <MediumOutlineButton click={() => {
                  selectPlan(plan?.id)
                }}>
                  Choose
                </MediumOutlineButton>
            }
          </div>

        </div>
      ))}
    </div>
    </div>
  )
}

export default ChoosePlan
