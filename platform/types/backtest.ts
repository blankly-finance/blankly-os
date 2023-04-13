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

import {FirebaseTimestamp} from "./general";

export type BacktestStatus = 'completed' | 'pending' | 'deploying' | 'error';

export type Source = 'local' | 'github' | 'gitlab' | 'bitbucket';

export interface Location {
    source: Source;
    data?: any;
}

export interface Benchmark {
    symbol: string;
    value: any;
}

export interface BacktestingMetrics {
    sharpe: number;
    calmar: number;
    cagr: number;
    return: number;
    profit: number;
    startValue: number;
    endValue: number;
}

export interface BacktestPeriod {
    start: FirebaseTimestamp;
    end: FirebaseTimestamp;
    resolution: string;
}

export interface Label {
    label: string;
    id: string;
    color: string;
    classes: string[]; // classes to put on tag
}

export interface BacktestConfig {
    price_data: string; // and more (TODO: @Emerson Dove)
}

export interface Backtest {
    id: string;
    containerId: string;
    status: BacktestStatus;
    label: string;
    runtime: number;
    description: string;
    from: Location;
    startedAt: FirebaseTimestamp;
    startedBy: string;
    metrics: BacktestingMetrics;
    config: BacktestConfig;
    tickers: string[];
}
