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

import {Team, TeamInvite, TeamUser} from '@/types/team'
import {addDoc, deleteDoc, getCollectionRef, getDoc, getDocRef, setDoc} from '@/libs/firestore';


function getTeams() {
  return getCollectionRef(`teams`);
}

function getUserTeams(uid: string) {
  return getCollectionRef(`users/${uid}/teams`)
}

function getTeamSubscription(teamId: string) {
  return getDocRef(`teams/${teamId}`);
}

function getTeamOnce(teamId: string) {
  return getDoc(`teams/${teamId}`);
}

function getTeamUsers(teamId: string) {
  return getCollectionRef(`teams/${teamId}/members`)
}

function getTeamInvites(teamId: string) {
  return getCollectionRef(`teams/${teamId}/invites`)
}

function getTeamMember(teamId: string, uid: string) {
  return getDoc(`teams/${teamId}/members/${uid}`);
}

function createTeam(team: Team) {
  return addDoc(`teams`, team);
}

function createTeamInvite(teamId: string, teamInvite: TeamInvite) {
  return addDoc(`teams/${teamId}/invites`, teamInvite)
}

function createTeamMember(teamId: string, uid: string, user: TeamUser) {
  setDoc(`users/${uid}/teams/${teamId}`, {
    id: teamId,
    level: user.level,
  })
  return setDoc(`teams/${teamId}/members/${uid}`, user)
}

function updateTeam(teamId: string, team: Team) {
  return setDoc(`teams/${teamId}`, team, true);
}

function deleteTeam(tid: string, uid: string) {
  deleteDoc(`users/${uid}/teams/${tid}`);
  return deleteDoc(`teams/${tid}`);
}


export {
  getTeams,
  getTeamSubscription,
  getTeamOnce,
  getUserTeams,
  getTeamUsers,
  getTeamInvites,
  getTeamMember,
  createTeam,
  createTeamInvite,
  createTeamMember,
  updateTeam,
  deleteTeam,
}
