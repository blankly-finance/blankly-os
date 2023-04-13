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

import {useRouter} from "next/router";
import {ReactElement, useEffect, useState} from "react";
import Logs from "@/components/project/general/Logs";
import ModelLayout from "@/components/layouts/ModelNavLayout";
import NotFinishedModal from "@/components/general/modals/NotFinishedModal";
import {getLogs} from "@/services/logs-store";
import LastDeployed from "@/components/project/versions/LastDeployed";
import {getModelOnce} from "@/services/models-store";
import OutlineButton from "@/components/general/buttons/OutlineButton";
import BlackButton from "@/components/general/buttons/BlackButton";

const Log = () => {
  const [model, setModel] = useState<any>();
  const [isAutomateOpen, setAutomate] = useState(false);
  const [isUsageOpen, setUsage] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const router = useRouter();
  const {projectId, modelId} = router.query;

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
    <div className="h-auto">
      <div className="h-auto bg-white py-10">
        <div className="pt-4 flex max-w-6xl mx-auto">
          <div>
            <p className="text-gray-400 mb-2 text-sm">
              <button onClick={() => router.push(`/${projectId}/${modelId}/live`)}
                      className="inline text-blue-600 mr-1">Live
              </button>
              / Live Strategy Deployment
            </p>
            <div className="flex items-center">
              <h1 className="text-3xl font-semibold text-gray-900 roboto">
                Live Strategy Deployment
              </h1>
            </div>
            <LastDeployed id={projectId as string} modelId={modelId as string}
                          deployedVersionId={model?.deployedVersion}/>
          </div>
          <div className="text-right mt-8 flex-1">
            <div className="space-x-2">
              <OutlineButton click={() => router.push(`/${projectId}/${modelId}/live/usage`)}>
                Show Container Usage
              </OutlineButton>
              <BlackButton click={() => setAutomate(true)}>
                Add Blankly Automation™
              </BlackButton>
            </div>
          </div>
        </div>
      </div>
      <Logs name="Live" logs={logs}/>
      <NotFinishedModal open={isAutomateOpen} close={() => setAutomate(false)} featureName="blankly-automate"
                        type={"feature"}/>
      <NotFinishedModal open={isUsageOpen} close={() => setUsage(false)} featureName="model-usage"
                        type={"feature"}/>
    </div>
  );
}

Log.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};

export default Log;
