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

import {NextRouter} from "next/router";
import {encodeGetParams} from "@/utils/general";
import {OpengraphData} from "@/types/opengraph";

const API_URL = `https://us-central1-${process.env.NEXT_PUBLIC_PROJECT_ID}.cloudfunctions.net/getOpengraphData?`

export default async function fetchOpenGraphData(router: NextRouter): Promise<OpengraphData> {
    const { projectId, modelId, backtestId } = router.query;

    const res = await fetch(API_URL + encodeGetParams({
        projectId: projectId,
        modelId: modelId,
        backtestId: backtestId,
    }))

    if (200 <= res.status && res.status < 300) {
        // request success
    } else {
        // if the opengraph api gave us an error message, print that out
        const err = await res.json()
            .then((json) => json.error || 'Error')
            .catch((_) => `${res.status} ${res.statusText}`)
        throw Error(`Bad response from opengraph service: ${err}`);
    }

    const opengraphData = await res.json();
    opengraphData.url = 'https://app.blankly.finance' + router.basePath + router.asPath;

    return opengraphData;
}
