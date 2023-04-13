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

import {Benchmark} from "@/types/backtest";
import {classNames, round, splitAndCapitalize} from "@/utils/general";
import {ChartBarIcon, ChartPieIcon} from "@heroicons/react/solid";

const showValue = (value: any, type: any) => {
  if (type === 'percentage') {
    return round(value * 100, 2)
  }
  return value
}

const BacktestingMetricCard = (props: { value: number, benchmarks?: Benchmark[], name: string, type: string, dataType: any, minWidth?: number }
) => {
  const minWidth = props.minWidth ? props.minWidth : 300
  return (
    <div style={{ minWidth: minWidth }}
      className="mt-4 flex-auto flex flex-col rounded-lg items-center justify-between border w-20 ">
      <div className="border-b py-3 px-4 text-sm w-full flex justify-between">
        <div
          className={classNames("font-medium flex", props.dataType === "percentage" ? "text-indigo-500" : "text-blue-500")}>
          <span className="w-5 h-5 mr-2 ">
            {
              props.dataType === "percentage" ? <ChartPieIcon />
                : <ChartBarIcon />
            }
          </span>
          <div className="whitespace-nowrap overflow-hidden">
            {minWidth < 250 && props.name.length > 11 ? props.name.slice(0, 11) + "..." : props.name}
          </div>

        </div>
        <p><span
          className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {splitAndCapitalize(props.type, ' ')}
        </span></p>
      </div>
      <div className="p-8 text-center">
        <p className="w-full text-5xl font-semibold text-gray-800 text-center">
          {showValue(props.value, props.dataType)}{props.dataType === "percentage" ? "%" : null}
        </p>
        <div>
        </div>
        <p className="text-gray-500 mt-5 text-sm">
          {props.name}
        </p>
      </div>
      {
        props.benchmarks && props.benchmarks.length > 0 ? (
          <div className="w-full text-center border-t divide-y divide-gray-200">
            {
              props.benchmarks?.map((benchmark: Benchmark) => (
                <div key={benchmark.symbol} className={classNames("px-6 py-2 flex items-center justify-between text-gray-600")}>
                  <div
                    className={classNames("flex items-center text-left")}>
                    {benchmark.symbol}
                  </div>
                  <div>{showValue(benchmark.value, props.dataType)}{props.dataType === "percentage" ? "%" : null}</div>
                </div>
              ))
            }
          </div>
        ) : null
      }
    </div>
  );
}

export default BacktestingMetricCard;
