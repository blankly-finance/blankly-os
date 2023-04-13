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

import {useEffect, useState} from "react";
import {createChart, PriceScaleMode} from "lightweight-charts";
import {getPrimaryColor} from "@/utils/general";
import {dynamicScale} from "@/components/graph/utils/utils";
import {processData} from "@/components/graph/utils/lwcUtils";

const MultilineGraph = (props: { data: any, loading: any, symbol?: string, width?: number, height?: number }) => {
  const [pressed, setPressed] = useState<any>(false)

  return (
    <div id="lwc-multiline-graph" className={pressed ? "cursor-pointer relative" : "relative"}
         onPointerDown={() => setPressed(true)}
         onPointerUp={() => setPressed(false)}>
      <_MultilineGraph data={props.data} loading={props.loading} symbol={props.symbol} width={props.width}
                       height={props.height}/>
    </div>
  )
}


const _MultilineGraph = (props: { data: any, loading: any, symbol?: string, width?: number, height?: number }) => {
  const loading = props.loading
  const symbol = props.symbol

  const width = props.width
  const height = props.height ? props.height : 500

  const [data, setData] = useState<any>()

  useEffect(() => {
    setData(processData(props.data, symbol))
  }, [props.data, symbol])

  const [lss, setLss] = useState<any>()
  const [chart, setChart] = useState<any>()

  useEffect(() => {
      loading(true)
      if (data) {
        const compareGraph = document.getElementById("lwc-multiline-graph")

        while (compareGraph?.firstChild) {
          compareGraph.removeChild(compareGraph.firstChild);
        }

        const chart = createChart('lwc-multiline-graph', {
          timeScale: {
            borderVisible: false,
            timeVisible: true,
            secondsVisible: false,
          },
          width: width ? width : 2000, height: height, rightPriceScale: {
            mode: symbol || props.data?.isPNL ? PriceScaleMode.Normal : PriceScaleMode.Percentage,
          }
        });

        let lineseries = []
        for (let i = 0; i < data.length; ++i) {
          lineseries.push(chart.addLineSeries({
            color: getPrimaryColor(i),
            lineWidth: 3,
          }));
        }
        setLss(lineseries);
        setChart(chart);

        if (!width) {
          dynamicScale(chart, "lwc-multiline-graph")
        }
      }


    },
    [data, height, loading, width]
  )

  useEffect(() => {
    if (lss && data) {
      for (let i = 0; i < lss.length; ++i) {
        try {
          lss[i].setData(data[i]);
        } catch (e) {
          return;
        }
      }
      chart.timeScale().fitContent();
      setTimeout(() => {
        loading(false);
      }, 200);
    }
  }, [lss, loading, chart, data])

  return (
    <div/>
  )
}

export default MultilineGraph
