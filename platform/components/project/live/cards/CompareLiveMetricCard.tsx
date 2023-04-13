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

import {classNames, round} from "@/utils/general";
import {BadgeCheckIcon, ChartBarIcon, ChartPieIcon} from "@heroicons/react/solid";
import {useEffect, useState} from "react";

const showValue = (value: any, type: any) => {
  if (type === 'percent') {
    return round(value * 100, 2)
  }
  return value
}
const CompareLiveMetricCard = (props: { metric: any, modelIds: Array<string>, models: any, colors: any }) => {
  const dataType = props.metric[0].data_type
  const [maxIndex, setMaxIndex] = useState(-1)

  useEffect(() => {
    let max = props.metric[0].value
    let maxIndex = 0
    props.metric.map((stat: any, index: number) => {
      if (stat.value > max) {
        max = stat.value
        maxIndex = index
      }
    })
    setMaxIndex(maxIndex)
  }, [props.metric])

  function highest(index: number) {
    return index == maxIndex
  }

  return (
    <div style={{minWidth: 300}}
         className="mt-4 flex-auto flex flex-col rounded-lg items-center justify-between border">
      <div className="border-b py-3 px-4 w-full">
        <p className={classNames("font-medium text-lg flex items-center text-gray-600")}>
          <span className="w-5 h-5 mr-2">
            {
              dataType === "percentage" ? <ChartPieIcon/>
                : <ChartBarIcon/>
            }
          </span> {props.metric[0].display_name}
        </p>
      </div>
      <div className="w-full text-center">
        {props.metric.map((stat: any, index: number) => {
          return (
            <div style={{color: props.colors[index]}} key={index}
                 className={classNames("px-5 py-3 flex items-center justify-between", props.metric.length - 1 === index ? "" : "border-b")}>
              <div
                className={classNames("flex items-center text-left", highest(index) ? "font-semibold" : null)}>{highest(index) ?
                <BadgeCheckIcon className="text-green-400 w-6 h-6 mr-2"/> : null}
                {props.models[index].name}
              </div>
              <div className={classNames(highest(index) ? "font-semibold" : null)}>{stat.value}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default CompareLiveMetricCard;
