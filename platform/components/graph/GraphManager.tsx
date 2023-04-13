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
import Graph, {GraphType} from "@/components/graph/Graph";
import {getTrades, getTradesOnce} from "@/services/trades-store";
import {
  getAccountValues,
  getAccountValueSegments,
  getBacktestTimeseriesMetrics,
  getBacktestTrades,
  getBenchmarkReturns
} from "@/services/backtest-store";
import axios from "axios";
import {getPNLValueOnce} from "@/services/pnl-store";
import {getLiveBlanklyTimeseriesMetrics} from "@/services/metrics-store";

const LiveGraph = (props: { id: string, modelId: string, model: any, activeIndex?: number, width?: number, height?: number }) => {
  const id = props.id
  const modelId = props.modelId
  const model = props.model

  const [data, setData] = useState<any>()
  const [tickers, setTickers] = useState<any>()
  const [trades, setTrades] = useState<any>([])
  const [accountValue, setAccountValue] = useState<any>()
  const [isPNL, setIsPNL] = useState<boolean>()


  useEffect(() => {
    if (id && modelId && model) {
      // see if model is PNL
      getPNLValueOnce(id as string, modelId as string).then((query: any) => {
        setIsPNL(query.exists);

        // get model account value / PNL
        if (query.exists) {
          const PNLValue = query.data()?.PNLValue;
          if (PNLValue.length > 1) {
            setAccountValue(PNLValue)
          } else {
            setIsPNL(false)
          }

        } else {
          setAccountValue([])
        }
      });

      // get tickers
      let tks = []
      if (model.tickers) {
        for (const [key, value] of Object.entries(model.tickers)) {
          tks.push(key)
        }
      }
      setTickers(tks)

      // get trades
      const unsubscribe = getTrades(id as string, modelId as string).onSnapshot((query) => {
        const allTrades: any = [];
        query?.docs?.forEach((doc) => {
          allTrades.push(...Object.values(doc?.data()?.trades))
        });
        const allTradesSorted = allTrades.sort((tradeA: any, tradeB: any) =>
          Number(tradeB.time) - Number(tradeA.time)
        );
        setTrades(allTradesSorted);
      });

      return () => unsubscribe();
    }
  }, [id, model, modelId])

  useEffect(() => {
    if (model && tickers && trades && accountValue) {
      setData({
        id: id,
        modelId: modelId,
        model: model,
        tickers: tickers,
        trades: trades,
        accountValue: accountValue,
        startTime: model.deployedAt,
        stopTime: Date.now() / 1000,
        isPNL: isPNL
      })
    }
  }, [model, trades, accountValue, id, modelId, tickers, isPNL])

  return (
    <div>
      <Graph type={GraphType.live} data={data} activeIndex={props.activeIndex} width={props.width}
             height={props.height}/>
    </div>
  )
}

const BacktestGraph = (props: { id: string, modelId: string, backtest: any, benchmarks?: Array<string>, activeIndex?: number, width?: number, height?: number }) => {
  const id = props.id
  const modelId = props.modelId
  const backtest = props.backtest
  const benchmarks = props.benchmarks

  const [data, setData] = useState<any>()
  const [tickers, setTickers] = useState<any>([])
  const [trades, setTrades] = useState<any>()
  const [accountValue, setAccountValue] = useState<any>()
  const [benchmarkReturns, setBenchmarkReturns] = useState<any>()
  const [timeseriesMetrics, setTimeseriesMetrics] = useState<any>()

  useEffect(() => {
    if (id && modelId && backtest) {
      // get tickers
      let tks: Array<string> = []
      backtest?.result?.symbols?.map((ticker: string, index: number) => {
        tks.push(ticker)
      })
      setTickers(tks)

      // get trades
      getBacktestTrades(id, modelId, backtest?.id).then((doc) => {
        const data: any = doc.data()?.trades;
        setTrades(data)
      })

      // get account values
      getAccountValues(id, modelId, backtest?.id).then((doc) => {
        const data: any = doc.data()?.accountValues
        if (!data) {
          getAccountValueSegments(id, modelId, backtest?.id).then((newData) => {
            setAccountValue(newData);
          })
        } else {
          setAccountValue(data)
        }
      })

      // get timeseries metrics
      getBacktestTimeseriesMetrics(id, modelId, backtest.id).then((doc) => {
        const data: any = doc.data()?.timeseriesMetrics
        setTimeseriesMetrics(data)
      })

      // get benchmark returns
      if (benchmarks) {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        let benchmarkPromises: any = benchmarks?.map((symbol) => {
          return getBenchmarkReturns(symbol, backtest?.result?.startTime, backtest?.result?.stopTime, 'alpaca', source.token)
        })

        Promise.all(benchmarkPromises).then((benchmarks) => {
          setBenchmarkReturns(benchmarks)
        })
      }
    }
  }, [id, modelId, backtest, benchmarks])

  useEffect(() => {
    if (tickers && trades && accountValue && (!benchmarks || benchmarkReturns)) {
      setData({
        id: id,
        modelId: id,
        backtest: backtest,
        tickers: tickers,
        trades: trades,
        accountValue: accountValue,
        timeseriesMetrics: timeseriesMetrics,
        startTime: backtest?.result?.startTime,
        stopTime: backtest?.result?.stopTime,
        benchmarks: benchmarkReturns
      })
    }
  }, [accountValue, backtest, benchmarkReturns, benchmarks, id, tickers, timeseriesMetrics, trades])

  return (
    <div>
      <Graph type={GraphType.backtest} data={data} activeIndex={props.activeIndex}
             width={props.width} height={props.height}/>
    </div>
  )
}

const CompareGraph = (props: { id: string, modelIds: Array<string>, backtestIds: Array<string>, backtests: Array<any>, activeIndex?: number, width?: number, height?: number }) => {
  const id = props.id
  const modelIds = props.modelIds
  const backtestIds = props.backtestIds
  const backtests = props.backtests

  const [data, setData] = useState<any>()
  const [tickers, setTickers] = useState<any>([])
  const [trades, setTrades] = useState<any>()
  const [accountValues, setAccountValues] = useState<any>()
  const [timeseriesMetrics, setTimeseriesMetrics] = useState<any>()
  const [startTime, setStartTime] = useState<any>(0)
  const [stopTime, setStopTime] = useState<any>(0)

  useEffect(() => {
    if (id && modelIds && backtestIds && modelIds.length != 0 && modelIds.length == backtestIds.length) {
      // get tickers
      let tks: any = [];
      backtests?.map((backtest) => {
        backtest.result?.symbols?.map((symbol: any) => {
          tks.push(symbol);
        })
      })
      // @ts-ignore
      tks = [...new Set(tks)];
      tks.sort();
      setTickers(tks)

      // get accountValues
      let avsPromises: any = backtestIds.map((btId, index: number) => {
        return getAccountValues(id, modelIds[index], btId).then((doc) => {
          const data: any = doc.data()?.accountValues
          if (!data) {
            return getAccountValueSegments(id, modelIds[index], btId).then((newData) => {
              return newData
            })
          } else {
            return data
          }
        }, (e) => {
          console.error(e)
        })
      })
      Promise.all(avsPromises).then((avs) => {
        setAccountValues(avs)
      })

      // get initial times
      const startt = backtests.map((bt) => parseInt(bt.result.startTime, 10));
      setStartTime(Math.min(...startt))
      const stopt = backtests.map((bt) => parseInt(bt.result.stopTime, 10));
      setStopTime(Math.max(...stopt))

      // get trades
      const tradePromises = backtestIds?.map((btId: string, index) => {
        return getBacktestTrades(id, modelIds[index], btId).then((doc: any) => {
          const data = doc.data()?.trades
          return data;
        }, (e) => {
          console.error(e)
        })
      })

      Promise.all(tradePromises).then((finalTrades: any) => {
        let alltds: any = []
        finalTrades?.map((tds: any, index: number) => {
          if (tds) {
            let btTrades: any = tds?.map((trade: any) => {
              return {...trade, index: index};
            })
            alltds = [...alltds, ...btTrades];
          }
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
        setTrades(alltds);
      })

      // get timeseries metrics
      const timeseriesPromise = backtestIds?.map((btId: string, index) => {
        return getBacktestTimeseriesMetrics(id, modelIds[index], btId).then((doc) => {
          const data: any = doc.data()?.timeseriesMetrics
          return data
        }, (e) => {
          console.error(e)
        })
      })

      Promise.all(timeseriesPromise).then((tsMetrics) => {
        setTimeseriesMetrics(tsMetrics)
      })

    }
  }, [backtestIds, backtests, id, modelIds])

  useEffect(() => {
    if (backtests && tickers && accountValues && trades && timeseriesMetrics && startTime && stopTime) {
      setData({
        id: id,
        modelIds: modelIds,
        backtestIds: backtestIds,
        backtests: backtests,
        tickers: tickers,
        startTime: startTime,
        stopTime: stopTime,
        accountValues: accountValues,
        trades: trades,
        timeseriesMetrics: timeseriesMetrics,
      })
    }
  }, [accountValues, backtestIds, backtests, id, modelIds, startTime, stopTime, tickers, timeseriesMetrics, trades])

  return (
    <div>
      <Graph type={GraphType.compare} data={data} activeIndex={props.activeIndex} width={props.width}
             height={props.height}/>
    </div>
  )
}

// props: { id: string, modelIds: Array<string>, backtestIds: Array<string>, backtests: Array<any>, activeIndex?: number, width?: number, height?: number }
const CompareLiveGraph = ({id, modelIds, models, activeIndex, width, height}:
                            { id: string, modelIds: Array<string>, models: any, activeIndex?: number, width?: number, height?: number }) => {
  const [data, setData] = useState<any>()
  const [tickers, setTickers] = useState<any>([])
  const [trades, setTrades] = useState<any>()
  const [accountValues, setAccountValues] = useState<any>()
  const [timeseriesMetrics, setTimeseriesMetrics] = useState<any>()

  useEffect(() => {
    if (id && modelIds && modelIds.length != 0) {
      // get tickers
      let tks: any = [];
      models?.map((model: any) => {
        if (model.tickers) {
          for (let [ticker, value] of Object.entries(model.tickers)) {
            tks.push(ticker)
          }
        }
      })

      // @ts-ignore
      tks = [...new Set(tks)];
      tks.sort();
      setTickers(tks)

      // get accountValues
      let avsPromises: any = modelIds.map((mId, index: number) => {
        return getPNLValueOnce(id, mId).then((doc) => {
          const data: any = doc.data()?.PNLValue
          return data
        }, (e) => {
          console.error(e)
        })
      })
      Promise.all(avsPromises).then((avs) => {
        setAccountValues(avs)
      })

      // get trades
      const tradePromises = modelIds?.map((mId: string, index) => {
        return getTradesOnce(id, mId).then((collection: any) => {
          let totalTrades: any = []
          collection.docs.map((doc: any) => {
            let tradeMap = doc.data()?.trades

            if (tradeMap) {
              for (const [tradeId, trade] of Object.entries(tradeMap)) {
                // @ts-ignore
                totalTrades.push({...trade, id: tradeId, index: index})
              }
            }
          })
          return totalTrades
        }, (e) => {
          console.error(e)
        })
      })

      Promise.all(tradePromises).then((finalTrades: any) => {
        let alltds: any = []
        finalTrades?.map((tds: any, index: number) => {
          if (tds) {
            let btTrades: any = tds?.map((trade: any) => {
              return {...trade, index: index};
            })
            alltds = [...alltds, ...btTrades];
          }
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

        setTrades(alltds);
      })

      // get timeseries metrics
      const timeseriesPromise = modelIds?.map((mId: string, index) => {
        return getLiveBlanklyTimeseriesMetrics(id, mId).then((doc) => {
          const data: any = doc.data()?.timeseriesMetrics
          return data
        }, (e) => {
          console.error(e)
        })
      })

      Promise.all(timeseriesPromise).then((tsMetrics) => {
        setTimeseriesMetrics(tsMetrics)
      })

    }
  }, [id, modelIds, models])

  useEffect(() => {
    if (tickers && accountValues && trades && timeseriesMetrics) {
      setData({
        id: id,
        modelIds: modelIds,
        models: models,
        tickers: tickers,
        accountValues: accountValues,
        trades: trades,
        timeseriesMetrics: timeseriesMetrics,
        isPNL: true,
      })
    }
  }, [accountValues, id, modelIds, models, tickers, timeseriesMetrics, trades])

  return (
    <div>
      <Graph type={GraphType.compare} data={data} activeIndex={activeIndex} width={width}
             height={height}/>
    </div>
  )
}

export {LiveGraph, BacktestGraph, CompareGraph, CompareLiveGraph}
