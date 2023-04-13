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
import {useAuth} from "@/libs/auth";

const permsContext = createContext({});

export function PermsProvider({children}: any): any {
  const perms = GetPermsInfo();
  return <permsContext.Provider value={perms}>{children} </permsContext.Provider>;
}

export const usePerms = (): any => {
  return useContext(permsContext);
};

function GetPermsInfo() {
  const [level, setLevel] = useState(-5);

  // const router = useRouter();
  // const {projectId, modelId} = router.query;

  // this can be expanded in the future to handle permissions controls.
  // for now, this just handles view only collaborators

  const {user} = useAuth();
  useEffect(() => {
    if (!user) {
      setLevel(-5);
    } else {
      setLevel(5)
    }
  }, [user])


  return {
    level
  };
}
