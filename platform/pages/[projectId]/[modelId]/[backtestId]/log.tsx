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

import {useAuth} from "@/libs/auth";
import {useRouter} from "next/router";
import React, {ReactElement, useEffect, useState} from "react";
import Logs from "@/components/project/general/Logs";
import ModelLayout from "@/components/layouts/ModelNavLayout";
import Status from "@/components/project/general/Status";
import {getBacktestLogs} from "@/services/logs-store";
import {getBacktestSubscription} from "@/services/backtest-store";
import ProfileIcon from "@/components/general/profile/ProfileIcon";
import {processSeconds} from "@/utils/date";
import Breadcrumbs from "@/components/project/general/Breadcrumbs";

const Log = () => {
  const {user, loading} = useAuth();
  const router = useRouter();
  const {projectId, modelId, backtestId} = router.query;

  const [isConfigModal, setConfigModal] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [backtest, setBacktest] = useState<any>({});


  useEffect(() => {
    const unsubscribe = getBacktestSubscription(projectId as string, modelId as string, backtestId as string).onSnapshot((doc) => {
      const bt = {...doc.data(), id: doc.id};
      setBacktest(bt);
    }, (e: any) => {
      router.push('/dashboard')
    })
    return () => unsubscribe();
  }, [projectId, modelId, backtestId, router])

  useEffect(() => {
    const ref = getBacktestLogs(projectId, modelId, backtestId)
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
  }, [projectId, modelId, backtestId])

  // @ts-ignore
  return (
    <div className="h-auto">
      <div className="max-w-6xl mx-auto md:py-8 bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-row p-5 md:p-0">
            <div className="md:w-3/4">
              <p className="roboto text-xs text-gray-400">
                <Breadcrumbs location={"logs"} backtestId={backtest.id}/>
              </p>
              <h1 className="text-2xl w-3/4 md:w-full md:text-3xl font-semibold text-gray-900 pt-2 roboto">
                Backtest {backtest.id}
              </h1>

              <div className="w-max roboto text-md mt-3 text-gray-400">
                {backtest.description ? backtest.description : "No Description Given"} <br/>
                <div className="flex mt-1 text-sm items-center">
                  <div>
                    Ran by:
                  </div>
                  <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative  ml-2">
                    <ProfileIcon id={backtest?.userId}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/5 mt-9">
            <Status
                successful={backtest.status?.successful}
                time={backtest.status?.timeElapsed ? processSeconds(backtest.status?.timeElapsed) : null}
                status={backtest.status?.statusSummary}/>
            </div>
          </div>
          {/* <div className="hidden md:block w-3/5 text-right mt-8 space-x-2">
            <MediumOutlineButton click={() => setConfigModal(true)}>
              View Backtest Config
            </MediumOutlineButton>
            <ConfigModal open={isConfigModal} close={() => setConfigModal(false)}/>
            <MediumBlackButton>
              Rerun Backtest
            </MediumBlackButton>
          </div>
          <div className="block md:hidden flex flex-col space-y-2 p-5">
            <MediumOutlineButton click={() => setConfigModal(true)}>
              View Backtest Config
            </MediumOutlineButton>
            <ConfigModal open={isConfigModal} close={() => setConfigModal(false)}/>
            <MediumBlackButton>
              Rerun Backtest
            </MediumBlackButton>
          </div> */}
        </div>
      </div>
      <Logs name="Backtest" logs={logs}/>
    </div>
  )

}

Log.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
}
;

export default Log;
