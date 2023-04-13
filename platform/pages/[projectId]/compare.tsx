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

import {useRouter} from "next/router";
import React, {ReactElement, useEffect, useState} from "react";
import ConfigModal from "@/components/project/backtest/modals/ConfigModal";
import {getBacktestBlanklyMetrics, getBacktestOnce, getBacktestTrades} from "@/services/backtest-store";
import {processEpoch} from "@/utils/date";
import TransactionsTable from "@/components/project/backtest/tables/TransactionsTable";
import {getPrimaryColor} from "@/utils/general";
import CompareModal from "@/components/project/backtest/modals/CompareModal";
import NotFinishedModal from "@/components/general/modals/NotFinishedModal";
import BlackButton from "@/components/general/buttons/BlackButton";
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";
import Breadcrumbs from "@/components/project/general/Breadcrumbs";
import CompareMetricCard from "@/components/project/backtest/metrics/CompareMetricCard";
import Dropdown from "@/components/general/dropdowns/Dropdown";
import {getModelOnce} from "@/services/models-store";
import {CompareGraph} from "@/components/graph/GraphManager";
import ProjectDetailsLayout from "@/components/layouts/ProjectDetailsLayout";

const options = [
  // {label: "Default", value: "default"},
  {label: "Risk Metrics", value: "risk"},
  {label: "Returns", value: "return"},
  {label: "Ratio Analysis", value: "ratio"},
  {label: "Statistics", value: "statistic"},
  {label: "Time Metrics", value: "time"},
  {label: "Metadata", value: "metadata"},
  {label: "All", value: "all"},
  {label: "Custom", value: "custom"},
]

const Compare = () => {
  const router = useRouter();

  const {projectId} = router.query;

  const [ids, setIds] = useState<Array<String>>()
  const [backtestIds, setBacktestIds] = useState<Array<String>>()
  const [modelIds, setModelIds] = useState<Array<String>>()

  const [isConfigOpen, setConfigModal] = useState(false);
  const [backtests, setBacktests] = useState<any>([]);
  const [startTime, setStartTime] = useState(0);
  const [stopTime, setStopTime] = useState(0);

  const [allTrades, setAllTrades] = useState<any>();
  const [allMetrics, setAllMetrics] = useState<any>();

  const [tradeIndex, setTradeIndex] = useState<any>();
  const [limit, setLimit] = useState(50);
  const [isCompare, setCompare] = useState(false);
  const [isNotFinished, setNotFinished] = useState(false);

  const [selected, setSelected] = useState({label: "Risk Metrics", value: "risk"})
  const [colors, setColors] = useState([])

  useEffect(() => {
    const temps = sessionStorage.getItem('compareIds')?.split(',');

    if (!temps) {
      router.push(`/${projectId}`)
    }

    let backtestIdList: Array<String> = []
    let modelIdList: Array<String> = []

    temps?.map((id) => {
      const data = id.split('_');
      modelIdList.push(data[0]);
      backtestIdList.push(data[1]);
    })

    setIds(temps)
    setBacktestIds(backtestIdList)
    setModelIds(modelIdList)

  }, [projectId, router])
  // get backtesting documents
  useEffect(() => {
    if (backtestIds && modelIds && backtestIds.length > 0) {
      const promises = backtestIds.map((id, index) => {
        return getModelOnce(projectId as string, modelIds[index] as string).then((doc) => {
          const data = doc.data() as any;
          return getBacktestOnce(projectId as string, modelIds[index] as string, id as string).then((doc: any) => {
            return {...doc.data(), id: doc.id, name: data.name};
          });
        })
      });

      Promise.all(promises).then((bts) => {
        const startTimes = bts.map((bt) => parseInt(bt.result.startTime, 10));
        const stopTimes = bts.map((bt) => parseInt(bt.result.stopTime, 10));
        setStartTime(Math.min(...startTimes));
        setStopTime(Math.max(...stopTimes));
        setBacktests(bts);
      })
    }
  }, [backtestIds, modelIds, projectId])

  // get trades
  useEffect(() => {
    if (backtestIds && modelIds && backtestIds.length > 0) {
      const promises = backtestIds?.map((id, index: number) => {
        return getBacktestTrades(projectId as string, modelIds[index] as string, id as string).then((data: any) => {
          return data.data().trades;
        })
      })

      Promise.all(promises).then((trades) => {
        let alltds: any = []
        trades?.map((tds: any, index: number) => {
          let btTrades = tds?.map((trade: any) => {
            return {...trade, index: index};
          })
          alltds = [...alltds, ...btTrades];
        })

        alltds.sort(function (x: any, y: any) {
          if (x.time < y.time) {
            return -1;
          }
          if (x.time > y.time) {
            return 1;
          }
          return 0;
        })
        setAllTrades(alltds);
      })
    }
  }, [backtestIds, modelIds, projectId])

  // get backtesting metrics
  useEffect(() => {
    if (backtestIds && modelIds && backtestIds.length > 0) {
      const promises = backtestIds?.map((id, index: number) => {
        return getBacktestBlanklyMetrics(projectId as string, modelIds[index] as string, id as string).then((data: any) => {
          return data.data()?.metrics;
        })
      })

      Promise.all(promises).then((metrics) => {
        let allMetrics: any = []
        metrics?.map((metric: any) => {
          allMetrics.push(metric)
        })
        let metricList: any = []
        Object.entries(allMetrics[0]).forEach(([key, value]) => {
          let metricStats = []
          for (let i = 0; i < backtestIds.length; ++i) {
            metricStats.push(allMetrics[i][key])
          }
          metricList.push({key: key, values: metricStats})
        });

        setAllMetrics(metricList);
      })
    }
  }, [backtestIds, modelIds, projectId])

  useEffect(() => {
    setColors(backtests.map((bt: any, index: number) => {
      return getPrimaryColor(index);
    }))
  }, [backtests])

  const update = (e: any) => {
    setSelected(e);
  }

  return (
    <div className="h-auto">
      <div className="max-w-6xl mx-auto py-8 bg-white">
        <div className="pt-2 flex">
          <div className="w-2/5 flex">
            <div className="w-full">
              <Breadcrumbs location={"backtests"} backtestId={"Compare"}/>
              <h1 className="text-3xl font-semibold text-gray-900 pt-2 roboto">
                Comparing {backtests.length} Backtests
              </h1>
              <div className="pt-6 roboto text-md text-gray-400 flex">
                <div className="w-1/2">
                  Earliest Start: {processEpoch(startTime, "MM/DD/YYYY")}
                  <div className="text-black font-semibold pt-2">
                    Start: <span>{processEpoch(startTime, "MM/DD/YYYY")}</span>
                  </div>
                </div>
                <div className="w-1/2">
                  Latest Finish: {processEpoch(stopTime, "MM/DD/YYYY")}
                  <div className="text-black font-semibold pt-2">
                    End: <span>{processEpoch(stopTime, "MM/DD/YYYY")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/5 text-right mt-8 space-x-2">
            {/* <OutlineButton click={() => setConfigModal(true)}>
              View Backtest Config
            </OutlineButton> */}
            {/*<OutlineButton click={() => setNotFinished(true)}>*/}
            {/*  Export Result*/}
            {/*  <DownloadIcon className="w-4 h-4 mb-0.5 text-black inline ml-3"/>*/}
            {/*</OutlineButton>*/}
            <BlackButton click={() => setCompare(true)}>
              Add More Backtests
            </BlackButton>
            <ConfigModal open={isConfigOpen} close={() => setConfigModal(false)}/>
            <NotFinishedModal open={isNotFinished} close={() => setNotFinished(false)} type={"feature"}
                              featureName={"Export Compare Data"}/>
            <CompareModal open={isCompare} close={() => setCompare(false)} current={ids}/>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 mt-8">
        {[...backtests].map((res: any, i: number) => {
          return (
            <div key={res.id} className="border px-6 py-4 rounded-md gap-x-4">
              <div className="flex items-center float-right">
                <div className="rounded-full h-3.5 w-3.5" style={{background: getPrimaryColor(i)}}>

                </div>
              </div>
              <div>
                <div className="">
                  <div className="text-xs text-gray-400">
                    {res.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    Backtest ID: {res.id}
                  </div>
                </div>
                <div className="mt-2">
                  {
                    res.description?.length > 0 ?
                      (
                        <div className="text-gray-700 text-md">
                          {res.description}
                        </div>
                      ) : (
                        <div className="text-gray-400 italic text-md">
                          No Description
                        </div>
                      )
                  }
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="max-w-7xl mx-auto my-8 border border-gray-200 px-10 py-2 rounded-md">
        <div>
          <CompareGraph id={projectId as string} modelIds={modelIds as string[]}
                        backtestIds={backtestIds as string[]} backtests={backtests} activeIndex={tradeIndex}/>
        </div>
      </div>
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div>
          <h1 className="text-2xl font-medium">
            Backtesting Metrics
          </h1>
          <p className="text-sm text-blue-600 mt-1">
            How can I use this information?
          </p>
        </div>
        <div className="w-60">
          <Dropdown options={options} default={0} update={update}/>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
        {
          selected.value == "all" ?
            allMetrics?.map((metric: any, index: number) => {
              return (
                <CompareMetricCard metric={metric.values} backtestIds={ids as string[]} backtests={backtests}
                                   colors={colors} key={index}/>
              )
            }) : allMetrics?.map((metric: any, index: number) => {
              if (metric.values[0].type == selected.value) {
                return (
                  <CompareMetricCard metric={metric.values} backtestIds={ids as string[]} backtests={backtests}
                                     colors={colors} key={index}/>
                )
              }
            })
        }

      </div>
      <div className="max-w-6xl mx-auto mt-16 mb-40">
        <div className="text-2xl font-medium">Backtest Transactions</div>
        <div className="mt-8">
          {
            allTrades ? <TransactionsTable trades={allTrades.slice(0, limit)} activeTrade={tradeIndex}
                                           handleClick={(index: number) => setTradeIndex(index)}/> : <></>}
          {
            allTrades && allTrades.length > limit ? (
              <div className="mt-4">
                <MediumOutlineButton width={"full"} click={() => setLimit(limit + 50)}>
                  Load More
                </MediumOutlineButton>
              </div>
            ) : null
          }
        </div>
      </div>
    </div>

  )

};

Compare.getLayout = function getLayout(page: ReactElement) {
  return <ProjectDetailsLayout>{page}</ProjectDetailsLayout>;
};

export default Compare;
