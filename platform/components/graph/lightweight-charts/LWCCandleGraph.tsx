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
import {createChart} from "lightweight-charts";
import axios from "axios";
import json from "json5";
import {getTime} from "@/libs/trade-utils";
import {dynamicScale} from "@/components/graph/utils/utils";
import {getMultiMarker, getSingleMarker} from "@/components/graph/utils/lwcUtils";
import {GraphType} from "@/components/graph/Graph";

const LWCCandleGraph = (props: { data: any, type: GraphType, symbol: string, loading: any, activeIndex?: number, width?: number, height?: number }) => {
  const [pressed, setPressed] = useState<any>(false)

  return (
    <div id="lwc-candle-graph" className={pressed ? "cursor-pointer relative" : "relative"}
         onPointerDown={() => setPressed(true)}
         onPointerUp={() => setPressed(false)}>
      <_LWCCandleGraph data={props.data} type={props.type} symbol={props.symbol} loading={props.loading}
                       activeIndex={props.activeIndex}
                       width={props.width} height={props.height}/>
    </div>
  )
}

const _LWCCandleGraph = (props: { data: any, type: GraphType, symbol: string, loading: any, activeIndex?: number, width?: number, height?: number }) => {
  const trades = props.data.trades
  const type = props.type
  const loading = props.loading
  const symbol = props.symbol
  const exchange = props.data.exchange ? props.data.exchange : "alpaca"
  const activeIndex = props.activeIndex ? props.activeIndex : 0
  const width = props.width
  const height = props.height ? props.height : 500

  const startTime = props.data.startTime ? props.data.startTime : trades[0]?.time
  const stopTime = props.data.stopTime ? props.data.stopTime : trades[trades.length - 1]?.time

  // const {token} = useAuth()

  const [series, setSeries] = useState<any>();
  const [times, setTimes] = useState([]);

  useEffect(() => {
      const lwcCandleGraph = document.getElementById("lwc-candle-graph");
      while (lwcCandleGraph?.firstChild) {
        lwcCandleGraph.removeChild(lwcCandleGraph.firstChild);
      }

      const options = {
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
      }
      const chart = createChart('lwc-candle-graph', options);
      const candlestickSeries = chart.addCandlestickSeries()

      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();


      let dataReq = {
        exchange: exchange,
        command: "get_product_history",
        args: {
          symbol: symbol,
          epoch_start: startTime ? startTime - (60 * 60 * 300 * 10) : Date.now() / 1000 - (60 * 60 * 24 * 365),
          epoch_stop: stopTime ? stopTime + (60 * 60 * 300 * 10) : Date.now() / 1000,
          resolution: 3600
        },
      }

      axios.post('https://connect.blankly.finance', dataReq, {cancelToken: source.token}).then((res) => { //{headers: {token: token}}
        let result = json.parse(res.data.result);

        let data = [];

        const len = Object.keys(result['time']).length
        for (let i = 0; i < len; i++) {
          data.push({
            time: result['time'][i],
            open: result['open'][i],
            high: result['high'][i],
            low: result['low'][i],
            close: result['close'][i]
          })
        }
        candlestickSeries.setData(data)
        setTimes(Object.values(result['time']));
        loading(false);
      }).catch((err) => {
        if (axios.isCancel(err)) {
          // console.error("cancel")
        }
      })

      let markers: any = []
      if (type != GraphType.compare) {
        markers = getSingleMarker(trades, symbol)
      } else {
        markers = getMultiMarker(trades, symbol)
      }

      candlestickSeries.setMarkers(markers);
      setSeries(chart.timeScale());

      if (!width) {
        dynamicScale(chart, "lwc-candle-graph")
      }

      return () => {
        source.cancel()
      }
    },
    [trades, exchange, loading, startTime, stopTime, width, height, symbol, type]
  ) // ticker, exchange, epoch

  useEffect(() => {
    if (series && trades.length > 0) {
      const timestamp = getTime(trades[activeIndex]);
      let index = 0;
      for (let i = 1; i < times.length; i++) {
        if (timestamp <= times[i] && timestamp >= times[i - 1]) {
          index = i;
          break;
        }
      }
      series.scrollToPosition(index - times.length + 40, true);
    }
  }, [activeIndex, series, times, trades])


  return (<div/>)

}

export default LWCCandleGraph
