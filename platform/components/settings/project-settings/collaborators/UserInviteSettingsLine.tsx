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

import {classNames} from "@/utils/general";
import {useEffect, useState} from "react";
import RoundedProfileIcon from "@/components/general/profile/RoundedProfileIcon";
import {deleteTeamMember} from "@/services/stripe-store";
import {useAuth} from "@/libs/auth";
import {useTeam} from "@/libs/team";

const UserInviteSettingsLine = (props: { type: string, collaborator: any, level: number }) => {
  const collaborator = props.collaborator;

  const {token} = useAuth()
  const {active} = useTeam()

  const [enterText, setEnterText] = useState("");

  useEffect(() => {
    if (props.type != "invite") {
      setEnterText(getLevelText(collaborator.level))
    } else {
      setEnterText("Invited " + getLevelText(collaborator.level))
    }
  }, [collaborator.level, props.type])

  function getLevelText(level: number) {
    return level >= 15 ? "Owner" : level >= 10 ? "Admin" : collaborator >= 5 ? "Manager" : level >= 0 ? "Member" : "Collaborator"
  }

  function handleRevoke() {
    const type = props.type == "invite" ? "invite" : "user";
    deleteTeamMember(token, type, {
      teamCid: active.cid,
      teamId: active.id,
      memberId: collaborator.id
    })
  }

  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex items-center">
        <div className="h-9 w-9 object-cover rounded-full">
          <RoundedProfileIcon profileUrl={collaborator?.profileUrl}/>
        </div>
        <div className="ml-3">
          <p
            className={classNames(props.type == "invite" ? "hidden" : "text-sm font-medium text-gray-900")}>{collaborator.firstName} {collaborator.lastName}</p>
          <p
            className={classNames(props.type == "invite" ? "text-sm text-gray-700 font-medium" : "text-sm text-gray-500")}>{collaborator.email}</p>
        </div>
      </div>
      {
        props.level > collaborator.level ?
          <div
            className={classNames(enterText == "Revoke" ? "text-red-400" : "text-blue-400", "text-sm cursor-pointer")}
            onMouseEnter={() => setEnterText("Revoke")}
            onMouseLeave={() => {
              props.type == "invite" ? setEnterText("Invited " + getLevelText(collaborator.level)) : setEnterText(getLevelText(collaborator.level))
            }}
            onClick={handleRevoke}>
            {enterText}
          </div> : <div className="text-blue-400 text-sm cursor-pointer">
            {enterText}
          </div>
      }


    </div>
  )
}

export default UserInviteSettingsLine;
