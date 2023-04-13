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

import ProfileIcon from "@/components/general/profile/ProfileIcon";
import {getModelSubscription} from "@/services/models-store";
import {getVersionOnce} from "@/services/version-store";
import {processEpochDiffFromNow} from "@/utils/date";
import {useEffect, useState} from "react";
import ModelStatus from "../details/ModelStatus";

const LastDeployed = (props: { id: string, modelId: string, deployedVersionId: string, hideRanBy?: boolean }) => {
  const [version, setVersion] = useState<any>();

  const id = props.id
  const modelId = props.modelId
  const deployedVersion = props.deployedVersionId;


  const [status, setStatus] = useState<any>('Unknown');
  const [running, setRunning] = useState<any>(false);

  useEffect(() => {
    if (id && modelId && deployedVersion) {
      getVersionOnce(id as string, modelId as string, deployedVersion).then((snapshot) => {
        if (snapshot) {
          const data = {
            id: snapshot.id,
            ...snapshot.data()
          }
          setVersion(data);
        }
      })
    }
  }, [id, modelId, deployedVersion])

  useEffect(() => {
    if (id && modelId) {
      const unsubscribe = getModelSubscription(id as string, modelId as string).onSnapshot((value) => {
        const data = value.data();
        if (data) {
          setRunning(data.lifecycleStatus?.running);
          setStatus(data.lifecycleStatus);
        }
      })
      return () => unsubscribe()
    }
  }, [modelId, id])

  return (
    <div className="w-full roboto text-sm mt-3 text-gray-400">
      {running ? "Current Version ID: " : "Last Deployed ID: "} {version?.id}
      <div className="flex items-center my-1">
        <div>Status:</div>
        <ModelStatus status={status}/>
        Deployed: {processEpochDiffFromNow(version?.createdAt)}
      </div>

      {
        props.hideRanBy ? null : <div className="flex mt-1 items-center">
          <div>
            Ran by:
          </div>
          <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative  ml-2">
            <ProfileIcon id={version?.uploadedBy}/>
          </div>
        </div>
      }
    </div>
  );
}

export default LastDeployed;
