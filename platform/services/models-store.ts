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

import {Model} from '@/types/model';
import {deleteDoc, generateId, getCollection, getCollectionRef, getDoc, getDocRef, setDoc} from '@/libs/firestore';


function getModels(projectId: string | string[] | undefined) {
  return getCollectionRef(`projects/${projectId}/models`);
}

function getModelsOnce(projectId: string | string[] | undefined) {
  return getCollection(`projects/${projectId}/models`);
}

function getModelSubscription(projectId: string, modelId: string) {
  return getDocRef(`projects/${projectId}/models/${modelId}`);
}

function getModelOnce(projectId: string, modelId: string) {
  return getDoc(`projects/${projectId}/models/${modelId}`);
}

function createModel(projectId: string, model: Partial<Model>) {
  const id = generateId();
  return setDoc(`projects/${projectId}/models/${id}`, model).then(() => {
    return id;
  });
}

function updateModel(projectId: string, id: string, model: Partial<Model>) {
  return setDoc(`projects/${projectId}/models/${id}`, model, true);
}

function deleteModel(projectId: string, id: string) {
  return deleteDoc(`projects/${projectId}/models/${id}`);
}

export {createModel, getModelsOnce, getModelSubscription, getModelOnce, updateModel, deleteModel, getModels };
