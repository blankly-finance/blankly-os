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
import {Location} from './backtest';

export type VersionStatus = 'completed' | 'pending' | 'deploying' | 'error' | 'Running';

export interface Version {
  id: string;
  containerId: string;
  status: VersionStatus;
  createdAt: number;
  runtime: number;
  description: string;
  from: Location;
  deployedAt: FirebaseTimestamp;
  uploadedBy: string;
  userId: string;
}


export type LogStatus = 'error' | 'warning' | 'info';

export interface VersionLog {
  createdAt: FirebaseTimestamp;
  message: string;
  type: LogStatus;
}
