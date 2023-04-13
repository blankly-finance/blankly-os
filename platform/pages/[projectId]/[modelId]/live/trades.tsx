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

import ModelLayout from "@/components/layouts/ModelNavLayout";
import LastDeployed from "@/components/project/versions/LastDeployed";
import PastTransactionsTable from "@/components/project/general/PastTransactionsTable";
import {getModelOnce} from "@/services/models-store";
import {getTrades} from "@/services/trades-store";
import {useRouter} from "next/router";
import {ReactElement, useEffect, useState} from "react";

const Trades = () => {
  const [allTrades, setAllTrades] = useState<any>([]);
  const [trades, setTrades] = useState<any>([]);
  const [limit, setLimit] = useState(50);
  const [currentDeploymentVersion, setDeploymentVersion] = useState("");
  const router = useRouter();
  const {projectId, modelId} = router.query;

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
    setTrades(allTrades?.slice(0, limit));
  }, [allTrades, limit]);


  return (
    <div className="pb-24">
      <div className="max-w-6xl mx-auto h-auto bg-white py-10">
        <div className="pt-4 flex mb-10">
          <div className="w-1/3">
            <h1 className="text-3xl font-semibold text-gray-900 roboto">
              All Trades
            </h1>
            <LastDeployed id={projectId as string} modelId={modelId as string}
                          deployedVersionId={currentDeploymentVersion}/>
          </div>
        </div>
        <PastTransactionsTable trades={trades}/>
        {
          trades.length === limit ?
            (
              <button onClick={() => setLimit(limit + 10)}
                      className="w-full border rounded-md mt-6 py-2 text-sm hover:bg-gray-100">
                Load More
              </button>
            )
            : null
        }
      </div>
    </div>
  );
}

Trades.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};

export default Trades;
