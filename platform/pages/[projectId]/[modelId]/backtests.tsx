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
import ProfileIcon from "@/components/general/profile/ProfileIcon";
import ModelLayout from "@/components/layouts/ModelNavLayout";
import React, {ReactElement, useEffect, useState} from "react";
import BacktestTable from "@/components/project/backtest/tables/BacktestTable";
import NotFinishedModal from "@/components/general/modals/NotFinishedModal";
import CompareModal from "@/components/project/backtest/modals/CompareModal";
import RunNewBacktest from "@/components/project/backtest/RunNewBacktest";
import OutlineButton from "@/components/general/buttons/OutlineButton";
import {getBacktests} from "@/services/backtest-store";
import {processEpochDiffFromNow} from "@/utils/date";
import Breadcrumbs from "@/components/project/general/Breadcrumbs";
import {usePerms} from "@/libs/perms";
import {getModelOnce} from "@/services/models-store";
import {BeakerIcon} from "@heroicons/react/outline";

const Backtests = () => {
  const router = useRouter();
  const { projectId, modelId } = router.query;
  const { level } = usePerms();

  const [isCustomDataOpen, setCustomData] = useState(false);
  const [isCompareOpen, setCompareOpen] = useState(false);
  const [latestBacktest, setLatestBacktest] = useState<any>({});
  const [numBacktests, setNumBacktests] = useState<number>(0);
  const [modelName, setModelName] = useState("");


  useEffect(() => {
    getModelOnce(projectId as string, modelId as string).then((val) => {
      const data = val.data()
      if (data) {
        setModelName(data.name);
      }
    })
    const unsubscribe = getBacktests(projectId as string, modelId as string, 1).onSnapshot((query) => {
      const bts = query.docs.map((val) => {
        return {
          id: val.id,
          ...val.data()
        }
      });
      setNumBacktests(bts.length);
      setLatestBacktest(bts[0]);
    }, (e: any) => {
      router.push('/dashboard')
    })
    return () => unsubscribe();
  }, [projectId, modelId, router])


  return (
    <div className="h-auto">
      <div className="max-w-6xl mx-auto py-10 bg-white p-5 md:px-0">
        <Breadcrumbs location={"backtests"} />
        <div className="">
          <div className="flex md:flex-row flex-col justify-between items-center md:mb-12">
            <div className="w-full mt-8 sm:mt-0">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 roboto">
                Your Backtests
              </h1>
              <div className="w-max roboto ml-1 text-sm mt-3 text-gray-400">
                Last Backtest: {latestBacktest?.id}
                <br />
                Ran {latestBacktest?.time ? processEpochDiffFromNow(latestBacktest.time) : null}
                <div className="flex items-center">
                  Ran by:&nbsp;
                  {latestBacktest?.runBy ?
                    <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative  ml-2">
                      <ProfileIcon id={latestBacktest.runBy}> </ProfileIcon>
                    </div> : <div></div>}
                </div>
              </div>
            </div>
            {
              numBacktests > 0 ? (
                <>
                  <div className="md:w-3/5 hidden md:block w-full md:text-right space-x-2 mt-3 md:mt-0">
                    <OutlineButton click={() => {
                      setCompareOpen(true)
                    }}>
                      <div className="flex space-x-2">
                        Compare Backtest
                        <BeakerIcon className="ml-3 w-5 h-5" />
                      </div>
                    </OutlineButton>
                    {
                      level >= 5 ? <RunNewBacktest /> : null
                    }
                  </div>
                  <div className="block md:hidden w-full space-y-2 mt-5">
                    <OutlineButton width="full" click={() => {
                      setCompareOpen(true)
                    }}>
                      Compare Backtests
                    </OutlineButton>
                    {
                      level >= 5 ? <RunNewBacktest /> : null
                    }
                  </div>
                  <CompareModal open={isCompareOpen} close={() => setCompareOpen(false)} />
                </>
              ) : null
            }
          </div>
          <BacktestTable />
          <NotFinishedModal open={isCustomDataOpen} close={() => setCustomData(false)} featureName="data-connectors"
            type={"feature"} />
        </div>
      </div>
    </div>
  )

};

Backtests.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};

export default Backtests;
