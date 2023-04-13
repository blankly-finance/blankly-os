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

// import {useEffect, useState} from "react";
// import {ChartingLibraryWidgetOptions, IChartWidgetApi, widget} from "@/public/static/charting_library";
// import {ResolutionString} from "@/public/static/charting_library/datafeed-api";
// import Datafeed from "@/libs/datafeed";
// import {getTime} from "@/libs/trade-utils";
// import {setMultiShape, setSingleShape} from "@/components/graph/utils/tvUtils";
// import {GraphType} from "@/components/graph/Graph";
// import {classNames} from "@/utils/general";
// import axios from "axios";
//
// const TVCandleGraph = (props: { data: any, type: GraphType, symbol: string, loading: any, activeIndex?: number, width?: number, height?: number }) => {
//   const [pressed, setPressed] = useState<any>(false)
//
//   return (
//     <div className={classNames(pressed ? 'cursor-pointer' : '', "flex items-center justify-center w-full h-auto")}
//          id="tv-candle-graph"
//          onPointerDown={() => setPressed(true)}
//          onPointerUp={() => setPressed(false)}>
//       <_TVCandleGraph data={props.data} type={props.type} symbol={props.symbol} loading={props.loading}
//                       activeIndex={props.activeIndex}
//                       width={props.width} height={props.height}/>
//     </div>
//   )
// }
//
// const _TVCandleGraph = (props: { data: any, type: GraphType, symbol: string, loading: any, activeIndex?: number, width?: number, height?: number }) => {
//   const trades = props.data.trades;
//   const type = props.type
//   const symbol = props.symbol;
//   const exchange = props.data.exchange ? props.data.exchange : "alpaca"
//   const loading = props.loading
//   const activeIndex = props.activeIndex ? props.activeIndex : 0;
//
//   const height = props.height ? props.height : 600
//   const width = props.width ? props.width : 2000
//
//   const [w, setW] = useState<any>();
//   useEffect(() => {
//     if (symbol) {
//       const CancelToken = axios.CancelToken;
//       const source = CancelToken.source();
//
//       const widgetOptions: ChartingLibraryWidgetOptions = {
//         symbol: symbol,
//         interval: '1h' as ResolutionString,
//         container: document.getElementById("tv-candle-graph") as HTMLElement,
//         locale: "en",
//         height: height,
//         disabled_features: ['header_symbol_search', 'symbol_search_hot_key', 'border_around_the_chart'],
//         width: width,
//         datafeed: new Datafeed(exchange, [symbol], source.token),
//         library_path: '/static/charting_library/',
//       };
//       const tvWidget = new widget(widgetOptions)
//       setW(tvWidget);
//
//       tvWidget.onChartReady(() => {
//           if (type != GraphType.compare) {
//             setSingleShape(tvWidget, trades, symbol)
//           } else {
//             setMultiShape(tvWidget, trades, symbol)
//           }
//           loading(false)
//         }
//       )
//       return () => {
//         source.cancel()
//       }
//     }
//   }, [exchange, height, loading, symbol, trades, type, width])
//
//   useEffect(() => {
//     try {
//       if (w) {
//         w.onChartReady(() => {
//           const chart = w.activeChart() as IChartWidgetApi;
//           if (chart && trades.length > 0) {
//             const delta = chart.getVisibleRange().to - chart.getVisibleRange().from;
//             const trade_time = getTime(trades[activeIndex]);
//             chart.setVisibleRange({from: trade_time - delta / 2, to: trade_time + delta / 2})
//           }
//         })
//       }
//     } catch {
//     }
//   }, [w, activeIndex, trades])
//
//   return (
//     <div/>
//   )
// }
//
// export default TVCandleGraph

export {}
