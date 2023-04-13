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
import React, {ReactElement, useCallback, useEffect, useState} from "react";
import ModelLayout from "@/components/layouts/ModelNavLayout";
import {BacktestingOverview} from "@/components/project/backtest/BacktestingOverview";
import ConfigModal from "@/components/project/backtest/modals/ConfigModal";
import SignalBacktestModal from "@/components/project/backtest/modals/SignalBacktestModal";
import {
  getAccountValues,
  getAccountValueSegments,
  getBacktestSubscription,
  getBenchmarkMetrics,
  getBenchmarkReturns
} from "@/services/backtest-store";
import {processEpoch} from "@/utils/date";
import ProfileIcon from "@/components/general/profile/ProfileIcon";
import OutlineButton from "@/components/general/buttons/OutlineButton";
import BlackButton from "@/components/general/buttons/BlackButton";
import Breadcrumbs from "@/components/project/general/Breadcrumbs";
import CompareModal from "@/components/project/backtest/modals/CompareModal";
import {useAuth} from "@/libs/auth";
import BenchmarkAdder from "@/components/project/backtest/BenchmarkAdder";
import {BeakerIcon, LightningBoltIcon} from "@heroicons/react/outline";
import axios from "axios";
import {classNames, getPrimaryColor} from "@/utils/general";

const Backtest = () => {
  const router = useRouter();
  const {projectId, modelId, backtestId} = router.query;

  const [isConfigModal, setConfigModal] = useState(false);
  const [isSignalModal, setSignalModal] = useState(false);
  const [backtest, setBacktest] = useState<any>({});
  const {uid} = useAuth();
  const [accountValue, setAccountValue] = useState<any>([]);
  const [benchmarkAdderModal, setBenchmarkAdderModal] = useState(false);
  const [isCompareOpen, setCompareModal] = useState(false);
  const [compareId, setCompareId] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [compareMetrics, setCompareMetrics] = useState<any>({});

  const [benchmarks, setBenchmarks] = useState<any>([]);
  const [benchmarkMetrics, setBenchmarkMetrics] = useState<any>(undefined);

  // Get backtest data
  useEffect(() => {
    const unsubscribe = getBacktestSubscription(projectId as string, modelId as string, backtestId as string).onSnapshot((doc) => {
      const data: any = doc.data();
      const bt = {...data, id: doc.id};
      setBacktest(bt);
    }, () => {
      router.push('/dashboard')
    })
    getAccountValues(projectId as string, modelId as string, backtest?.id as string).then((doc) => {
      const data: any = doc.data()?.accountValues
      if (!data) {
        getAccountValueSegments(projectId as string, modelId as string, backtest?.id as string).then((newData) => {
          if (newData && newData.length > 0) {
            setAccountValue(newData);
            setStartTime(newData[0]['time']);
            setEndTime(newData[data.length - 1]['time'])
          }
        })
      } else {
        setStartTime(data[0]['time']);
        setEndTime(data[data.length - 1]['time'])
        setAccountValue(data)
      }
    })
    return () => unsubscribe();
  }, [projectId, modelId, backtestId, router, backtest?.id])

  const addBenchmark = useCallback((benchmark: string) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    getBenchmarkReturns(benchmark, startTime, endTime, '', source.token).then((data: any) => {
      if (!data) {
        throw "invalid data"
      }
      getBenchmarkMetrics(accountValue, data, source.token).then((result: any) => {
        if (!result) {
          throw 'invalid result'
        }
        setBenchmarks([...benchmarks, benchmark]);
        setCompareMetrics(result.compareMetrics);
        if (benchmarkMetrics) {
          const newMetrics = {...benchmarkMetrics};
          for (let key in newMetrics) {
            newMetrics[key].push({symbol: benchmark, value: result.benchmarkMetrics[key].value});
          }
          setBenchmarkMetrics(newMetrics)
        } else {
          const metrics = result.benchmarkMetrics;
          const newMetrics: any = {};
          for (let key in metrics) {
            newMetrics[key] = [{symbol: benchmark, value: metrics[key].value}]
          }
          setBenchmarkMetrics(newMetrics)
        }
      }).catch((e) => {
        // stuff happens here
      })
    }).catch((e) => {
      console.error("invalid ticker")
    });

    return () => {
      source.cancel()
    }
  }, [accountValue, benchmarkMetrics, benchmarks, endTime, startTime])

  const removeBenchmark = useCallback((benchmark: string) => {
    const newData = benchmarks.filter((value: any) => value !== benchmark);
    const newMetrics = {...benchmarkMetrics};
    for (let key in newMetrics) {
      newMetrics[key] = newMetrics[key].filter((value: any) => value.symbol !== benchmark);
    }
    setBenchmarkMetrics(newMetrics)
    setCompareMetrics({});
    setBenchmarks(newData)
  }, [benchmarkMetrics, benchmarks])

  return (
    <div className="h-auto">
      <div className="max-w-6xl mx-auto py-8 bg-white p-5 sm:px-0">
        <Breadcrumbs location={"backtests"} backtestId={backtest.id}/>
        <div className="pt-2 flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-row sm:w-3/5 items-start">
            <div>
              <h1 className="text-2xl sm:w-3/5 font-semibold text-gray-900 pt-2 roboto flex">
                Backtest {backtest.id}
              </h1>
              <div className="flex space-x-4 text-sm mt-2">
                <p><span
                  className="font-semibold">Start:</span> {processEpoch(backtest?.result?.startTime, 'l')}
                </p>
                <p><span
                  className="font-semibold">End:</span> {processEpoch(backtest?.result?.stopTime, 'l')}
                </p>
              </div>
              <div className="w-3/5 roboto text-md mt-3 text-gray-400">
                {backtest.description ? backtest.description : "No Description Given"} <br/>
                <div className="flex mt-1 text-sm items-center">
                  <div>
                    Ran by:
                  </div>
                  <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative  ml-2">
                    <ProfileIcon id={backtest?.user ? backtest.user : uid}/>
                  </div>
                </div>
                <div className="mt-3">
                  <a onClick={() => router.push(router.asPath.slice(0, -8) + "log")}
                     className="cursor-pointer text-sm text-blue-500">
                    View Backtest Logs &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block flex-1 text-right mt-8 space-x-2">
            {/* <OutlineButton click={() => setConfigModal(true)}>
              View Backtest Config
            </OutlineButton> */}
            <ConfigModal open={isConfigModal} close={() => setConfigModal(false)}/>
            <SignalBacktestModal open={isSignalModal} close={() => setSignalModal(false)}/>
            <OutlineButton click={() => {
              setBenchmarkAdderModal(true)
            }}>
              <div className="flex items-center space-x-2">
                <span>Add Benchmark</span>
                <span><LightningBoltIcon className="w-4 h-4"/></span>
              </div>
            </OutlineButton>
            <BenchmarkAdder open={benchmarkAdderModal} benchmarks={benchmarks}
                            del={(benchmark: string) => removeBenchmark(benchmark)}
                            update={(benchmark: string) => addBenchmark(benchmark)}
                            close={() => setBenchmarkAdderModal(false)}/>
            <BlackButton click={() => {
              setCompareModal(true);
              setCompareId(`${modelId}_${backtest.id}`)
            }}>
              <div className="flex space-x-2">
                Compare This Backtest
                <BeakerIcon className="ml-3 w-5 h-5"/>
              </div>
            </BlackButton>
          </div>
          <CompareModal open={isCompareOpen} close={() => setCompareModal(false)} current={[compareId]}/>
          <div className="block md:hidden flex-1 mt-8 space-y-2 flex flex-col">
            {/* <OutlineButton click={() => setConfigModal(true)}>
              View Backtest Config
            </OutlineButton> */}
            <ConfigModal open={isConfigModal} close={() => setConfigModal(false)}/>
            <SignalBacktestModal open={isSignalModal} close={() => setSignalModal(false)}/>
            {/* <BlackButton click={() => {
              setCompareModal(true);
              setCompareId(backtest.id)
            }}>
              Compare This Backtest
            </BlackButton> */}
          </div>
        </div>
      </div>
      <div className={classNames(benchmarks.length ? "" : "hidden", "max-w-6xl mx-auto mt-5")}>
        <div className="roboto text-2xl font-semibold">
          Benchmarks
        </div>

        <div className="grid grid-cols-5 gap-6 mt-2">
          {
            benchmarks.map((benchmark: string, index: number) => {
              return (
                <div key={benchmark} className="border px-6 py-4 rounded-md gap-x-4">
                  <div className="flex items-center float-right">
                    <div className="rounded-full h-3.5 w-3.5 mt-1" style={{background: getPrimaryColor(index)}}>

                    </div>
                  </div>
                  <div>
                    <div className="">
                      <div className="text-md text-gray-800">
                        {benchmark}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      {
        backtest.result ? <BacktestingOverview compareMetrics={compareMetrics} benchmarkMetrics={benchmarkMetrics}
                                               benchmarks={benchmarks}
                                               backtest={backtest}/> : <></>
      }

    </div>

  )

};

Backtest.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};

export default Backtest;
