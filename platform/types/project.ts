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

export interface Resource {
  cpu: number,
  ram: number,
  storage: number,
}

export interface Billing {
  stripeId: string;
  cardHolder: string;
}

export interface Settings {
  billing: Billing;
  // add additional items here as we go
}

export interface LastDeployment {
  deploymentId: string;
  deployedBy: string;
  deployedAt: number;
}


export interface Project {
  id: string,
  createdAt: number;
  creator: string;
  creatorType: 'team' | 'user';
  description: string;
  name: string;
  share: boolean;
  link: string;
  numModels: number;
  plan?: string;
  lastAccessed: number;
  projectId?: string;
  resources?: Resource;
  lastDeployment?: LastDeployment
  settings?: Settings;
}
