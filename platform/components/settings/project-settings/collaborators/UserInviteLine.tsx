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

import RoundedProfileIcon from "@/components/general/profile/RoundedProfileIcon";
import {useEffect, useState} from "react";
import {getUserOnce} from "@/services/user-store";
import {deleteViewOnlyCollaborator} from "@/services/projects-store";
import {useRouter} from "next/router";
import {classNames} from "@/utils/general";


const UserInviteLine = (props: { user: any }) => {

  const userObj: any = props.user;
  const uid = props.user.id;

  const router = useRouter();
  const {projectId} = router.query;

  const [user, setUser] = useState<any>();
  const [profileUrl, setUserProfileUrl] = useState<any>();
  const [enterText, setEnterText] = useState("Invited");

  useEffect(() => {
    if (!userObj.email) {
      getUserOnce(uid).then((query) => {
        const data: any = query.data();
        const name = data.firstName + " " + data.lastName;
        setUser(name);
        setUserProfileUrl(data.profileUrl);
        setEnterText("Joined")
      })
    } else {
      setUser(userObj.email);
    }

  }, [uid, userObj])

  function handleRevoke() {
    const type = userObj.email ? "invite" : "user";
    deleteViewOnlyCollaborator(projectId as string, type, userObj.id)
  }

  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7">
          <RoundedProfileIcon profileUrl={profileUrl}/>
        </div>
        <p className="text-sm">{user}</p>
      </div>
      <a
        className={classNames(enterText == "Revoke" ? "text-red-400" : enterText == "Joined" ? "text-blue-400" : "text-gray-500", "text-sm  cursor-pointer")}
        onClick={handleRevoke}>
        {enterText}
      </a>
    </div>
  )
}

export default UserInviteLine;
