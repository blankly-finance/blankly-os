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

import Head from "next/head";
import Script from "next/script";
import {useCallback, useState} from "react";
import TickerAndAmt from "./TickerAndAmt";

const updateArrayValues = (arr: any[], value: any, index: number) => {
    arr[index] = value;
    return arr;
}

const createValueObject = (values: any[]) => {
    let obj: any = {}
    for (let i = 0; i < values.length; i++) {
        const key = Object.keys(values[i])[0]
        const amt = Object.values(values[i])[0] as string;
        if (key && amt) {
            obj[key] = parseInt(amt, 10);
        }
    }
    return obj;
}

const BacktestArgsForm = ({update}: any) => {
    const [values, setValues] = useState([{}]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const sendValues = useCallback((ticker, index, hasTickers = true) => {
        let res = [];
        if (hasTickers) {
            res = updateArrayValues(values, ticker, index);
            setValues(res);
        } else {
            res = values;
        }
        update({
            'start_date': startDate,
            'end_date': endDate,
            'initial_values': createValueObject(res)
        })
    }, [update, startDate, endDate, values])
    return (
        <div className="border border-gray-200 rounded-lg p-8">
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.min.css"/>
            </Head>
            <div date-rangepicker="" className="flex items-center">
                <span className="mr-4 text-lg font-medium">Backtest Period (mm/dd/yyyy): </span>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                             viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <input required
                           onChange={(e) => {
                               setStartDate(e.target.value);
                               sendValues({}, '', false)
                           }}
                           onBlur={(e) => {
                               setStartDate(e.target.value);
                               sendValues({}, '', false)
                           }}
                           name="start" type="text"
                           className="border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                           placeholder="Backtest Start"/>
                </div>
                <span className="mx-4 text-gray-500">to</span>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                             viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <input required name="end"
                           onChange={(e) => {
                               setEndDate(e.target.value);
                               sendValues({}, '', false)
                           }}
                           onBlur={(e) => {
                               setEndDate(e.target.value);
                               sendValues({}, '', false)
                           }}
                           type="text"
                           className="border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                           placeholder="Backtest Finish"/>
                </div>
            </div>
            <div className="mt-8">
                <h1 className="text-lg roboto font-medium">Initial Asset Values</h1>
                <p className="text-gray-500 italic text-sm">Make sure to add USD (or USDT for Binance)</p>
                <TickerAndAmt update={(ticker: any) => sendValues(ticker, 0)}/>
            </div>
            <Script src="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/datepicker.bundle.js"/>
        </div>
    );
}

export default BacktestArgsForm;
