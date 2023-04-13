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

import {
  addDoc,
  deleteDoc,
  generateId,
  getCollection,
  getCollectionRef,
  getCollectionRefDesc,
  getDoc,
  getDocRef,
  setDoc
} from '@/libs/firestore';
import {Project} from '@/types/project';

function createProjectUser(projectId: string, uid: string) {
  return setDoc(`projects/${projectId}/users/${uid}`, {level: 0})
}

function getProjects(userId: string) {
  return getCollectionRefDesc(`users/${userId}/projects`).orderBy('lastAccessed', 'desc');
}

function getProjectsOnce(userId: string) {
  return getCollection(`users/${userId}/projects`);
}

function getTeamProjects(teamId: string) {
  return getCollectionRef(`teams/${teamId}/projects`);
}

function getTeamProjectsOnce(teamId: string) {
  return getCollection(`teams/${teamId}/projects`);
}

function getProjectInfoOnce(teamId: string) {
  return getDoc(`teams/${teamId}`);
}

function getProjectSubscription(id: string | string[] | undefined) {
  return getDocRef(`projects/${id}`);
}

function getProjectOnce(id: string) {
  return getDoc(`projects/${id}`);
}

function getProjectUserOnce(id: string, uid: string) {
  return getDoc(`projects/${id}/users/${uid}`);
}

function getProjectUsers(id: string) {
  return getCollectionRef(`projects/${id}/users`)
}

function getProjectInvites(id: string) {
  return getCollectionRef(`projects/${id}/invites`);
}

function getProjectTeams(id: string) {
  return getCollection(`projects/${id}/teams`)
}

function createProject(proj: Partial<Project>, uid: string) {
  return setDoc(`projects/${uid}`, proj)
}

function createProjectUnderTeam(proj: Partial<Project>, uid: string, teamId: string) {
  const id = generateId();
  proj.projectId = id;
  setDoc(`teams/${teamId}/projects/${id}`, proj)
  setDoc(`projects/${id}/teams/teams`, {teams: teamId})
  return setDoc(`projects/${id}`, proj).then(() => {
    return id;
  });
}

function createViewOnlyCollaborator(id: string, invite: any) {
  return addDoc(`projects/${id}/invites`, invite);
}

function deleteViewOnlyCollaborator(projectId: string, type: string, id: string) {
  if (type == "user") {
    deleteDoc(`users/${id}/projects/${projectId}`)
    return deleteDoc(`projects/${projectId}/users/${id}`);
  }

  return deleteDoc(`projects/${projectId}/invites/${id}`);
}

function updateProject(id: string, proj: Partial<Project>) {
  return setDoc(`projects/${id}`, proj, true);
}

function updateUserProject(uid: string, id: string, proj: Partial<Project>) {
  return setDoc(`users/${uid}/projects/${id}`, proj, true);
}

function deleteProject(id: string) {
  return deleteDoc(`projects/${id}`)
}

export {
  createProjectUser,
  getProjects,
  getTeamProjects,
  getProjectSubscription,
  getProjectOnce,
  getProjectUserOnce,
  getProjectUsers,
  getProjectInvites,
  getProjectTeams,
  getTeamProjectsOnce,
  getProjectInfoOnce,
  createProjectUnderTeam,
  getProjectsOnce,
  createProject,
  createViewOnlyCollaborator,
  deleteViewOnlyCollaborator,
  updateProject,
  updateUserProject,
  deleteProject
}
