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

import {getCollectionRef, getDoc, getDocRef} from '@/libs/firestore';

function getStrategies(projectId: string, modelId: string) {
  return getCollectionRef(`/projects/${projectId}/models/${modelId}/strategy_log`);
}

function getStrategyOnce(projectId: string, modelId: string, functionName: string) {
  return getDoc(`/projects/${projectId}/models/${modelId}/strategy_log/${functionName}`);
}

function getStrategySubscription(projectId: string, modelId: string, functionName: string) {
  return getDocRef(`/projects/${projectId}/models/${modelId}/strategy_log/${functionName}`);
}

export {getStrategies, getStrategyOnce, getStrategySubscription};
