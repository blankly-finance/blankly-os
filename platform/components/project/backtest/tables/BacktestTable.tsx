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

import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getBacktestBlanklyMetrics, getBacktests, updateBacktest} from "@/services/backtest-store";
import ContentLoader from "react-content-loader";
import {processEpoch, processEpochDiffFromNow, processSeconds} from "@/utils/date";
import CompareModal from "@/components/project/backtest/modals/CompareModal";
import ProfileIcon from "@/components/general/profile/ProfileIcon";
import EditLabelModal from "@/components/general/modals/EditLabelModal";
import {classNames} from "@/utils/general";
import {usePerms} from "@/libs/perms";
import BacktestTableRow from "@/components/project/backtest/tables/subtables/BacktestTableRow";
import Status from "@/components/project/general/Status";
import {useAuth} from "@/libs/auth";

const loadingList = ["", "", "", "", "", "", "", "", "", "", ""];

export default function BacktestTable() {
  const router = useRouter();
  const {projectId, modelId} = router.query;
  const {level} = usePerms();
  const {uid} = useAuth();
  const [label, setLabel] = useState('');
  const [currId, setId] = useState('');
  const [editLabel, setEditLabel] = useState(false);
  const [showOverflow, setShowOverflow] = useState(false);
  const [backtests, setBacktests] = useState<any>([]);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(true);
  const [isCompareOpen, setCompareModal] = useState(false);
  const [compareId, setCompareId] = useState("");

  const onHandleClick = useCallback((version: string, status: string) => {
    if (status) {
      router.push(`/${projectId}/${modelId}/${version}/backtest`);
    } else {
      router.push(`/${projectId}/${modelId}/${version}/log`);
    }
  }, [modelId, projectId, router]);

  function getCAGR(backtestId: string) {
    getBacktestBlanklyMetrics(projectId as string, modelId as string, backtestId).then((doc) => {
      return doc.data()?.metrics.cagr?.value * 100
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  // Get backtest info
  useEffect(() => {
    if (projectId && modelId) {
      const unsubscribe = getBacktests(projectId as string, modelId as string, limit).onSnapshot((query) => {
        const bts = query.docs.map((val) => {
          return {
            id: val.id,
            ...val.data()
          }
        });
        setBacktests(bts);
      }, (e: any) => {
        router.push('/dashboard')
      })
      return () => unsubscribe();
    }
    return;
  }, [projectId, modelId, limit, router]);

  return (
    <div className="flex flex-col roboto">
      {
        backtests.length === 0 ? (
          <div className="pt-12 pb-6 w-full  max-w-6xl mx-auto">
            <div className="border border-gray-200 text-base text-gray-500 rounded p-6 text-center">
              No backtests were found to display
            </div>
          </div>
        ) : null
      }
      <div
        className={classNames("-my-2 overflow-x-auto scrollbar-hide sm:-mx-6 lg:-mx-8", backtests.length === 0 ? "hidden" : "block")}>
        <div className="py-2 pb-24 align-middle inline-block min-w-full sm:px-3 lg:px-8">
          <div
            className={classNames(showOverflow ? "" : "overflow-hidden", "border hidden sm:block border-gray-200 rounded-md mb-2.5 h-auto")}>
            <table className="min-w-full scrollbar-hide divide-y px-4 divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="pl-5 pr-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Version ID
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  CAGR
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Backtest Period
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Label
                </th>
                <th scope="col" className="relative px-3 py-3">
                  <span className="sr-only">User</span>
                </th>
                <th scope="col" className="relative px-3 py-3">
                  <span className="sr-only">Expand</span>
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {
                loading ?
                  <>
                    {loadingList?.map((loading, index) => (
                      <tr key={index}>
                        <td className="pl-5 pr-3 whitespace-nowrap cursor-pointer">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 70 30"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="8" rx="2" ry="2" width="65" height="10"/>
                          </ContentLoader>
                        </td>
                        <td className="px-3 whitespace-nowrap cursor-pointer">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 70 30"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="0" rx="8" ry="8" width="15" height="15"/>
                            <rect x="20" y="0" rx="2" ry="2" width="50" height="10"/>
                            <rect x="20" y="15" rx="2" ry="2" width="50" height="10"/>
                          </ContentLoader>
                        </td>
                        <td className="px-3 whitespace-nowrap cursor-pointer">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 50 30"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="6" rx="2" ry="2" width="40" height="10"/>
                          </ContentLoader>
                        </td>
                        <td className="px-3 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 70 20"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="5" rx="2" ry="2" width="50" height="10"/>
                          </ContentLoader>
                        </td>
                        <td className="px-3 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 70 20"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="5" rx="2" ry="2" width="50" height="10"/>
                          </ContentLoader>
                        </td>
                        <td className="px-3 whitespace-nowrap text-sm cursor-pointer">
                          <ContentLoader
                            speed={2}
                            viewBox="0 0 70 20"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                          >
                            <rect x="0" y="5" rx="2" ry="2" width="50" height="15"/>
                          </ContentLoader>
                        </td>
                        <td className="px-3 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                        </td>
                      </tr>
                    ))}
                  </>
                  :
                  <>
                    {backtests?.filter((backtest: any) => backtest.status).map((backtest: any, index: number) => (
                      <BacktestTableRow compare={() => {
                        setCompareModal(true);
                        setCompareId(`${modelId}_${backtest.id}`)
                      }} backtest={backtest} setOverflow={setShowOverflow} key={index}/>
                    ))}
                  </>
              }

              </tbody>
            </table>
          </div>
          <div
            className="block w-full sm:hidden flex flex-col gap-4 justify-center justify-items-center items-center">
            {backtests?.filter((backtest: any) => backtest.status).map((backtest: any, index: number) => (
              <div key={index}
                   className="w-full divide-y space-y-3 border col-span-1 border-gray-200 p-4 rounded-md flex flex-col">
                <div className="pb-2">
                  <div className="font-semibold text-sm text-gray-900 mr-2">
                    {backtest.id}
                  </div>
                </div>
                <div className="pt-4">
                  <Status
                    time={backtest.status?.timeElapsed ? processSeconds(backtest.status?.timeElapsed) : null}
                    successful={backtest.status?.successful}
                    status={backtest.status?.statusSummary}
                  />

                </div>
                <div className="pt-4">
                  <div className="text-sm text-gray-900"
                       onClick={() => onHandleClick(backtest.id, backtest.status)}>
                    {backtest.result ? processEpoch(backtest.result.startTime, "MM/DD/YYYY") : "NaN"}-{backtest.result ? processEpoch(backtest.result.stopTime, "MM/DD/YYYY") : "NaN"}&nbsp;&nbsp;
                  </div>
                </div>
                <div className="pt-4">
                  <div onClick={() => {
                    if (level >= 5) {
                      setEditLabel(true);
                      setLabel(backtest.label);
                      setId(backtest.id);
                    }
                  }}>
                    {backtest.label && backtest.label.length > 0 ?
                      (<div
                        className="rounded-2xl text-white bg-blue-600 px-3 py-1 text-center text-xs"
                      >
                        {backtest.label}
                      </div>) :
                      (
                        <div
                          className="text-blue-600 text-sm text-underline hover:text-blue-800 cursor-pointer">
                          Add Label
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="pt-4">
                  {backtest.description && backtest.description.length > 0 ?
                    (<div className="text-sm text-gray-900 max-w-sm">
                      {backtest.description.slice(0, 50)}{backtest.description.length > 50 ? "..." : ""}
                    </div>)
                    :
                    (<div className="text-sm italic text-gray-400 max-w-sm">
                      No Description
                    </div>)
                  }
                </div>
                <div className="flex justify-start items-center pt-4">
                  <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative mr-2">
                    <ProfileIcon id={backtest?.runBy ? backtest.runBy : uid}/>
                  </div>
                  <div className="text-sm text-gray-500 max-w-sm">
                    {processEpochDiffFromNow(backtest.time)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <EditLabelModal
          open={editLabel}
          label={label ? label : ''}
          update={(value: string) => updateBacktest(projectId as string,
            modelId as string, currId, {label: value})}
          close={() => setEditLabel(false)}
        />
      </div>
      <CompareModal open={isCompareOpen} close={() => setCompareModal(false)} current={[compareId]}/>
      {
        backtests.length === limit ?
          (<button
            className="roboto w-full border -mt-16 rounded-md mt-2 py-2 text-sm hover:bg-gray-100"
            onClick={() => setLimit(limit + 20)}
          >
            Load More
          </button>) : null
      }
    </div>
  );
}
