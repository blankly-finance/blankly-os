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

import {getCollection, getCollectionRef, getDocRef} from '@/libs/firestore';


function getScreeners(projectId: string | string[] | undefined, modelId: string | string[] | undefined) {
  return getCollectionRef(`projects/${projectId}/models/${modelId}/screeners`, 'time');
}

function getScreener(projectId: string | string[] | undefined, modelId: string | string[] | undefined) {
  return getDocRef(`projects/${projectId}/models/${modelId}`)
}

function getLatestScreener(projectId: string, modelId: string) {
  return getCollection(`projects/${projectId}/models/${modelId}/screeners`, 'time', 1).then((res) => {
    return res.docs[0].data();
  });
}

export {getScreeners, getScreener, getLatestScreener};
