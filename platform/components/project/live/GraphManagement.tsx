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

import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getModelOnce} from "@/services/models-store";
import PastTransactionsTable from "../general/PastTransactionsTable";
import {LiveGraph} from "@/components/graph/GraphManager";

const GraphManagement = (props: { trades: Array<any>, showTrades?: boolean }) => {
  const router = useRouter()
  const {projectId, modelId} = router.query;

  const [tradeIndex, setTradeIndex] = useState(0);
  const [model, setModel] = useState<any>({});

  useEffect(() => {
    getModelOnce(projectId as string, modelId as string).then((data: any) => {
      setModel(data.data());
    });
  }, [projectId, modelId]);

  const handleClick = (index: number) => {
    setTradeIndex(index);
    // setTab(trades[index].symbol);
  }

  return (
    <div className="h-auto mx-auto my-8 max-w-7xl px-8 pb-4 pt-1 bg-white shadow-md rounded ">
      <LiveGraph id={projectId as string} modelId={modelId as string} model={model} activeIndex={tradeIndex}/>
      {
        props.showTrades ?
          (
            props.trades?.length > 0 ?
              (
                <div className="py-12 max-w-6xl mx-auto">
                  <h1 className="mb-4 font-medium text-xl">Recent Transactions</h1>
                  <PastTransactionsTable handleClick={handleClick} activeTrade={tradeIndex}
                                         trades={props.trades?.slice(0, 10)}/>
                </div>
              ) : (
                <div className="pt-12 pb-6 max-w-6xl mx-auto">
                  <h1 className="mb-4 font-medium text-xl">Recent Transactions</h1>
                  <div className="border border-gray-200 text-base text-gray-500 rounded p-6 text-center">
                    No transactions have been made by your algorithm
                  </div>
                </div>
              )
          ) : null
      }

    </div>
  )
}

export default GraphManagement
