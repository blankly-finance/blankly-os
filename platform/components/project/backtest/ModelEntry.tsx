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
import {getVersionOnce} from "@/services/version-store";
import {processDateDiff, processDateFromNow} from "@/utils/date";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import ModelStatus from "../details/ModelStatus";

const ModelEntry = (props: { id: string, key: string }) => {
    const id = props.id;
  const router = useRouter();
  const {projectId, modelId} = router.query;
  const [deployment, setDeployment] = useState<any>();
  useEffect(() => {
    getVersionOnce(projectId as string, modelId as string, id).then((doc) => {
      setDeployment(doc.data());
    })
  }, [projectId, modelId, id]);
  const calculateFinishedTime = useCallback((date: string, endDate: string) => {
    if (date && endDate) {
      return processDateDiff(date, endDate);
    }
    return 'Unknown';
  }, [])

  return (
    <tr>
      <td className="pl-5 pr-3 py-4 whitespace-nowrap">
        <div className="font-semibold text-sm text-gray-900">
          {id}
        </div>
      </td>
      <td className="px-3 py-4 whitespace-nowrap">
        <ModelStatus status={deployment?.status ? deployment?.status : 'Completed'}
                time={calculateFinishedTime(deployment?.createdAt, deployment?.finishedAt)}/>
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-left text-sm text-gray-500">
        {deployment?.description && deployment?.description.length > 0 ?
          (<div className="text-sm text-gray-900 max-w-sm">
            {deployment?.description}
          </div>)
          :
          (<div className="text-sm italic text-gray-400 max-w-sm">
            No Description
          </div>)
        }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex justify-end items-center">
          <div className="flex justify-end">
            <div className="text-sm text-gray-500 max-w-sm">
              {processDateFromNow(deployment?.createdAt)} by {deployment?.user}
            </div>
            <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative  ml-2">
              <ProfileIcon id={deployment?.userId}/>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default ModelEntry;
