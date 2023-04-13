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

import {MetricsDisplay} from "@/components/project/backtest/metrics/MetricsDisplay";
import {ArrowLeftIcon, ArrowRightIcon, CodeIcon} from "@heroicons/react/solid";
import {useEffect, useState} from "react";
import {
  getBacktestBlanklyMetrics,
  getBacktestBlanklyTimeseriesMetrics,
  getBacktestTrades
} from "@/services/backtest-store";
import {useRouter} from "next/router";
import TransactionsTable from "./tables/TransactionsTable";
import BacktestEmbedModal from "./modals/BacktestEmbedModal";
import {BacktestGraph} from "@/components/graph/GraphManager";
import ShareBacktestButton from "../general/ShareBacktestButton";
import {getModelOnce, updateModel} from "@/services/models-store";
import {generateLink} from "@/utils/dynamic-links";


const BacktestingOverview = (props: { backtest: any, benchmarks: Array<string>, benchmarkMetrics: any, compareMetrics: any }) => {
  const [trades, setTrades] = useState<any>([]);
  const [tradeIndex, setTradeIndex] = useState(0);
  const [limit, setLimit] = useState(50);
  const [backtestEmbed, showBacktestEmbed] = useState(false);
  const [metrics, setMetrics] = useState<any>({})
  const [timeseriesMetrics, setTimeseriesMetrics] = useState<any>({});
  const router = useRouter();
  const {projectId, modelId, backtestId} = router.query;
  const backtest = props.backtest;

  const [modelIsShared, setModelIsShared] = useState(false);

  useEffect(() => {
    getBacktestTrades(projectId as string, modelId as string, backtest.id).then((data: any) => {
      setTrades(data.data()?.trades);
    });
  }, [projectId, modelId, backtest])

  useEffect(() => {
    getBacktestBlanklyMetrics(projectId as string, modelId as string, backtestId as string).then((doc: any) => {
      const data = doc.data();
      setMetrics(data?.metrics);
    });

    getBacktestBlanklyTimeseriesMetrics(projectId as string, modelId as string, backtestId as string).then((doc: any) => {
      const data = doc.data();
      setTimeseriesMetrics(data?.timeseriesMetrics);
    });
  }, [backtestId, modelId, projectId]);

  const previousTrade = () => {
    let count = tradeIndex
    count--
    if (count < 0) {
      count++
    }
    setTradeIndex(count)
  }

  const nextTrade = () => {
    let count = tradeIndex
    count++
    if (count >= trades.length) {
      count--
    }
    setTradeIndex(count)
  };

  const handleClick = (index: number) => {
    setTradeIndex(index);
  }

  useEffect(() => {
    getModelOnce(projectId as string, modelId as string).then((doc) => {
      const data = doc.data()
      if (data !== undefined && data.share === false) {
        setModelIsShared(false)
      } else if (data !== undefined && data.share) {
        setModelIsShared(true)
      }
    })
  }, [modelId, projectId])

  async function shareModel() {
    getModelOnce(projectId as string, modelId as string).then((doc) => {
      const model: any = doc.data()
      if (model && model.share && model.link != 'https://app.blankly.finance/url/url') {
        setModelIsShared(true)
      } else {
        generateLink(`${projectId}/${modelId}/overview`).then((res) => {
          updateModel(projectId as string, modelId as string, {share: true, link: res.data.shortLink});
        });
        setModelIsShared(true)
      }
    })
  }

  return (
    <div className="px-5 sm:px-0">
      <div className="max-w-7xl space-x-2 mx-auto flex justify-end mb-3">
        <ShareBacktestButton isShared={modelIsShared} shareModel={shareModel}/>
        <button onClick={() => showBacktestEmbed(true)}
                className="border border-gray-200 rounded-md px-3 text-gray-500 py-1.5 hover:bg-gray-50 transition text-sm flex items-center space-x-2">
          <CodeIcon className="w-4 h-4 mr-2"/> Embed Result
        </button>
      </div>
      <BacktestEmbedModal open={backtestEmbed} close={() => showBacktestEmbed(false)}/>
      <div className="max-w-7xl mx-auto border rounded-lg px-8 pb-4 mb-4">
        <BacktestGraph id={projectId as string} modelId={modelId as string} backtest={backtest}
                       activeIndex={tradeIndex} benchmarks={props.benchmarks}/>
      </div>

      <div className="max-w-7xl mx-auto flex md:justify-end">
        <div className="text-right flex-1 justify-between flex md:justify-end">
          <button onClick={previousTrade}
                  className="border w-full md:w-auto text-sm rounded-md mr-1 bg-white hover:border-gray-400 hover:bg-gray-100 py-2 px-6 inline-flex items-center">
            <ArrowLeftIcon className="w-4 h-4 mr-4 inline align-middle"/>
            Previous <span className="hidden md:block ml-1">Trade</span>
          </button>
          <button onClick={nextTrade}
                  className="bg-black w-full md:w-auto text-white hover:border-gray-900 py-2 px-8 items-center justify-between inline-flex text-sm items-center border shadow-sm rounded-md mr-1  hover:bg-gray-700">
            Next <span className="hidden md:block ml-1">Trade</span>
            <ArrowRightIcon className="w-4 h-4 ml-4 inline align-middle"/>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto h-auto bg-white pb-36">
        <div className="w-full">
          <div className="mt-6">
            {
              backtest.result ?
                <MetricsDisplay compareMetrics={props.compareMetrics} timeseriesMetrics={timeseriesMetrics}
                                type={"Backtest"}
                                benchmarks={props?.benchmarkMetrics} metrics={metrics}/> : <></>
            }
          </div>
        </div>
        <div className="flex">
          <div className="w-full overflow-hidden">
            <h1 className="text-2xl font-medium text-gray-900 roboto pt-12 mb-8">
              Backtest Transactions
            </h1>
            {
              backtest.result ? <TransactionsTable trades={trades?.slice(0, limit)} activeTrade={tradeIndex}
                                                   handleClick={handleClick}/> : <></>}

            {
              trades?.length > limit ? (<button onClick={() => setLimit(limit + 50)}
                                                className="roboto w-full border rounded-md mt-6 py-2 text-sm hover:bg-gray-100">
                Load More
              </button>) : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export {BacktestingOverview}
