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

import {createContext, useContext, useEffect, useState} from "react";
import {updateUser} from "@/services/user-store";
import {useAuth} from "@/libs/auth";
import {useRouter} from "next/router";
import {getTeamOnce} from "@/services/team-store";

const teamContext = createContext({});

export function TeamProvider({children}: any): any {
  const team = GetTeamInfo();
  return <teamContext.Provider value={team}>{children} </teamContext.Provider>;
}

export const useTeam = (): any => {
  return useContext(teamContext);
};

function GetTeamInfo() {
  // this should be a dict of {id: idHere, type: user or team, loading: bool}
  const [active, setActive] = useState<any>({type: 'user'});
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const {user, uid} = useAuth();
  const {projectId} = router.query;

  useEffect(() => {
    if (user) {
      let id: string;
      let type: string;
      let cid: string;

      if (user.activeId) {
        id = user.activeId;
        type = id == uid ? 'user' : 'team';

        if (type == 'team') {
          getTeamOnce(id).then((doc) => {
            let team: any = doc.data()
            cid = team.cid

            setActive({id: id, type: type, cid: cid})
            setLoading(false)
          })
        } else if (type == 'user') {
          cid = user.cid

          setActive({id: id, type: type, cid: cid})
          setLoading(false)
        }

      } else {
        id = uid;
        type = 'user';

        updateUser(uid, {activeId: uid})

        setActive({id: id, type: type, cid: undefined, subId: undefined})
        setLoading(false)
      }
    }
  }, [projectId, uid, user]);

  return {
    active,
    loading
  };
}
