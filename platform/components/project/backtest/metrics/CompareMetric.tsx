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

import BarGraph from "@/components/graph/chartjs/BarGraph";
import {useEffect, useState} from "react";
import {getPrimaryColor} from "@/utils/general";

const dropdown = [
  {label: "Most Recent", value: 0},
  {label: "Least Recent", value: 1},
  {label: "Alphabetically", value: 2},
]


const CompareMetric = (props: { backtests: any, metrics: any }) => {

  const backtests = props.backtests;
  const metrics = props.metrics;

  const [label, setLabel] = useState([]);
  const [colors, setColors] = useState([]);
  const [sharpe, setSharpe] = useState<any>([]);
  const [sortino, setSortino] = useState<any>([]);
  const [calmar, setCalmar] = useState<any>([]);
  const [cumReturns, setCumReturns] = useState<any>([]);
  const [volatility, setVolatility] = useState<any>([]);
  const [variance, setVariance] = useState<any>([]);
  const [valueAtRisk, setValueAtRisk] = useState<any>([]);
  const [cvar, setCvar] = useState<any>([]);
  const [maxDD, setMaxDD] = useState<any>([]);

  useEffect(() => {
    setLabel(backtests?.map((bt: any) => {
      return bt.id;
    }))
    setColors(backtests.map((bt: any, index: number) => {
      return getPrimaryColor(index);
    }))
  }, [backtests])

  useEffect(() => {
    let cumRetData: any = []
    let sharpeData: any = []
    let sortinoData: any = []
    let calmarData: any = []
    let volatilityData: any = []
    let varianceData: any = []
    let valueAtRiskData: any = []
    let cvarData: any = []
    let maxDDData: any = []

    metrics?.map((metric: any) => {
      cumRetData.push(metric.cumulativeReturn.value)
      sharpeData.push(metric.sharpe.value)
      sortinoData.push(metric.sortino.value)
      calmarData.push(metric.calmar.value)
      volatilityData.push(metric.volatilityAnn.value)
      varianceData.push(0) // dont have this data
      valueAtRiskData.push(metric.dailyValueAtRisk.value)
      cvarData.push(metric.expectedShortfallcVaR.value)
      maxDDData.push(metric.maxDrawdown.value)
    })

    setCumReturns(cumRetData)
    setSharpe(sharpeData)
    setSortino(sortinoData)
    setCalmar(calmarData)
    setVolatility(volatilityData)
    setVariance(varianceData)
    setValueAtRisk(valueAtRiskData)
    setCvar(cvarData)
    setMaxDD(maxDDData)

  }, [metrics])

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-1/2">
          <h1 className="text-2xl text-black font-medium">
            Metric Comparisons
          </h1>
          <button className="text-blue-600 text-sm">
            What do I do with these metrics?
          </button>
        </div>
        {/* <div className="w-1/2 text-right text-lg flex">
          <div className="w-2/3 mt-2 mr-3">
            Sort By:
          </div>
          <div className="w-1/3">
            <Dropdown default={0} options={dropdown}/>
          </div>
        </div> */}
      </div>
      <h1 className="text-xl text-black font-semibold mt-6">
        Ratios
      </h1>
      <div className="flex flex-col mt-4 text-black grid lg:grid-cols-3 sm:grid-cols-2 border p-8 gap-6 rounded-lg">
        <div>
          <div className="text-xl font-semibold roboto">
            Sharpe Ratio
          </div>
          <div className="text-md font-medium inconsolata">
            Best Model: {label[sharpe.indexOf(Math.max(...sharpe))]}
          </div>
          <div className="my-4">
            <BarGraph labels={label} data={sharpe} backgroundColor={colors}/>
          </div>
        </div>

        <div>
          <div className="text-xl font-semibold roboto">
            Sortino Ratio
          </div>
          <div className="text-md font-medium inconsolata">
            Best Model: {label[sortino.indexOf(Math.max(...sortino))]}
          </div>
          <div className="my-4">
            <BarGraph labels={label} data={sortino} backgroundColor={colors}/>
          </div>
        </div>

        <div>
          <div className="text-xl font-semibold roboto">
            Calmar Ratio
          </div>
          <div className="text-md font-medium inconsolata">
            Best Model: {label[calmar.indexOf(Math.max(...calmar))]}
          </div>
          <div className="my-4">
            <BarGraph labels={label} data={calmar} backgroundColor={colors}/>
          </div>
        </div>
      </div>
      <h1 className="text-xl text-black font-semibold mt-12">
        Return Analysis
      </h1>
      <div className="flex flex-col mt-4 text-black grid lg:grid-cols-3 sm:grid-cols-2 border p-8 gap-6 rounded-lg">
        <div>
          <div className="text-xl font-semibold roboto">
            Cumulative Returns
          </div>
          <div className="text-md font-medium inconsolata">
            Best Model: {label[cumReturns.indexOf(Math.max(...cumReturns))]}
          </div>
          <div className="my-4">
            <BarGraph labels={label} data={cumReturns} backgroundColor={colors}/>
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold roboto">
            Variance
          </div>
          <div className="text-md font-medium inconsolata">
            Best Model: {label[variance.indexOf(Math.min(...variance))]}
          </div>
          <div className="my-4">
            <BarGraph labels={label} data={variance} backgroundColor={colors}/>
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold roboto">
            Value-At-Risk
          </div>
          <div className="text-md font-medium inconsolata">
            Best Model: {label[valueAtRisk.indexOf(Math.min(...valueAtRisk))]}
          </div>
          <div className="my-4">
            <BarGraph labels={label} data={valueAtRisk} backgroundColor={colors}/>
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold roboto">
            Volatility
          </div>
          <div className="text-md font-medium inconsolata">
            Best Model: {label[volatility.indexOf(Math.min(...volatility))]}
          </div>
          <div className="my-4">
            <BarGraph labels={label} data={volatility} backgroundColor={colors}/>
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold roboto">
            Conditional Value at Risk
          </div>
          <div className="text-md font-medium inconsolata">
            Best Model: {label[cvar.indexOf(Math.min(...cvar))]}
          </div>
          <div className="my-4">
            <BarGraph labels={label} data={cvar} backgroundColor={colors}/>
          </div>
        </div>
        <div>
          <div className="text-xl flex-1 font-semibold roboto">
            Max Drawdown
          </div>
          <div className="text-md font-medium inconsolata">
            Best Model: {label[maxDD.indexOf(Math.min(...maxDD))]}
          </div>
          <div className="my-4">
            <BarGraph labels={label} data={maxDD} backgroundColor={colors}/>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CompareMetric
