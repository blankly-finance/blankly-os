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

import ChoosePlan from "@/components/create-team/ChoosePlan";
import {useEffect, useState} from "react";
import {getFreeProductId, updateSubscription} from "@/services/stripe-store";
import {useAuth} from "@/libs/auth";
import GreenButton from "@/components/general/buttons/GreenButton";
import SetPaymentPayments from "@/components/settings/billing/payment/SetPaymentPayments";
import axios from "axios";
import {useRouter} from "next/router";

const PlanSetup = (props: { cid: string, redirect: any }) => {
  const {token, uid, refreshToken} = useAuth()
  const router = useRouter()

  const [freePlanId, setFreePlanId] = useState<any>("")
  const [plan, setPlan] = useState("")

  const [paymentMethod, setPaymentMethod] = useState("")

  const [needPayment, setNeedPayment] = useState(false)


  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    if (plan == freePlanId && plan != "" && plan != undefined) {
      setDisabled(false)
    } else if (plan == "") {
      setDisabled(true)
    } else if (needPayment && (paymentMethod == "" || paymentMethod == undefined)) {
      setDisabled(true)
    } else if (needPayment && paymentMethod != "") {
      setDisabled(false)
    }
  }, [freePlanId, needPayment, paymentMethod, plan])

  const redirectAfterSubmit = () => {
    // redirct to original place
    if (props.redirect && props.redirect.indexOf('/deploy') !== -1) {
      axios.post(process.env.DEPLOYMENT_URL as string, {
        token: refreshToken,
      }).then(() => {
        router.push(`/auth/complete`);
      })

    } else {
      if (props.redirect === '/dashboard') {
        router.push(`/${uid}`);
      } else if (props.redirect) {
        router.push(props.redirect);
      } else {
        router.push(`/${uid}`);
      }

    }
  }

  const handleSubmit = () => {
    if (plan != freePlanId) {
      updateSubscription(token, {
        cid: props.cid,
        paymentMethod: paymentMethod,
        productId: plan,
      }).then((res) => {
        redirectAfterSubmit()
      }).catch((e) => {
        console.error(e)
      })
    } else {
      redirectAfterSubmit()
    }
  }

  useEffect(() => {
    if (token) {
      getFreeProductId(token).then((res: any) => {
        setFreePlanId(res.data)
      }).catch((e) => {
        console.error(e)
      })
    }
  }, [token])

  return (
    <div className="mt-10">
      <div className="border-gray-200 border rounded-lg p-8">
        <ChoosePlan cid={props.cid} type={"plan"} update={(plan: any) => {
          setNeedPayment(plan.plan != freePlanId)
          if (needPayment) {
            setPaymentMethod("")
          }
          setPlan(plan.plan)
        }}/>
      </div>
      <div>
        {
          needPayment && props.cid ?
            <div className="mt-10 container shadow-lg w-full h-auto bg-white rounded-lg pt-4 px-10">
              <SetPaymentPayments cid={props.cid} updateMethod={setPaymentMethod}/>
            </div>

            : null
        }
      </div>
      <div className="mt-10">
        <GreenButton width={"full"} disabled={disabled}
                     click={() => handleSubmit()}>
          Create Account
        </GreenButton>
      </div>
    </div>
  )
}

export default PlanSetup
