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

import {Transaction} from '@/types/transaction';
import {Backtest} from '@/types/backtest';
import {deleteDoc, generateId, getCollection, getCollectionRef, getDoc, getDocRef, setDoc} from '@/libs/firestore';
import axios from 'axios';
import json from "json5";
import axiosRetry from 'axios-retry';


export function createQuantstatsClient() {
  const instance = axios.create({
    baseURL: 'https://metrics-service-api-67jfnx2vvq-uc.a.run.app'
    // baseURL: 'http://127.0.0.1:5000/'
  });

  axiosRetry(instance, {retryDelay: axiosRetry.exponentialDelay});

  instance.interceptors.response.use((value) => {
    return value.data;
  });
  return instance;
}

function getBacktests(projectId: string, modelId: string, limit = 20) {
  return getCollectionRef(`projects/${projectId}/models/${modelId}/backtests`).orderBy('time', 'desc').limit(limit);
}

function getBacktestsOnce(projectId: string, modelId: string, limit = 20) {
  return getCollection(`projects/${projectId}/models/${modelId}/backtests`);
}

function getBacktestTrades(projectId: string, modelId: string, backtestId: string) {
  return getDoc(`projects/${projectId}/models/${modelId}/backtests/${backtestId}/trades/trades`);
}

function getBacktestBlanklyMetrics(projectId: string, modelId: string, backtestId: string) {
  return getDoc(`projects/${projectId}/models/${modelId}/backtests/${backtestId}/metrics/blankly`)
}

function getBacktestBlanklyTimeseriesMetrics(projectId: string, modelId: string, backtestId: string) {
  return getDoc(`projects/${projectId}/models/${modelId}/backtests/${backtestId}/timeseriesMetrics/blankly`)
}

function getBacktestCustomMetrics(projectId: string, modelId: string, backtestId: string) {
  return getDoc(`projects/${projectId}/models/${modelId}/backtests/${backtestId}/metrics/custom`)
}

function getBacktestBlanklyIndicators(projectId: string, modelId: string, backtestId: string) {
  return getDoc(`projects/${projectId}/models/${modelId}/backtests/${backtestId}/indicators/blankly`)
}

function getBacktestCustomIndicators(projectId: string, modelId: string, backtestId: string) {
  return getDoc(`projects/${projectId}/models/${modelId}/backtests/${backtestId}/indicators/custom`)
}

function getBacktestTimeseriesMetrics(projectId: string, modelId: string, backtestId: string) {
  return getDoc(`projects/${projectId}/models/${modelId}/backtests/${backtestId}/timeseriesMetrics/blankly`)
}

function getAccountValues(projectId: string, modelId: string, backtestId: string) {
  return getDoc(`projects/${projectId}/models/${modelId}/backtests/${backtestId}/accountValues/accountValues`);
}

function getAccountValueSegments(projectId: string, modelId: string, backtestId: string) {
  return getCollection(`projects/${projectId}/models/${modelId}/backtests/${backtestId}/accountValues`).then((query) => {
    let res: any = [];
    query.docs.forEach((data) => {
      res = [...res, ...data.data().accountValues]
    })
    return res;
  })
}

function getBacktestSubscription(projectId: string, modelId: string, id: string) {
  return getDocRef(`projects/${projectId}/models/${modelId}/backtests/${id}`);
}

function getBacktestOnce(projectId: string, modelId: string, backtestId: string) {
  return getDoc(`projects/${projectId}/models/${modelId}/backtests/${backtestId}`);
}

function deleteBacktest(projectId: string, modelId: string, backtestId: string) {
  return deleteDoc(`projects/${projectId}/models/${modelId}/backtests/${backtestId}`);
}

function createBacktest(projectId: string, modelId: string, backtest: Backtest) {
  const id = generateId();
  return setDoc(`projects/${projectId}/models/${modelId}/backtests/${id}`, backtest);
}

function updateBacktest(projectId: string, modelId: string, id: string, backtest: Partial<Backtest>) {
  return setDoc(`projects/${projectId}/models/${modelId}/backtests/${id}`, backtest, true);
}

function updateBacktestTrade(projectId: string, modelId: string, backtestId: string, id: string, trade: Transaction) {
  return setDoc(`projects/${projectId}/models/${modelId}/backtests/${backtestId}/trades/${id}`, trade, true);
}

function getBenchmarkMetrics(returns: any[], benchmark: string[], cancelToken: any) {
  const instance = createQuantstatsClient()
  return instance.post('/get-metrics', {
    compare: true,
    accountValues: returns,
    benchmark
  }, {cancelToken: cancelToken})
}

function getBenchmarkReturns(symbol: string, startTime: number, stopTime: number, exchange: string, cancelToken: any) {
  let dataReq = {
    exchange: exchange,
    command: "get_product_history",
    args: {
      symbol: symbol,
      epoch_start: startTime,
      epoch_stop: stopTime,
      resolution: 3600
    }
  }
  return axios.post('https://connect.blankly.finance', dataReq, {cancelToken: cancelToken}).then((res) => { //{headers: {token: token}}
    try {
      let result = json.parse(res.data.result);

      let data = [];
      for (let i = 0; i < Object.keys(result['time']).length; i++) {
        data.push({
          time: result['time'][i],
          value: result['close'][i]
        })
      }
      return data
    } catch (e) {
      console.error(e)
    }
  })
}

export {
  getBacktests,
  getBacktestSubscription,
  getBacktestTrades,
  getBacktestBlanklyTimeseriesMetrics,
  getBenchmarkReturns,
  getBenchmarkMetrics,
  getBacktestBlanklyMetrics,
  getBacktestCustomMetrics,
  getBacktestBlanklyIndicators,
  getBacktestCustomIndicators,
  getBacktestOnce,
  getBacktestsOnce,
  getAccountValues,
  getAccountValueSegments,
  getBacktestTimeseriesMetrics,
  createBacktest,
  deleteBacktest,
  updateBacktest,
  updateBacktestTrade
}
