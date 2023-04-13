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

import ModelLayout from "@/components/layouts/ModelNavLayout";

import PastTransactionsTable from "@/components/project/general/PastTransactionsTable";
import {getTrades} from "@/services/trades-store";
import LastDeployed from "@/components/project/versions/LastDeployed";
import {getModelOnce} from "@/services/models-store";
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";
import Breadcrumbs from "@/components/project/general/Breadcrumbs";
import {usePerms} from "@/libs/perms";
import {LiveGraph} from "@/components/graph/GraphManager";
import {MetricsDisplay} from "@/components/project/backtest/metrics/MetricsDisplay";
import {getLiveBlanklyMetrics, getLiveBlanklyTimeseriesMetrics, getLiveCustomMetrics} from "@/services/metrics-store";
import BasicErrorMessageModal from "@/components/general/modals/BasicErrorMessageModal";


const Live = () => {
  const [allTrades, setAllTrades] = useState<any>([]);
  const [trades, setTrades] = useState<any>([]);
  const [currentDeploymentVersion, setDeploymentVersion] = useState("");
  const [limit, setLimit] = useState(20);
  const [tradeIndex, setTradeIndex] = useState<any>(0);
  const [model, setModel] = useState<any>({});
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);

  const {level} = usePerms();
  const router = useRouter();
  const {projectId, modelId} = router.query;
  const [metrics, setMetrics] = useState();
  const [customMetrics, setCustomMetrics] = useState();
  const [timeseriesMetrics, setTimeseriesMetrics] = useState();

  useEffect(() => {
    getModelOnce(projectId as string, modelId as string).then((data: any) => {
      setModel(data.data());
    });

    getLiveBlanklyMetrics(projectId as string, modelId as string).then((doc: any) => {
      const data = doc.data();
      setMetrics(data?.metrics);
    });

    getLiveCustomMetrics(projectId as string, modelId as string).then((doc: any) => {
      const data = doc.data();
      setCustomMetrics(data?.metrics);
    });

    getLiveBlanklyTimeseriesMetrics(projectId as string, modelId as string).then((doc: any) => {
      const data = doc.data();
      setTimeseriesMetrics(data?.timeseriesMetrics);
    });
  }, [projectId, modelId]);

  useEffect(() => {
    const unsubscribe = getTrades(projectId as string, modelId as string).onSnapshot((query) => {
      const allTrades: any = [];
      query?.docs?.forEach((doc) => {
        allTrades.push(...Object.values(doc?.data()?.trades))
    });
      const allTradesSorted = allTrades.sort((tradeA: any, tradeB: any) =>
          Number(tradeB.time) - Number(tradeA.time)
      );
      setAllTrades(allTradesSorted);
    }, (e: any) => {
      router.push('/dashboard');
    });

    return () => unsubscribe();
  }, [projectId, modelId, limit, router])

  useEffect(() => {
    getModelOnce(projectId as string, modelId as string).then(
      (query) => {
        const mod: any = {...query.data()};
        setDeploymentVersion(mod.deployedVersion);
      }
    );
  }, [projectId, modelId]);

  useEffect(() => {
    // resize trades array when limit is changed
    if (allTrades) {
      setTrades(allTrades?.slice(0, limit));
    }
  }, [allTrades, limit]);

  function handleClick(index: number) {
    if (trades[index].symbol in model.tickers) {
      setTradeIndex(index);
    }
    else {
      // display modal
      setIsErrorModal(true);
    }
  }

  return (
    <div className="h-auto">
      <div className="max-w-6xl mx-auto h-auto bg-white py-10 p-5 md:px-0">
        <Breadcrumbs location={"live"}/>
        <div className="flex md:flex-row flex-col items-center">
          <div className="md:w-1/3">
            <h1 className="text-3xl font-semibold text-gray-900 roboto">
              Live Strategy Deployment
            </h1>
            <LastDeployed id={projectId as string} modelId={modelId as string}
                          deployedVersionId={currentDeploymentVersion}/>
          </div>
        </div>
      </div>
      <div>
        <div className="h-auto mx-auto my-8 max-w-7xl px-8 pb-8 pt-1 bg-white shadow-md rounded ">
          <LiveGraph id={projectId as string} modelId={modelId as string} model={model} activeIndex={tradeIndex}/>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <MetricsDisplay metrics={metrics} customMetrics={customMetrics} timeseriesMetrics={timeseriesMetrics} type={"Live"}/>
        </div>
        <div className="max-w-6xl mx-auto h-auto bg-white pb-36 p-5 md:px-0">
          <h1 className="text-2xl font-medium text-gray-900 pt-12 mb-8">
            Past Transactions
          </h1>
          <PastTransactionsTable trades={trades} handleClick={handleClick} activeTrade={tradeIndex}/>
          {
            trades.length === limit ?
              (
                <div className="mt-5">
                  <MediumOutlineButton width={"full"} click={() => setLimit(limit + 10)}>
                    Load More
                  </MediumOutlineButton>
                </div>
              )
              : null
          }

        </div>
      </div>
      <BasicErrorMessageModal open={isErrorModal} close={() => setIsErrorModal(false)} message="The ticker clicked does not have a corresponding graph." />
    </div>
  )

};

Live.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
}

export default Live;
