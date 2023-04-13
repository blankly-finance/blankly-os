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

export interface CustomerObject {
  name: string,
  email: string,
  phone: string,
}

export interface CreateSubscriptionObject {
  cid: string,
  teamId?: string,
  productId: string
  paymentMethod: string,
  quantity?: number,
}

export interface UpdateSubscriptionObject {
  cid: string,
  teamId?: string,
  productId: string,
  paymentMethod: string,
  quantity?: number
}

export interface CreateTeamObject {
  teamName: string,
  description?: string,
  invites?: Array<any>,
  plan: string,
}

export interface DeleteTeamObject {
  teamCid: string,
  teamId: string,
  memberId: string,
}
