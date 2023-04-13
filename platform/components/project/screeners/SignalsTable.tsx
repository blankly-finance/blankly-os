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

import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {processEpoch} from "@/utils/date";
import SignalsOverviewModal from "@/components/project/screeners/SignalsOverviewModal";
import {classNames} from "@/utils/general";
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";

const signals = [
    {
        "ticker": "MSFT",
        "status": "Completed",
        "value": 74,
        "RSI": 76.8,
        "is_golden_cross": "True",
        "duration": "2ms",
        "output": {
            value: 35,
            rsi: 70,
            sma_cross: true
        }
    },
    {
        "ticker": "AAPL",
        "status": "Completed",
        "value": 35,
        "RSI": 35,
        "is_golden_cross": "False",
        "duration": "2ms",
        "output": {
            value: 35,
            rsi: 70,
            sma_cross: true
        }
    },
    {
        "ticker": "GME",
        "status": "Completed",
        "value": 35,
        "RSI": 46,
        "is_golden_cross": "False",
        "duration": "2ms",
        "output": {
            value: 35,
            rsi: 70,
            sma_cross: true
        }
    },
    {
        "ticker": "ICE",
        "status": "Completed",
        "value": 35,
        "RSI": 46,
        "is_golden_cross": "False",
        "duration": "2ms",
        "output": {
            value: 35,
            rsi: 70,
            sma_cross: true
        }
    },
    {
        "ticker": "NVDA",
        "status": "Completed",
        "value": 35,
        "RSI": 46,
        "is_golden_cross": "False",
        "duration": "2ms",
        "output": {
            value: 35,
            rsi: 70,
            sma_cross: true
        }
    }
];

function getDefinedKeys(dict: Object) {
    const keys = Object.keys(dict);
    return keys.filter((value) => {
        return value !== "symbol" && value !== "symbol_time";
    })
}

export default function ScreenerTable({ results }: { results: any }) {
    const router = useRouter();
    const [showOverflow, setShowOverflow] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectName, setSelName] = useState("");
    const [selectOutput, setSelOut] = useState("");
    const [headers, setHeaders] = useState<any>([]);
    const [values, setValues] = useState<any>([]);

    const { projectId, modelId } = router.query;

    function openModal(name: string, output: any) {
        setSelName(name);
        setSelOut(output);
        setModalOpen(true);
    }

    useEffect(() => {
        if (results && results.screener && Object.keys(results.screener).length > 0) {
            const value: Object[] = Object.values(results.screener);
            setValues(value);
            setHeaders(getDefinedKeys(value[0]));
        }
    }, [results])

    function handleClick(signalId: number) {
        router.push(`/${projectId}/${modelId}/signals/${signalId}/run`);
    }

    return (
        <div className="max-w-7xl mx-auto flex flex-col roboto">
            <div className="shadow-md rounded-md bg-white py-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-12">
                    <div className="max-w-7xl mb-8 mx-auto flex flex-row justify-between items-center">
                        <h1 className="text-xl font-medium roboto">Table Output - Total of <button className="text-blue-500">{values.length} Entries</button></h1>
                        <div className="flex flex-col text-sm">
                            <p className="text-gray-400">Ran At</p>
                            <button onClick={() => handleClick(1)} className="text-blue-500">{processEpoch(results?.status?.stopTime)}</button>
                        </div>
                        {/* <div className="flex items-center space-x-2">
                            <div>
                                <GrayButton>
                                    <p className="font-medium">Table Output</p>
                                </GrayButton>
                            </div>
                            <div>
                                <OutlineButton>
                                    <p className="font-medium">Raw Output</p>
                                </OutlineButton>
                            </div>
                        </div> */}
                    </div>
                    <div
                        className={classNames("border border-gray-200 rounded-md mb-2.5 h-auto")}>
                        <table className="min-w-full divide-y px-4 divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="pl-5 pr-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Ticker
                                    </th>
                                    {
                                        headers.map((header: any) => (
                                            <th
                                                key={header}
                                                scope="col"
                                                className="pl-5 pr-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))
                                    }
                                    <th className="pl-5 pr-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {values?.map((signal: any, index: number) => (
                                    <tr key={index}>
                                        <td className="pl-5 pr-3 py-4 whitespace-nowrap cursor-pointer">
                                            <div className="font-semibold text-sm text-gray-900">
                                                {signal.symbol}
                                            </div>
                                        </td>
                                        {
                                            headers.map((header: any) => (
                                                <td key={header} className="pl-5 px-3 py-4 whitespace-nowrap cursor-pointer">
                                                    <div className="text-sm text-gray-900">
                                                        {"" + signal[header]}
                                                    </div>
                                                </td>

                                            ))
                                        }
                                        {/* <td className="pl-5 px-3 py-4 text-right pr-6 whitespace-nowrap text-sm text-gray-400 cursor-pointer">
                                            <button onClick={() => openModal(signal.ticker, signal.output)}
                                                className="text-blue-600 ml-20 text-sm hover:text-blue-800">
                                                <p>View Function Call Results</p>
                                            </button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <MediumOutlineButton width="full">
                            <p className="text-md roboto">Load More</p>
                        </MediumOutlineButton>
                    </div>
                </div>
            </div>
            <SignalsOverviewModal open={isModalOpen} close={() => setModalOpen(false)} output={selectOutput}
                name={selectName} />
        </div>
    );
}
