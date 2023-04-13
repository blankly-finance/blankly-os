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

import React, {useContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";

const StarterModelContext = React.createContext<boolean>(false);

export function useStarterModel() {
  return useContext(StarterModelContext);
}

export default function StarterModelProvider({children}: any) {
  const [isStarterModel, setStarterModel] = useState(false);
  const router = useRouter();
  const {projectId} = router.query;

  useEffect(() => {
    if (projectId === "starters") {
      setStarterModel(true);
    } else {
      setStarterModel(false);
    }
  }, [projectId])

  return (
    <StarterModelContext.Provider value={isStarterModel}>
      {children}
    </StarterModelContext.Provider>
  );
}
