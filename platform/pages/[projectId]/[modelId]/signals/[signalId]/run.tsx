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

import {ReactElement, useEffect, useState} from "react";
import ModelLayout from "@/components/layouts/ModelNavLayout";
import OutlineButton from "@/components/general/buttons/OutlineButton";
import BlackButton from "@/components/general/buttons/BlackButton";
import LastDeployed from "@/components/project/versions/LastDeployed";
import {getModelOnce} from "@/services/models-store";
import {useAuth} from "@/libs/auth";
import {useRouter} from "next/router";
import Logs from "@/components/project/general/Logs";
import {getLogs} from "@/services/logs-store";
import {ExclamationIcon, InformationCircleIcon, XCircleIcon} from "@heroicons/react/solid";

function Run() {
  const router = useRouter();
  const {projectId, modelId, signalId} = router.query;
  const {user, loading, signout} = useAuth();
  const [model, setModel] = useState<any>();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin");
      }
    }
  });

  useEffect(() => {
    getModelOnce(projectId as string, modelId as string).then(
      (query) => {
        const mod = {...query.data()};
        setModel(mod);
      }
    );
  }, [projectId, modelId]);

  useEffect(() => {
    const ref = getLogs(projectId, modelId)
    ref.on('value', (snapshot) => {
      const data = snapshot.val();
      let logs: any[] = [];
      for (const timestamp in data) {
        let logEntry = data[timestamp];
        const log = {
          type: logEntry.type,
          time: timestamp,
          msg: logEntry.line,
        }
        logs = [log, ...logs];
      }
      setLogs(logs);
    })
    return () => ref.off();
  }, [projectId, modelId])

  return (
    <div className="h-auto relative">
      <div className="h-auto bg-white py-10">
        <div className="pt-4 flex max-w-6xl mx-auto">
          <div>
            <p className="text-gray-400 mb-2 text-sm">
              <button onClick={() => router.push(`/${projectId}/${modelId}/live`)}
                      className="inline text-blue-600 mr-1">Signal Run
              </button>
              / test-id
            </p>
            <div className="flex items-center">
              <h1 className="text-3xl font-semibold text-gray-900 roboto">
                Run test-id
              </h1>
            </div>
            <LastDeployed id={projectId as string} modelId={modelId as string}
                          deployedVersionId={model?.deployedVersion}/>
          </div>
          <div className="text-right mt-8 flex-1">
            <div className="space-x-2">
              <OutlineButton click={() => router.push(`/${projectId}/${modelId}/live/function-calls`)}>
                Show Function Calls
              </OutlineButton>
              <OutlineButton click={() => router.push(`/${projectId}/${modelId}/live/usage`)}>
                Show Container Usage
              </OutlineButton>
              <BlackButton>
                Rerun Signal
              </BlackButton>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full border-gray-500 border-t py-8 z-10 shadow-lg">
        <div className="h-fit mx-auto max-w-6xl flex items-center">
          <div className="w-9/12 ml-2 inconsolata font-semibold text-xl">
            Signal Logs
          </div>
          <div className="w-3/12 flex items-center justify-evenly">
            <div className="flex mx-2 items-center">
              <InformationCircleIcon className="w-5 h-5 text-blue-500"/>&nbsp;
              <p className="roboto text-sm">8 Info</p>
            </div>
            <div className="flex mx-2 items-center">
              <ExclamationIcon className="w-5 h-5 text-yellow-500"/>&nbsp;
              <p className="roboto text-sm">4 Warnings</p>
            </div>
            <div className="flex mx-2 items-center">
              <XCircleIcon className="w-5 h-5 text-red-500"/>&nbsp;
              <p className="roboto text-sm">2 Errors</p>
            </div>
          </div>
        </div>
      </div>

      <Logs name="Live" logs={logs}/>
    </div>
  )
}

Run.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};

export default Run;
