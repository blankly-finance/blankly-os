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

import Status from "@/components/project/general/Status";
import {processEpoch, processEpochDiffFromNow, processSeconds} from "@/utils/date";
import ProfileIcon from "@/components/general/profile/ProfileIcon";
import MoreDotsBacktest from "@/components/project/backtest/tables/MoreDotsBacktest";
import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {usePerms} from "@/libs/perms";
import EditLabelModal from "@/components/general/modals/EditLabelModal";
import {getBacktestBlanklyMetrics, updateBacktest} from "@/services/backtest-store";
import {useAuth} from "@/libs/auth";
import {useStarterModel} from "@/contexts/StarterModelContext";

const BacktestTableRow = (props: { compare: any, backtest: any, setOverflow: any }) => {
    const backtest = props.backtest;
    const isStarterModel = useStarterModel();
    const {level} = usePerms();
    const router = useRouter();
    const {uid} = useAuth();
    const {projectId, modelId} = router.query;
    const [label, setLabel] = useState('');
    const [currId, setId] = useState('');
    const [editLabel, setEditLabel] = useState(false);
    const [metrics, setMetrics] = useState<any>({});

    const onHandleClick = useCallback((version: string, status: string) => {
        if (status) {
            router.push(`/${projectId}/${modelId}/${version}/backtest`);
        } else {
            router.push(`/${projectId}/${modelId}/${version}/log`);
        }
    }, [modelId, projectId, router]);

    useEffect(() => {
        if (projectId && modelId && backtest?.id) {
            getBacktestBlanklyMetrics(projectId as string, modelId as string, backtest.id).then((doc) => {
                const data: any = doc.data();
                setMetrics(doc.data()?.metrics);
            })
        }
    }, [backtest.id, modelId, projectId]);

    return (
        <tr>
            <td className="pl-5 pr-3 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => onHandleClick(backtest.id, backtest.status)}>
                <div className="font-semibold text-sm text-gray-900">
                    {backtest.id.slice(0, 15)}{backtest.id.length > 15 ? "..." : ""}
                </div>

            </td>
            <td className="px-3 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => onHandleClick(backtest.id, backtest.status)}>
                <Status
                    time={backtest.status?.timeElapsed ? processSeconds(backtest.status?.timeElapsed) : null}
                    successful={backtest.status?.successful}
                    status={backtest.status?.statusSummary}/>

            </td>
            <td className="px-3 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => onHandleClick(backtest.id, backtest.status)}>
                <div className="text-sm text-gray-900">
                    {metrics ? Math.round(metrics?.cagr?.value * 100) : NaN}%
                </div>

            </td>
            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                onClick={() => onHandleClick(backtest.id, backtest.status)}>
                <div className="text-sm text-gray-900">
                    {backtest.result ? processEpoch(backtest.result.startTime, "MM/DD/YYYY") : "NaN"}-{backtest.result ? processEpoch(backtest.result.stopTime, "MM/DD/YYYY") : "NaN"}
                </div>
            </td>
            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                onClick={() => onHandleClick(backtest.id, backtest.status)}>
                {backtest.description && backtest.description.length > 0 ?
                    (<div className="text-sm text-gray-900 max-w-sm">
                        {backtest.description.slice(0, 30)}{backtest.description.length > 30 ? "..." : ""}
                    </div>)
                    :
                    (<div className="text-sm italic text-gray-400 max-w-sm">
                        No Description
                    </div>)
                }
            </td>
            {
                level >= 5 && !isStarterModel ?
                    <td className="px-3 py-4 whitespace-nowrap text-center text-sm cursor-pointer"
                        onClick={() => {
                            if (level >= 5 && !isStarterModel) {
                                setEditLabel(true);
                                setLabel(backtest.label);
                                setId(backtest.id);
                            }
                        }}>
                        {backtest.label && backtest.label.length > 0 ?
                            (<div className="rounded-2xl text-white bg-blue-600 px-3 py-1 text-center text-xs"
                            >
                                {backtest.label}
                            </div>) :
                            (
                                <div className="text-blue-600 text-underline hover:text-blue-800 cursor-pointer">
                                    Add Label
                                </div>
                            )
                        }
                    </td>
                :
                <></>
            }

            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                onClick={() => onHandleClick(backtest.id, backtest.status)}>
                <div className="flex justify-end items-center">
                    <div className="text-sm text-gray-500 max-w-sm">
                        {processEpochDiffFromNow(backtest.time)} by
                    </div>
                    <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative ml-2">
                        <ProfileIcon id={backtest?.runBy ? backtest.runBy : uid}/>
                    </div>
                </div>
            </td>
            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                <MoreDotsBacktest id={backtest.id}
                                  description={backtest.description}
                                  click={() => props.setOverflow(true)}
                                  openModal={() => {
                                      props.compare()
                                  }}/>
            </td>
            <EditLabelModal
                open={editLabel}
                label={label ? label : ''}
                update={(value: string) => updateBacktest(projectId as string,
                    modelId as string, currId, {label: value})}
                close={() => setEditLabel(false)}
            />
            {/* <CompareModal open={isCompareOpen} close={() => setCompareModal(false)} current={[compareId]}/> */}
        </tr>
    )

}

export default BacktestTableRow;
