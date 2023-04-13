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

import {Version} from '@/types/versions';
import {generateId, getCollection, getCollectionRefDesc, getDoc, getDocRef, setDoc} from '@/libs/firestore';


function getVersions(projectId: string, modelId: string, limit = 20) {
  return getCollectionRefDesc(`projects/${projectId}/models/${modelId}/versions`, 'createdAt', limit);
}

function getVersionsOnce(projectId: string, modelId: string, limit = 20) {
  return getCollection(`projects/${projectId}/models/${modelId}/versions`, 'createdAt', limit);
}

function getVersionSubscription(projectId: string, modelId: string, deploymentId: string) {
  return getDocRef(`projects/${projectId}/models/${modelId}/versions/${deploymentId}`);
}

function getVersionOnce(projectId: string, modelId: string, deploymentId: string) {
  return getDoc(`projects/${projectId}/models/${modelId}/versions/${deploymentId}`);
}

function createVersion(projectId: string, modelId: string, deployment: Version) {
  const id = generateId();
  return setDoc(`projects/${projectId}/models/${modelId}/versions/${id}`, deployment);
}

function updateVersion(projectId: string, modelId: string, id: string, deployment: Partial<Version>) {
  return setDoc(`projects/${projectId}/models/${modelId}/versions/${id}`, deployment, true);
}

export {getVersions, getVersionSubscription, getVersionsOnce, getVersionOnce, createVersion, updateVersion}
