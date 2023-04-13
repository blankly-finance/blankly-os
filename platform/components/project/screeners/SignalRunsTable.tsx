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

import {useCallback, useEffect, useState} from "react";
import ProfileIcon from "@/components/general/profile/ProfileIcon";
import {processEpoch, processEpochDiffFromNow} from "@/utils/date";
import {classNames} from "@/utils/general";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/solid";
import SignalsTable from "./SignalsTable"
import {useRouter} from "next/router";
import {useAuth} from "@/libs/auth";

const SignalRunsTable = (props: any) => {
  const [displayDetails, setDisDetails] = useState<Array<Boolean>>([]);
  const router = useRouter();
  const {uid} = useAuth();
  const { projectId, modelId } = router.query;

  useEffect(() => {
    props.runs.forEach(() => setDisDetails([...displayDetails, false]));
  }, [props.runs]);

  const toggleTab = useCallback((idx: number) => {
    const newDisDetails = [...displayDetails];
    newDisDetails[idx] = !newDisDetails[idx];
    setDisDetails(newDisDetails);
  }, [displayDetails]);

  function handleClick(signalId: number) {
    router.push(`/${projectId}/${modelId}/signals/${signalId}/run`);
  }

  return (
    <div className="-my-2 overflow-x-autosm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-8">
        <div className="pb-12">
          <div className="rounded-md h-auto">
            {props.runs.map((run: any, index: number) => (
              <div key={index} className="w-full border my-4 flex flex-col border-gray-200 rounded-md h-fit">
                <div className="w-full border-1 flex py-5 flex justify-between items-center px-8 border-gray-200 rounded-md h-fit">
                  <div className="w-2/6 font-semibold text-sm text-gray-900">
                    {run.id}
                  </div>
                  <div className="w-3/6 flex items-center text-sm text-gray-900">
                    <p>Ran at</p>&nbsp;
                    <button onClick={() => handleClick(1)}
                      className="text-blue-500">{processEpoch(run.time)}</button>
                    &nbsp;
                      on {Object.keys(run.result).length}
                    <p> &nbsp; symbols</p>
                  </div>
                  <div className="w-1/6 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex justify-end">
                      <div className="text-sm text-gray-500 max-w-sm">
                        {processEpochDiffFromNow(run.time)}
                      </div>
                      <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative  ml-2">
                        <ProfileIcon id={uid} />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/6 flex justify-end items-center relative whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => toggleTab(index)}>
                      {
                        displayDetails[index] ?
                          <ChevronUpIcon className="h-7 w-7 mr-8" aria-hidden="true" />
                          :
                          <ChevronDownIcon className="h-7 w-7 mr-8" aria-hidden="true" />
                      }

                    </button>
                  </div>
                </div>
                <div className={classNames(displayDetails[index] ? "w-full h-auto" : "hidden")}>
                  <SignalsTable results={run.result} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignalRunsTable
