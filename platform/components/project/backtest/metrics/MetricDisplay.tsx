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

import BacktestingMetricCard from "@/components/project/backtest/metrics/BacktestingMetricCard";

const MetricDisplay = (props: { benchmarks?: any, metrics: any, minWidth?: number }) => {
  const metrics = props.metrics
  const benchmarks = props.benchmarks ? props.benchmarks : []
  return (
    <div className="gap-6 flex flex-wrap">
      {
        metrics?.map((metric: any, index: any) => (
          <>
            <BacktestingMetricCard benchmarks={benchmarks[metric.name]} key={index} value={metric.value} name={metric.display_name}
                                  type={metric.type} dataType={metric.data_type} minWidth={props.minWidth}/>
          </>
        ))
      }
    </div>
  )
}

export default MetricDisplay
