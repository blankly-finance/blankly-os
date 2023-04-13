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

import {User} from '@/types/user';
import {getCollection, getDoc, getDocRef, setDoc} from '@/libs/firestore';

function getUserSubscription(uid: string) {
  return getDocRef(`users/${uid}`);
}

function getUserTeamsOnce(uid: string) {
  return getCollection(`users/${uid}/teams`)
}

function getUserOnce(uid: string) {
  return getDoc(`users/${uid}`);
}

function updateUser(uid: string, user: Partial<User>) {
  return setDoc(`users/${uid}`, user, true);
}

export {getUserSubscription, getUserTeamsOnce, getUserOnce, updateUser};
