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

import React, {useEffect, useState} from 'react';
import LastDeployed from "@/components/project/versions/LastDeployed";
import SignalsTable from "./SignalsTable";
import {useRouter} from 'next/router';
import {getLatestScreener, getScreener} from '@/services/screeners-store';
import BlackButton from '@/components/general/buttons/BlackButton';

function SignalsOverview({ model }: { model: any }) {
  const router = useRouter();
  const { projectId, modelId } = router.query;
  const [results, setResults] = useState<any>({});
  useEffect(() => {
    getLatestScreener(projectId as string, modelId as string).then((res) => {
      setResults(res);
    })
  }, [modelId, projectId])

  const [schedule, setSchedule] = useState<any>({});
  useEffect( () => {
    getScreener(projectId as string, modelId as string).onSnapshot((snapshot) => {
      const data = snapshot.data()
      if (data === undefined || data.schedule === undefined) {
        setSchedule("")
      }
      else {
        setSchedule(data)
      }
    })
  }, [modelId, projectId])

  return (
    <div className="w-full h-auto bg-gray-50 pb-24">
      <div className="max-w-6xl mb-12 mx-auto">
        <div className="pt-10 flex items-center">
          <div className="w-1/2">
            <h1 className="text-2xl font-semibold text-gray-900 roboto">
              Most Recent Screener Output
            </h1>
            <div className="w-max">
              <LastDeployed id={projectId as string}
                modelId={modelId as string}
                deployedVersionId={model?.deployedVersion} />
            </div>
          </div>
          <div className="w-1/2 text-right space-x-2">
            <BlackButton click={() => router.push(`/${projectId}/${modelId}/screener-runs`)}>
              See Previous Runs
            </BlackButton>
          </div>
        </div>
      </div>
      <SignalsTable results={results.result} />
      <div
        className="mt-4 max-w-7xl mx-auto hidden md:flex justify-between items-center py-4 px-8 bg-white shadow-md rounded-md h-auto text-gray-500">
        <div className="roboto text-md text-gray-500 flex items-center">
          Your screener is using the schedule&nbsp;
          <p className="text-black">{schedule.schedule}</p>
        </div>
      </div>
    </div>
  )
}

export default SignalsOverview
