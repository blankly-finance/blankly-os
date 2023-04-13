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

import {storage} from './firebase';

const uploadFile = (path: string, file: any) => {
  const ref = storage.ref(path);
  return ref.put(file);
}

const uploadFileString = (path: string, file: any) => {
  const ref = storage.ref(path);
  return ref.putString(file, 'data_url');
}

const getDownloadUrl = (path: string) => {
  const ref = storage.ref(path);
  return ref.getDownloadURL();
}

export {uploadFile, uploadFileString};
