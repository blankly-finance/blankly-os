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

import {FirebaseTimestamp} from './general';

/**
 * Any type of order/fill
 */

export type Side = "buy" | "sell";
export type Status = "pending" | "done";
export type TransactionType = "market" | "limit";

export interface MarketOrder {
    id: string;
    size: number;
    side: Side;
    createdAt: FirebaseTimestamp;
    filledAt: FirebaseTimestamp;
    filledPrice: FirebaseTimestamp;
    symbol: string;
}

export interface LimitOrder {
    id: string;
    price: number;
    size: number;
    side: Side;
    createdAt: FirebaseTimestamp;
    filledAt: FirebaseTimestamp;
    filledPrice: FirebaseTimestamp;
    symbol: string;
}


export interface Transaction {
    type: TransactionType;
    status: Status;
    order: MarketOrder | LimitOrder;
}
