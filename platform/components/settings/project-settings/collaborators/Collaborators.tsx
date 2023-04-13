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

import {useEffect, useState} from "react";
import {getUserOnce} from "@/services/user-store";
import UserInviteSettingsLine from "@/components/settings/project-settings/collaborators/UserInviteSettingsLine";
import {useAuth} from "@/libs/auth";
import {getTeamMember} from "@/services/team-store";
import {useRouter} from "next/router";

export default function Collaborators(props: { type: string, data: any }) {
  const [data, setData] = useState<any>([])

  useEffect(() => {
      if (props.data && props.type == "collab") {
        let promises = props.data?.map((user: any) => {
          if (user.level <= 0) {
            return getUserOnce(user.id).then((doc) => {
              return doc.data()
            })
          }
        })

        Promise.all(promises).then((result: any) => {
            setData(result)
          }
        )
      } else if (props.data) {
        setData(props.data)
      }
    }, [props.data, props.type]
  )

  const {uid} = useAuth()
  const {projectId} = useRouter().query
  const [level, setLevel] = useState(0)

  useEffect(() => {
    getTeamMember(projectId as string, uid).then((doc) => {
      setLevel(doc.data()?.level)
    })
  }, [projectId, uid])

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {data?.map((collaborator: any, index: number) => (
        <li key={index} className="py-4 flex px-8 items-center justify-between">
          <UserInviteSettingsLine type={props.type} collaborator={collaborator} level={level}/>
        </li>
      ))}
    </ul>
  )
}
