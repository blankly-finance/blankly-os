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

import {useAuth} from "@/libs/auth";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {deleteDoc, getCollection, getDoc, setDoc} from '@/libs/firestore';
import {createProjectUser, getProjectOnce, getProjectUserOnce} from "@/services/projects-store";
import Loading from "@/components/general/Loading";

function Join() {
  const {uid, user, token, loading} = useAuth();
  const router = useRouter();

  const [pageLoading, setLoading] = useState(true)
  const [userAuthorized, setUserAuthorized] = useState(false);
  const [joined, setJoined] = useState(false)
  const [errorMsg, setErrorMsg] = useState('');

  const {team, project} = router.query;

  const [running, setRunning] = useState(false)

  async function checkUserPermissions() {
    setRunning(true)

    const invitesQuery = await getCollection(`teams/${team}/invites`);
    let inviteId = ""
    invitesQuery.forEach((invitee: any) => {
      if (user.email === invitee.email) {
        inviteId = invitee.id
      }
    })

    if(inviteId == "") {
      setUserAuthorized(false);
    }

    let invite: any = await getDoc(`teams/${team}/invites/${inviteId}`)
    inviteId = invite.id
    invite = invite.data

    await setDoc(`teams/${team}/members/${uid}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      joinedAt: Date.now() / 1000,
      email: user.email,
      phone: user.phone,
      level: invite.level,
      invitedBy: invite.inviterName,
      inviterId: invite.inviterId,
    })
    await deleteDoc(`teams/${team}/invites/${inviteId}`)
    await setDoc(`users/${uid}/teams/${team}`, {
      id: team,
      level: invite.level,
    })

    setUserAuthorized(true)
    setJoined(true)
    setLoading(false)
    setRunning(false)
  }

  async function checkViewOnlyPermissions() {
    const invitesQuery = await getCollection(`projects/${project}/invites`);
    invitesQuery.forEach((query: any) => {
      const data = query.data();
      const docId = query.id;
      if (user.email == data.email && project) {
        getProjectUserOnce(project as string, user.uid).then((doc) => {
          if (!doc.data()) {
          }
          createProjectUser(project as string, user.uid).then(() => {
            getProjectOnce(project as string).then((doc) => {
              const data: any = doc.data()
              setDoc(`users/${user.uid}/projects/${project}`, {
                createdAt: data?.createdAt,
                creator: data?.creator,
                description: data?.description,
                lastAccessed: Date.now(),
                name: data?.name,
                projectId: data?.projectId,
              })
            })
          })
        })
        deleteDoc(`projects/${project}/invites/${docId}`)
        setUserAuthorized(true)
      }
    })

  }

  useEffect(() => {
    if (userAuthorized) {
      router.push("/")
    } else {
      setErrorMsg('Insufficient Permissions')
    }
  }, [router, userAuthorized])

  useEffect(() => {
    if (!loading) {
      if (!user && team) {
        router.push(`/auth/signin/?redirectUrl=/join?team=${team}`);
      } else if (!user && project) {
        router.push(`/auth/signin/?redirectUrl=/join?project=${project}`)
      }
    }
    if (team && user && token && !running) {
      checkUserPermissions();
    } else if (project && user) {
      checkViewOnlyPermissions();
    }
  }, [checkUserPermissions, checkViewOnlyPermissions, loading, project, router, running, team, token, user])

  return (
    <div>
      {
        pageLoading ? <Loading/> : <p className="text-red-500">{errorMsg}</p>
      }
      {
        joined ? "You have successfully joined a team" : null
      }
    </div>
  )
}

export default Join;
