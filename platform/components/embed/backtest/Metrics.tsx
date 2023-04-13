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

import React, {useEffect, useState} from "react";
import {getBacktestBlanklyMetrics} from "@/services/backtest-store";
import { MetricsDisplay } from "@/components/project/backtest/metrics/MetricsDisplay";

const Metrics = (props: { id: string, modelId: string, backtestId: string }) => {
  const id = props.id
  const modelId = props.modelId
  const backtestId = props.backtestId

  // get blankly metrics
  const [blanklyMetrics, setBlanklyMetrics] = useState<any>();
  useEffect(() => {
    if (id && modelId && backtestId) {
      getBacktestBlanklyMetrics(id as string, modelId as string, backtestId as string).then((doc) => {
        const data: any = doc.data()?.metrics
        setBlanklyMetrics(data)
      })
    }
  }, [id, modelId, backtestId])

  return (<div>
    {blanklyMetrics ? <MetricsDisplay type="Backtest" metrics={blanklyMetrics} minWidth={250}/> : null}
  </div>)
}

export default Metrics
