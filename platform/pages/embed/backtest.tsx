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
import React, {useEffect, useState} from "react";
import {getBacktestSubscription} from "@/services/backtest-store";
import {processEpoch} from "@/utils/date";
import BlanklyBlack from "@/public/blankly-black.svg";
import Image from "next/image";
import Metrics from "@/components/embed/backtest/Metrics";
import {classNames} from "@/utils/general";
import {useIntercom} from "react-use-intercom";
import {BacktestGraph} from "@/components/graph/GraphManager";

const Backtest = () => {
  // pass info about embed system
  const router = useRouter()
  const {id, modelId, backtestId, option} = router.query
  // testing URL: http://localhost:3000/embed/backtest?id=RETIe0J8EPSQz7wizoJX0OAFb8y1&modelId=RcPgBTvPDb4y1w7CotjO&backtestId=67f37ae5-6166-4118-8bb6-21b5163b3ce4&option=3

  // handle option type to modify display
  const [type, setType] = useState<number>()
  const intercom = useIntercom()

  useEffect(() => {
    intercom.shutdown()
  }, [intercom])
  useEffect(() => {
    // @ts-ignore
    let choice = option && !isNaN(option) ? parseInt(option) : 3;
    if (choice > 3) {
      choice = 3
    }
    setType(choice)
  }, [option])

  // get backtest data
  const [invalid, setInvalid] = useState("none")
  const [backtest, setBacktest] = useState<any>();
  useEffect(() => {
    if (id && modelId && backtestId) {
      const unsubscribe = getBacktestSubscription(id as string, modelId as string, backtestId as string).onSnapshot((snapshot) => {
        const data: any = snapshot.data();
        if (!data) {
          setInvalid("cred")
        }
        setBacktest({...data, id: backtestId})
      }, (error) => {
        setInvalid("perm")
      })
      return () => unsubscribe();
    }
  }, [id, modelId, backtestId])

  return (
    <div>
      <div className={classNames(invalid != "none" ? "hidden" : "")}>
        <div className="max-w-6xl mx-auto my-4 bg-white px-8 pb-5 pt-8 border rounded-lg">
          <div className="w-full">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 roboto flex">
                Backtest {backtest?.id}
              </h1>
              <div className="flex space-x-4 text-sm mt-2">
                <p><span className="font-semibold">Start:</span> {processEpoch(backtest?.result?.startTime, 'l')}</p>
                <p><span className="font-semibold">End:</span> {processEpoch(backtest?.result?.stopTime, 'l')}</p>
              </div>
              <div className="w-max roboto text-md mt-3 text-gray-400">
                {backtest?.description ? backtest.description : "No Description Given"} <br/>
              </div>
            </div>
          </div>
          {type == 1 || type == 3 ?
            <BacktestGraph id={id as string} modelId={modelId as string} backtest={backtest}
                           height={500}/> : null}
          {type == 2 || type == 3 ?
            <Metrics id={id as string} modelId={modelId as string} backtestId={backtestId as string}/> : null}
          <div className="mt-8 text-right roboto flex">
            {/*<span className="ml-auto mt-1 mr-1 text-gray-700 font-semibold text-md">Powered by</span>*/}
            <a target="_blank"
               rel="noreferrer"
               href="https://blankly.finance"
               className="ml-auto flex items-center text-gray-400 text-xs">
              <span className="mr-1">Powered by</span>
              <Image
                width={90}
                height={25}
                src={BlanklyBlack}
                alt="Blankly Black SVG"/>
            </a>
          </div>
        </div>
      </div>
      <div className={classNames(invalid == "cred" ? "" : "hidden")}>
        Invalid Credentials (invalid id/modelId/backtestId)
      </div>
      <div className={classNames(invalid == "perm" ? "" : "hidden")}>
        Invalid Share Permissions
      </div>
    </div>

  )
}

export default Backtest
