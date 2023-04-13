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
import TransactionsTable from "@/components/project/backtest/tables/TransactionsTable";
import {getPrimaryColor} from "@/utils/general";
import CompareModal from "@/components/project/backtest/modals/CompareModal";
import NotFinishedModal from "@/components/general/modals/NotFinishedModal";
import BlackButton from "@/components/general/buttons/BlackButton";
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";
import Breadcrumbs from "@/components/project/general/Breadcrumbs";
import Dropdown from "@/components/general/dropdowns/Dropdown";
import {getModelOnce} from "@/services/models-store";
import {CompareLiveGraph} from "@/components/graph/GraphManager";
import ProjectDetailsLayout from "@/components/layouts/ProjectDetailsLayout";
import {getTradesOnce} from "@/services/trades-store";
import {getLiveBlanklyMetrics} from "@/services/metrics-store";
import CompareLiveMetricCard from "@/components/project/live/cards/CompareLiveMetricCard";

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

const LiveCompare = () => {
  const router = useRouter();

  const {projectId} = router.query;

  const [ids, setIds] = useState<Array<String>>()
  const [modelIds, setModelIds] = useState<Array<String>>()

  const [models, setModels] = useState<Array<any>>()

  const [isConfigOpen, setConfigModal] = useState(false);

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
    setModelIds(temps)
  }, [projectId, router])

  // get backtesting documents
  useEffect(() => {
    if (modelIds && modelIds.length > 0) {
      const promises = modelIds.map((id, index) => {
        return getModelOnce(projectId as string, modelIds[index] as string).then((doc) => {
          const data = doc.data() as any;
          return {...doc.data(), id: doc.id}
        })
      });

      Promise.all(promises).then((mds: any) => {
        setModels(mds)
      })
    }
  }, [modelIds, projectId])

  // get trades
  useEffect(() => {
    if (modelIds && modelIds.length > 0) {
      const promises = modelIds.map((id, index: number) => {
        return getTradesOnce(projectId as string, id as string).then((collection: any) => {
          let totalTrades: any = []
          collection.docs.map((doc: any) => {
            let tradeMap = doc.data()?.trades

            if (tradeMap) {
              for (const [tradeId, trade] of Object.entries(tradeMap)) {
                // @ts-ignore
                totalTrades.push({...trade, id: tradeId})
              }
            }
          })
          return totalTrades
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
  }, [modelIds, projectId])

  // get backtesting metrics
  useEffect(() => {
    if (modelIds && modelIds.length > 0) {
      const promises = modelIds?.map((id, index: number) => {
        return getLiveBlanklyMetrics(projectId as string, id as string).then((data: any) => {
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
          for (let i = 0; i < modelIds.length; ++i) {
            metricStats.push(allMetrics[i][key])
          }
          metricList.push({key: key, values: metricStats})
        });

        setAllMetrics(metricList);
      })
    }
  }, [modelIds, projectId])

  useEffect(() => {
    if (ids) {
      // @ts-ignore
      setColors(ids.map((bt: any, index: number) => {
        return getPrimaryColor(index);
      }))
    }
  }, [ids])

  const update = (e: any) => {
    setSelected(e);
  }

  useEffect(() => {
    document.title = "Live Compare"
  }, [])

  return (
    <>
      <body>
      <div className="h-auto">
        <div className="max-w-6xl mx-auto py-8 bg-white">
          <div className="pt-2 flex">
            <div className="w-2/5 flex">
              <div className="w-full">
                <Breadcrumbs location={"backtests"} backtestId={"Compare"}/>
                <h1 className="text-3xl font-semibold text-gray-900 pt-2 roboto">
                  Comparing {modelIds?.length} Models
                </h1>
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
                Add More Models
              </BlackButton>
              <ConfigModal open={isConfigOpen} close={() => setConfigModal(false)}/>
              <NotFinishedModal open={isNotFinished} close={() => setNotFinished(false)} type={"feature"}
                                featureName={"Export Compare Data"}/>
              <CompareModal open={isCompare} close={() => setCompare(false)} current={ids}/>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 mt-8">
          {models?.map((res: any, i: number) => {
            return (
              <div key={res.id} className="border px-6 py-4 rounded-md gap-x-4">
                <div className="flex items-center float-right">
                  <div className="rounded-full h-3.5 w-3.5" style={{background: getPrimaryColor(i)}}>

                  </div>
                </div>
                <div>
                  <div className="">
                    <div className="text-xs text-gray-400">
                      Model ID: {res.id}
                    </div>
                  </div>
                  <div className="mt-2">
                    {
                      res.name?.length > 0 ?
                        (
                          <div className="text-gray-700 text-md">
                            {res.name}
                          </div>
                        ) : (
                          <div className="text-gray-400 italic text-md">
                            {res.id}
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
            <CompareLiveGraph id={projectId as string} modelIds={modelIds as string[]}
                              models={models} activeIndex={tradeIndex}/>
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
                  <CompareLiveMetricCard metric={metric.values} modelIds={ids as string[]} models={models}
                                         colors={colors} key={index}/>
                )
              }) : allMetrics?.map((metric: any, index: number) => {
                if (metric.values[0].type == selected.value) {
                  return (
                    <CompareLiveMetricCard metric={metric.values} modelIds={ids as string[]} models={models}
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
      </body>
    </>
  )
};

LiveCompare.getLayout = function getLayout(page: ReactElement) {
  return <ProjectDetailsLayout>{page}</ProjectDetailsLayout>;
};

export default LiveCompare;
