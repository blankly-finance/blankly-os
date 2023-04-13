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

import React from "react";
import {useRouter} from "next/router";

declare type Location =
  "overview"
  | "live"
  | "backtests"
  | "signals"
  | "versions"
  | "settings"
  | "usage"
  | "plugins"
  | "portfolio"
  | "activity";

const ProjectBreadcrumbs = (props: { location: Location, backtestId?: string }) => {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div className="w-full">
      {
        (projectId) ? (
          <div className="roboto text-sm text-gray-400">
            <div className="cursor-pointer text-blue-600 hover:text-blue-700 inline">
              {props.location.charAt(0).toUpperCase() + props.location.slice(1)}
            </div></div>) : (<div></div>)
      }


    </div>
  )
}

export default ProjectBreadcrumbs;
