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
import {getCollection, getCollectionRef, getDoc, setDoc} from '@/libs/firestore';


function getTrades(projectId: string, modelId: string, limit = 20) {
  return getCollectionRef(`projects/${projectId}/models/${modelId}/PNL/trades/trades`);
}

function getTradesOnce(projectId: string, modelId: string, limit = 20) {
  return getCollection(`projects/${projectId}/models/${modelId}/PNL/trades/trades`);
}

function getTradeSubscription(projectId: string, modelId: string) {
  return getCollectionRef(`projects/${projectId}/models/${modelId}`);
}

function getTradeOnce(projectId: string, modelId: string, tradeId: string) {
  return getDoc(`projects/${projectId}/models/${modelId}/trades/${tradeId}`);
}

function updateTrade(projectId: string, modelId: string, id: string, trade: Transaction) {
  return setDoc(`projects/${projectId}/models/${modelId}/trades/${id}`, trade, true);
}

export {getTradeSubscription, getTradesOnce, getTrades, getTradeOnce, updateTrade}
