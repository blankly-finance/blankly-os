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
import {useRouter} from "next/router";
import {useAuth} from "@/libs/auth";
import {processEpoch} from "@/utils/date";
import {querySubscription} from "@/services/stripe-store";
import LoadingDots from "@/components/general/LoadingDots";
import {getUsage} from "@/services/usage-store";

function CreditUsage({cid}: { cid: string }) {
    const router = useRouter();
    const {projectId} = router.query;
    const {uid, token} = useAuth();
    const [creditUsage, setCreditUsage] = useState(-1)
    const [billingPeriod, setBillingPeriod] = useState<number[]>([]);

    useEffect(() => {
        if (!uid) return;

        querySubscription(token, cid)
            .then(res => {
                setBillingPeriod([res.data.current_period_start, res.data.current_period_end])
                return getUsage(token, res.data.current_period_start, res.data.current_period_end, projectId as string)
            })
            .then(res => setCreditUsage(res.data.credits));
    }, [uid])

    const billingPeriodText = billingPeriod
        .map(epoch => processEpoch(epoch, 'MMM D'))
        .join(' - ');

    return <p className="text-gray-400 mb-2">
        Current estimated credit usage for this billing period ({billingPeriod ? billingPeriodText : <LoadingDots />}):&nbsp;
        {creditUsage < 0
            ? <LoadingDots/>
            : <span className="text-red-500">{creditUsage.toLocaleString()} Credits</span>}
    </p>
}

export default CreditUsage;
