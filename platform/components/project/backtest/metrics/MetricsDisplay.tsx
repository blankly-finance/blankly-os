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

import {useCallback, useState} from "react";
import BacktestingMetricCard from "./BacktestingMetricCard";
import Dropdown from "@/components/general/dropdowns/Dropdown";
import MetricDisplay from "@/components/project/backtest/metrics/MetricDisplay";
import dynamic from "next/dynamic";

const TimeSeriesMetricsGraph = dynamic(() => import("@/components/project/backtest/metrics/TimeseriesMetricsGraph"), {
  ssr: false,
});

const options = [
  {label: "Default", value: "default"},
  {label: "Risk Metrics", value: "risk"},
  {label: "Returns", value: "return"},
  {label: "Ratio Analysis", value: "ratio"},
  {label: "Statistics", value: "statistic"},
  {label: "Time Metrics", value: "time"},
  {label: "Metadata", value: "metadata"},
  {label: "Custom", value: "custom"},
  {label: "Time Series Metrics", value: "timeseries"},
  {label: "All", value: "all"},
]

const MetricsDisplay = (props: { metrics: any, customMetrics?: any, type: string, benchmarks?: any, timeseriesMetrics?: any, compareMetrics?: any, minWidth?: number }) => {
  const compareMetrics = props.compareMetrics;
  const metrics = props.metrics;
  const timeseriesMetrics = props.timeseriesMetrics;
  const benchmarks = props.benchmarks ? props.benchmarks : [];
  const [selected, setSelected] = useState({label: "Default", value: "default"});
  const [filtered, setFiltered] = useState<any>([]);

  const getMetrics = useCallback((type: string) => {
    let filteredList = []
    if (type === 'custom') {
      for (let [key, value] of Object.entries(props.customMetrics)) {
        filteredList.push(value)
      }
    } else if (type == 'all') {
      for (const [key, value] of Object.entries(metrics)) {
        // @ts-ignore
        (value as any).name = key;
        filteredList.push(value)
      }
    } else {
      for (const [key, value] of Object.entries(metrics)) {
        // @ts-ignore
        if (value.type == type) {
          (value as any).name = key;
          filteredList.push(value)
        }
      }
    }
    setFiltered(filteredList)
  }, [metrics, props.customMetrics]);

  const update = useCallback((e: any) => {
    setSelected(e);
    getMetrics(e.value);
  }, [getMetrics]);

  return (
    <div className="w-full h-auto bg-white rounded-md mt-10">
      <div>
        {
          compareMetrics && Object.keys(compareMetrics).length !== 0 ?
            <div className="mb-10">
              <h1 className="text-2xl font-medium">
                Benchmark Comparison Metrics
              </h1>
              <p className="text-sm text-blue-600 mt-1">
                How can I use this information?
              </p>
              <div className="gap-6 flex flex-wrap">
                <BacktestingMetricCard value={compareMetrics.alpha.toFixed(2)} name={"Alpha"}
                                       dataType={"number"} type={"return"} minWidth={props.minWidth}/>
                <BacktestingMetricCard value={compareMetrics.beta.toFixed(2)} name={"Beta"}
                                       dataType={"number"} type={"return"} minWidth={props.minWidth}/>
                <BacktestingMetricCard value={compareMetrics.infoRatio.toFixed(2)} name={"Information Ratio"}
                                       dataType={"number"} type={"ratio"} minWidth={props.minWidth}/>
              </div>
            </div>
            :
            <></>
        }
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl text-left font-medium">
              {props.type} Metrics
            </h1>
            <p className="text-sm text-blue-600 mt-1">
              How can I use this information?
            </p>
          </div>
          <div className="w-60">
            <Dropdown options={options} default={0} update={update}/>
          </div>
        </div>

        {
          selected.label == "Default" ? <div className="gap-6 flex flex-wrap">
              {metrics?.sharpe?.value ?
                <BacktestingMetricCard benchmarks={benchmarks?.sharpe} value={metrics?.sharpe?.value}
                                       name={metrics?.sharpe?.display_name}
                                       dataType={"number"} type={"ratio"} minWidth={props.minWidth}/> : <div/>}
              {metrics?.cagr?.value ? <BacktestingMetricCard benchmarks={benchmarks?.cagr} value={metrics?.cagr?.value}
                                                             name={metrics?.cagr?.display_name}
                                                             dataType={"percentage"} type={"return"}
                                                             minWidth={props.minWidth}/> : <div/>}
              {metrics?.sortino?.value ?
                <BacktestingMetricCard benchmarks={benchmarks?.sortino} value={metrics?.sortino?.value}
                                       name={metrics?.sortino?.display_name}
                                       dataType={"number"} type={"ratio"} minWidth={props.minWidth}/> : <div/>}
              {metrics?.cumulativeReturn?.value ? <BacktestingMetricCard benchmarks={benchmarks?.cumulativeReturn}
                                                                         value={metrics?.cumulativeReturn?.value}
                                                                         name={metrics?.cumulativeReturn?.display_name}
                                                                         dataType={"percentage"} type={"return"}
                                                                         minWidth={props.minWidth}/> : <div/>}
              {metrics?.profitFactor?.value ? <BacktestingMetricCard benchmarks={benchmarks?.profitFactor}
                                                                     value={metrics?.profitFactor?.value}
                                                                     name={metrics?.profitFactor?.display_name}
                                                                     dataType={"number"} type={"statistic"}
                                                                     minWidth={props.minWidth}/> : <div/>}
              {metrics?.maxDrawdown?.value ?
                <BacktestingMetricCard benchmarks={benchmarks?.maxDrawdown} value={metrics?.maxDrawdown?.value}
                                       name={metrics?.maxDrawdown?.display_name}
                                       dataType={"percentage"} type={"return"} minWidth={props.minWidth}/> : <div/>}
              {metrics?.payoffRatio?.value ?
                <BacktestingMetricCard benchmarks={benchmarks?.payoffRatio} value={metrics?.payoffRatio?.value}
                                       name={metrics?.payoffRatio?.display_name}
                                       dataType={"number"} type={"ratio"} minWidth={props.minWidth}/> : <div/>}
              {metrics?.winDaysPercent?.value ? <BacktestingMetricCard benchmarks={benchmarks?.winDaysPercent}
                                                                       value={metrics?.winDaysPercent?.value}
                                                                       name={metrics?.winDaysPercent?.display_name}
                                                                       dataType={"percentage"} type={"return"}
                                                                       minWidth={props.minWidth}/> : <div/>}
            </div>
            :
            <>
              {
                selected.label === "Time Series Metrics" ?
                  <div className="max-w-7xl mx-auto mt-10 pb-4 mb-4 space-y-6">
                    <div className="rounded-lg border border-gray-200 px-8 py-4">
                      <p className="text-xl font-medium my-4">Drawdown</p>
                      <div className="flex items-center justify-center w-full" id="drawdown"/>
                    </div>
                    <div className="rounded-lg border border-gray-200 px-8 py-4">
                      <p className="text-xl font-medium my-4">Rolling Sharpe</p>
                      <div className="flex items-center justify-center w-full" id="rolling-sharpe"/>
                    </div>
                    <div className="rounded-lg border border-gray-200 px-8 py-4">
                      <p className="text-xl font-medium my-4">Rolling Volatility</p>
                      <div className="flex items-center justify-center w-full" id="rolling-volatility"/>
                    </div>
                    {
                      timeseriesMetrics ?
                        <TimeSeriesMetricsGraph metrics={timeseriesMetrics}/>
                        :
                        null
                    }
                  </div>
                  :
                  <MetricDisplay benchmarks={benchmarks} metrics={filtered} minWidth={props.minWidth}/>
              }
            </>
        }

      </div>
    </div>
  );
};

export {MetricsDisplay};
