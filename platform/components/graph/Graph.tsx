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
import Dropdown from "@/components/general/dropdowns/Dropdown";
import dynamic from "next/dynamic";

// imports for graphs which need ssr off
const BaselineGraph = dynamic(() => import("@/components/graph/lightweight-charts/BaselineGraph"), {
  ssr: false,
});
const MultilineGraph = dynamic(() => import("@/components/graph/lightweight-charts/MultilineGraph"), {
  ssr: false,
});
const LWCCandleGraph = dynamic(() => import("@/components/graph/lightweight-charts/LWCCandleGraph"), {
  ssr: false,
});
// const TVCandleGraph = dynamic(() => import("@/components/graph/tradingview/TVCandleGraph"), {
//   ssr: false,
// });


enum GraphType {
  live = "live",
  backtest = "backtest",
  compare = "compare"
}

const defaultTabs = [
  {label: "Advanced", value: 0},
  {label: "Position", value: 1}
]

const Graph = (props: { type: GraphType, data: any, activeIndex?: number, width?: number, height?: number }) => {
  // handle required parameters
  const type = props.type
  const data = props.data

  // accepts optional arguments
  const activeIndex = props.activeIndex

  // used to make graph load
  const [graphLoading, setGraphLoading] = useState(true);

  // used for dropdown management
  const [graphIndex, setGraphIndex] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [graphSelection, setGraphSelection] = useState([{label: "Simple", value: 0}])
  const [tickers, setTickers] = useState([{label: "Account", value: 0}])

  // get tab data
  useEffect(() => {
    let tabs: any = []
    if (type != GraphType.live && !data?.isPNL) {
      tabs = [{label: "Account", value: 0}]
    } else if (data?.isPNL) {
      tabs = [{label: "PNL", value: 0}]
    }

    // set live tabs
    data?.tickers?.map((ticker: string, index: number) => {
      tabs.push({label: ticker, value: data?.isPNL || data.backtest || data.backtestIds ? index + 1 : index})
    })

    setTickers(tabs)
  }, [data, type])

  // handle tab modification to hide options for different graph views
  useEffect(() => {
    if (tickerIndex == 0) {
      setGraphIndex(0)
      setGraphSelection([{label: "Simple", value: 0}])
    } else {
      setGraphSelection(defaultTabs)
    }
  }, [tickerIndex, tickers])

  // handle activeIndex
  useEffect(() => {
    if (activeIndex) {
      const found: any = tickers.find((element) => element.label == data.trades[activeIndex].symbol)
      if (found.value != tickerIndex) {
        setGraphLoading(true)
      }

      if (graphIndex == 2) {
        setGraphLoading(true)
        setGraphIndex(0)
      }
      setTickerIndex(found.value)
    }
  }, [activeIndex])

  const handleGraphChange = (index: number) => {
    if (index != graphIndex) {
      setGraphLoading(true)
    }
    setGraphIndex(index)
  }

  const handleTickerChange = (index: number) => {
    if (index != tickerIndex) {
      setGraphLoading(true)
    }
    setTickerIndex(index)
  }

  return (
    <div>
      <div className="roboto flex flex-col sm:flex-row mt-8">
        <div className="mr-auto">
          <h1
            className="text-xl text-center font-semibold mt-2 text-gray-800">
            {tickers[tickerIndex]?.label}
          </h1>
        </div>
        <div className="w-full sm:w-32 mr-4">
          <Dropdown update={(e: any) => handleGraphChange(e.value)} options={graphSelection} default={graphIndex}/>
        </div>
        <div className="w-full sm:w-32">
          <Dropdown update={(e: any) => handleTickerChange(e.value)} options={tickers} default={tickerIndex}/>
        </div>
      </div>

      {
        graphLoading ?
          <div className="flex justify-center items-center py-32">
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </div>
          :
          null
      }

      <div className={graphLoading ? 'hidden' : 'block mt-3 rounded-md p-2'}>
        {
          // account value graph
          // (tickers[tickerIndex]?.label == "PNL" || tickers[tickerIndex]?.label == "Account") && type != GraphType.compare && data ?
          //   <BaselineGraph data={data} loading={setGraphLoading} width={props.width}
          //                  height={props.height}/>
          //
          //   // compare account value graph
          //   : tickerIndex == 0 && type == GraphType.compare && data ?
          //     <MultilineGraph data={data} loading={setGraphLoading} width={props.width} height={props.height}/>
          //
          //     // simple symbol graph
          //     // graphIndex == 0 && data ?
          //     //   <LWCCandleGraph data={data} type={type} symbol={tickers[tickerIndex]?.label} loading={setGraphLoading}
          //     //                   activeIndex={props.activeIndex} width={props.width} height={props.height}/>
          //
          //     // advanced symbol graph
          //     : graphIndex == 0 && data ?
          //       <TVCandleGraph data={data} type={type} symbol={tickers[tickerIndex]?.label} loading={setGraphLoading}
          //                      activeIndex={props.activeIndex} width={props.width} height={props.height}/>
          //       // position graphs
          //       : graphIndex == 1 && data && type != GraphType.compare ?
          //         <BaselineGraph data={data} loading={setGraphLoading} symbol={tickers[tickerIndex]?.label}
          //                        width={props.width} height={props.height}/>
          //         // position graph for compare
          //         : graphIndex == 1 && data && type == GraphType.compare ?
          //           <MultilineGraph data={data} loading={setGraphLoading} symbol={tickers[tickerIndex]?.label}
          //                           width={props.width} height={props.height}/> : null

            <BaselineGraph data={data} loading={setGraphLoading} width={props.width}
                           height={props.height}/>
        }
      </div>
    </div>
  )
}

export default Graph
export {GraphType}
