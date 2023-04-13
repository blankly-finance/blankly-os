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
import {createChart} from "lightweight-charts";
import {dynamicScale} from "@/components/graph/utils/utils";
import {processData} from "@/components/graph/utils/lwcUtils";
import {getPrimaryColor} from "@/utils/general";

const BaselineGraph = (props: { data: any, loading: any, symbol?: string, width?: number, height?: number }) => {
  const [pressed, setPressed] = useState<any>(false)

  return (
    <div id="baseline-graph" className={pressed ? "cursor-pointer relative" : "relative"}
         onPointerDown={() => setPressed(true)}
         onPointerUp={() => setPressed(false)}>
      <_BaselineGraph data={props.data} loading={props.loading} symbol={props.symbol} width={props.width}
                      height={props.height}/>
    </div>
  )
}

const _BaselineGraph = (props: { data: any, loading: any, symbol?: string, width?: number, height?: number }) => {
  const loading = props.loading
  const dataObj = props.data
  const symbol = props.symbol
  const benchmarks = props.data.benchmarks

  const width = props.width
  const height = props.height ? props.height : 500

  const [type, setType] = useState(symbol ? 'Trades' : 'Account Value')
  const [data, setData] = useState<any>()

  const [chart, setChart] = useState<any>()
  const [lineSeries, setLineSeries] = useState<any>()
  const [toolTip, setToolTip] = useState<any>()

  useEffect(() => {
    const result = processData(dataObj, symbol)
    setData(result);
  }, [dataObj, symbol])

  useEffect(() => {
    loading(true);

    if (data) {
      const baselineGraph: any = document.getElementById("baseline-graph");
      while (baselineGraph?.firstChild) {
        try {
          baselineGraph.removeChild(baselineGraph.firstChild);
        } catch {
          break
        }
      }

      let initialValue = data[0] ? data[0].value : 0;

      // create first chart
      const options: any = {
        width: width ? width : 2000,
        height: height,
        rightPriceScale: {
          borderVisible: false,
        },
        timeScale: {
          borderVisible: false,
          timeVisible: true,
          secondsVisible: false,
        },
        grid: {
          horzLines: {
            color: '#eee',
          },
          vertLines: {
            color: '#eee',
          },
        },
        crosshair: {
          horzLine: {
            visible: true,
            labelVisible: true
          },
          vertLine: {
            visible: true,
            style: 0,
            width: 2,
            color: 'rgba(32, 38, 46, 0.1)',
            labelVisible: true,
          }
        },
      }

      let cht = createChart(baselineGraph, options)
      let lss = cht.addBaselineSeries({baseValue: {type: 'price', price: initialValue}})
      data.map((res: any) => {
        res['time'] = Math.round(res['time'])
        return res;
      })
      lss.setData(data);
      cht.timeScale().fitContent();

      if (!width) {
        dynamicScale(cht, 'baseline-graph')
      }

      loading(false)

      setChart(cht)
      setLineSeries(lss)
    }
  }, [loading, width, height, data, type])

  useEffect(() => {
    if (chart && benchmarks) {
      // allow backtest metrics to be on top
      if (type == 'Account Value') {
        benchmarks?.map((benchmark: any, index: number) => {
          const shares = data[0]?.value / benchmark[0]?.value

          const value = benchmark?.map((dataPoint: any) => {
            return {time: dataPoint.time, value: dataPoint.value * shares}
          })

          const lss = chart.addLineSeries({color: getPrimaryColor(index)})
          lss.setData(value)

        })
      }
    }
  }, [benchmarks, chart, data, type])

  return (
    <div/>
  )
}

export default BaselineGraph
