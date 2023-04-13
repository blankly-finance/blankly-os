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

import {Backtest} from "./backtest";
import {Version} from "./versions";

export interface Model {
  name: string;
  description: string;
  deployedVersion: string;
  team: string[];
  id: string;
  version: number;
  tickers: string[];
  lifecycleStatus: any;
  backtests: Backtest[];
  versions: Version[];
  share: boolean;
  type: ModelType;
  framework: string;
  startStage: string;
  link: string | any;
}

export interface StarterModel {
  id: string,
  name: string,
  backtestId: string,
  modelId: string,
  creatorUid?: string,
  description: string,
  labels: Array<string>,
  tickers: Array<string>,
  exchange: string,
  stats: { sortino: number, sharpe: number, cagr: number }
}

export type ModelType = 'strategy' | 'signal-run' | 'screener' | 'service'
