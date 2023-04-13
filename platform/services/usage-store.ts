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

import axios from 'axios';
import axiosRetry from "axios-retry";

function createUsageAPIClient(token: string) {
    const instance = axios.create({
        // baseURL: process.env.NODE_ENV === "production"
        //     ? "https://model-usage-api-67jfnx2vvq-uc.a.run.app"
        //     : `${process.env.NEXT_PUBLIC_URL_MODEL_USAGE_API}`,
        baseURL: "https://model-usage-api-67jfnx2vvq-uc.a.run.app",
        headers: {
            token: token
        },
    });

    axiosRetry(instance, {retryDelay: axiosRetry.exponentialDelay});
    return instance;
}

export async function getUsage(token: string, startTime: number, endTime: number, id: string) {
    const req = createUsageAPIClient(token);
    return req.get('/usage', {params: {startTime: startTime, endTime: endTime, id: id}})
}
