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

import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useRouter} from "next/router";
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";
import MediumBlackButton from "@/components/general/buttons/MediumBlackButton";
import ExchangeIcons from "@/components/general/ExchangeIcons";
import RoundedProfileIcon from "@/components/general/profile/RoundedProfileIcon";
import {BacktestGraph} from "@/components/graph/GraphManager";
import {
    getBacktestBlanklyMetrics,
    getBacktestBlanklyTimeseriesMetrics,
    getBacktestOnce
} from "@/services/backtest-store";
import {StarterModel} from "@/types/model";
import {MetricsDisplay} from '@/components/project/backtest/metrics/MetricsDisplay';

// const backtest = {
//     "time": 1648785323.382,
//     "status": {
//         "successful": true,
//         "backtestId": "adc4a94b-ff76-4e7f-b654-f872602b095f",
//         "timeElapsed": 0.2940669059753418,
//         "statusDetails": "",
//         "time": 1648785323.787,
//         "statusSummary": "Completed"
//     },
//     "result": {
//         "segmentedAccountValues": false,
//         "stopTime": 1642896000,
//         "quoteAsset": "USD",
//         "backtestId": "adc4a94b-ff76-4e7f-b654-f872602b095f",
//         "startTime": 1568505600,
//         "time": 1648785323.382,
//         "symbols": [
//             "BTC-USD"
//         ]
//     },
//     "runBy": "sogE54jRuvf0X7ZHx3yrbTFav9O2",
//     "description": "Ran on BTC-USD from 09/15/19 to 01/23/22",
//     "id": "a3d6500d-c797-4565-a3d0-2e52af562be6"
// }

export default function StarterModelModal(props: { open: boolean, close: any, model: StarterModel, tickers: Array<string>, exchanges: Array<string> }) {
    const router = useRouter();
    const [model, setModel] = useState<any>({});
    const [metrics, setMetrics] = useState<any>({});
    const [timeseriesMetrics, setTimeseriesMetrics] = useState<any>({});
    const [backtest, setBacktest] = useState<any>({});

    useEffect(() => {
        if (JSON.stringify(model) === "{}") return;
        getBacktestBlanklyMetrics('starters', model.modelId, model.backtestId).then((doc: any) => {
            const data = doc.data();
            setMetrics(data?.metrics);
        });

        getBacktestBlanklyTimeseriesMetrics('starters', model.modelId, model.backtestId).then((doc: any) => {
            const data = doc.data();
            setTimeseriesMetrics(data?.timeseriesMetrics);
        });
    }, [model]);

    useEffect(() => {
        if (props.model) {
            setModel(props.model);
        }
    }, [props]);

    useEffect(() => {
        if (JSON.stringify(model) === "{}") return;
        getBacktestOnce('starters', model.modelId, model.backtestId)
            .then((doc: any) => {
                let backtestTemp = doc.data();
                backtestTemp.id = model.backtestId;
                setBacktest(backtestTemp);
            })
    }, [model])

    const closeModal = useCallback(() => {
        props.close();
    }, [props]);

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto z-40" onClose={closeModal}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="inline-block align-bottom bg-white rounded-lg pt-5 pb-8 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
                            <div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="div"
                                        className="leading-6 w-full flex justify-between px-8 items-center">
                                        <h3 className="font-semibold text-2xl text-gray-900">{model.name}</h3>
                                        <div className='space-x-2'>
                                            <MediumBlackButton
                                                click={() => router.push(`/starters/${model.modelId}/overview`)}>
                                                Duplicate Model with CLI
                                            </MediumBlackButton>
                                            <MediumOutlineButton
                                                click={() => router.push(`/starters/${model.modelId}/backtests`)}>
                                                View Backtests
                                            </MediumOutlineButton>
                                        </div>
                                    </Dialog.Title>
                                    <hr className="my-8" />
                                    <div className="px-8 flex items-center justify-between mb-4">
                                        <p className="text-gray-400 text-left">{model ? model.description : ""}</p>
                                        <div className="flex justify-end space-x-4 w-10/12 ml-4 items-center">
                                            <div className="flex items-center">
                                                <p className="roboto text-sm mr-2">Exchange: </p>
                                                {
                                                    props.exchanges[0] === "keyless" ?
                                                        <p className="text-sm font-semibold">No Exchange</p>
                                                        :
                                                        <ExchangeIcons exchanges={props.exchanges} />
                                                }
                                            </div>
                                            <div className="flex items-center">
                                                <span className="space-x-2">Tickers: &nbsp;</span>
                                                <span className="font-semibold ">
                                                    {props.tickers.map((ticker: any) => (
                                                        <span key={ticker}>{ticker} </span>
                                                    ))}
                                                    {
                                                        props.tickers.length === 0 ?
                                                            <span
                                                                className="text-gray-500">No Tickers</span> : null
                                                    }
                                                </span>
                                            </div>
                                            <div className="roboto text-sm my-1 flex items-center">
                                                <p className="space-x-1">Created by: </p>
                                                <div className="h-6 w-6 ml-2">
                                                    {
                                                        model ?
                                                            <RoundedProfileIcon id={model.creatorUid} />
                                                            :
                                                            <></>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-w-7xl mx-auto rounded-lg px-8 pb-4 mb-4">
                                        {
                                            model ?
                                                <BacktestGraph id={'starters'}
                                                    modelId={model.modelId as string}
                                                    backtest={backtest}
                                                />
                                                :
                                                <></>
                                        }
                                    </div>
                                    <div className="mt-6 w-full px-8">
                                        {
                                            backtest.result ?
                                                <MetricsDisplay type="Backtest" timeseriesMetrics={timeseriesMetrics}
                                                    metrics={metrics} /> : <></>
                                        }
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-400 text-xs mt-8 px-8">
                                Blankly Finance, Inc. does not recommend any securities or algorithms. All investments involve risk and the past performance of a security or financial product does not guarantee future results or returns. Keep in mind that while diversification may help spread risk it does not assure a profit, or protect against loss, in a down market. There is always the potential of losing money when you invest in securities or other financial products. Investors should consider their investment objectives and risks carefully before investing or trading.
                            </p>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
