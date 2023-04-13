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

import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getModelSubscription} from "@/services/models-store";
import {classNames} from "@/utils/general";

declare type Location = "overview" | "live" | "params" | "backtests" | "logs" | "signals" | "versions" | "settings" | "Params";

const Breadcrumbs = (props: { location: Location, backtestId?: string }) => {
  const router = useRouter();
  const { projectId, modelId } = router.query;

  const [modelName, setModelName] = useState();

  useEffect(() => {
    if (projectId && modelId) {
      const unsubscribe = getModelSubscription(projectId as string, modelId as string).onSnapshot((data: any) => {
        if (data.data()) {
          setModelName(data.data().name);
        }
      });
      return () => unsubscribe();
    }
  }, [projectId, modelId])

  return (
    <div className="w-full">
      {
        (modelName && projectId && modelId) ? (
          props.backtestId ? <div className="roboto text-sm text-gray-400">
            <div className="cursor-pointer inline text-blue-600 hover:text-blue-700"
              onClick={() => router.push(`/${projectId}/${modelId}/overview`)}> {modelName}</div>
            {" "} / <div className="cursor-pointer inline text-blue-600 hover:text-blue-700"
              onClick={() => router.push(`/${projectId}/${modelId}/backtests`)}>
              Backtests </div> / <div className={classNames(props.location == "logs" ? "text-blue-600 hover:text-blue-700 cursor-pointer" : "", "inline")} onClick={() => router.push(`/${projectId}/${modelId}/${props.backtestId}/backtest`)}>
                {props.backtestId}</div> {props.location === "logs" ? "/ Logs" : null}
          </div> : <div className="roboto text-sm text-gray-400">
            <div className="cursor-pointer inline text-blue-600 hover:text-blue-700"
              onClick={() => router.push(`/${projectId}/${modelId}/overview`)}> {modelName} </div>
            / {props.location.charAt(0).toUpperCase() + props.location.slice(1)}
          </div>) : (<div></div>)
      }


    </div>
  )
}

export default Breadcrumbs;
