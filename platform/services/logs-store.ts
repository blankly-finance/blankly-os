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

import {deleteRef, getRef, getRefOnce, setRef, updateRef} from "@/libs/realtime";

function getLogs(projectId: string | string[] | undefined, modelId: string | string[] | undefined) {
  const path = `projects/${projectId}/models/${modelId}/live/out/`;
  return getRef(path);
}

function getBacktestLogs(projectId: string | string[] | undefined, modelId: string | string[] | undefined, backtestId: string | string[] | undefined) {
  const path = `projects/${projectId}/models/${modelId}/backtests/${backtestId}/out`;
  return getRef(path, "out");
}

function getLogsOnce(projectId: string | string[] | undefined, modelId: string | string[] | undefined) {
  const path = `projects/${projectId}/models/${modelId}/out`;
  return getRefOnce(path, "out");
}

function createLog(projectId: string | string[] | undefined, modelId: string | string[] | undefined) {
  const path = `projects/${projectId}/models/${modelId}/out`;
  return setRef(path, "out");
}

function updateLog(projectId: string | string[] | undefined, modelId: string | string[] | undefined) {
  const path = `projects/${projectId}/models/${modelId}/out`;
  return updateRef(path, "out");
}

function deleteLog(projectId: string | string[] | undefined, modelId: string | string[] | undefined) {
  const path = `projects/${projectId}/models/${modelId}/out`;
  return deleteRef(path);
}

export {getLogs, getLogsOnce, createLog, updateLog, deleteLog, getBacktestLogs};
