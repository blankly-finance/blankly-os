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

import {processDate, processDateFromNow} from "@/utils/date";
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";
import SignalStatus from "./SignalStatus";

const RequestsTable = ({ requests }: any) => {

    return (
        <div className="pb-12">
            <div className="shadow-md rounded-md h-auto py-2 bg-white">
                <table className="min-w-full table-fixed divide-y divide-gray-200">
                    <tbody className="bg-white divide-y border-b border-gray-200 divide-gray-200">
                        {requests.map((request: any, index: number) => (
                            <tr key={request.id}>
                                <td width="23%" className="pl-10 py-4 whitespace-nowrap">
                                    <div className="inconsolata font-semibold text-gray-900">
                                        [{request.type.toUpperCase()}] {request.id}
                                    </div>
                                    <div className="text-xs text-gray-300">
                                        Ran at {processDate(request.createdAt)}
                                    </div>
                                </td>
                                <td width="15%" className="px-3 py-4 whitespace-nowrap">
                                    <SignalStatus time="1m 23s" />
                                </td>
                                <td width="50%" className="px-3 py-4 whitespace-nowrap text-sm text-left">
                                    Ran on {
                                        request.tickers.map((ticker: string, index: number) => (
                                            <>
                                                <span className="font-semibold">{ticker}</span>
                                                {
                                                    index + 1 != request.tickers.length ?
                                                        <span className="font-semibold">, </span>
                                                        : null
                                                }
                                            </>
                                        ))
                                    }

                                </td>
                                <td width="10%" className="pr-10 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center space-x-8 justify-end">
                                        <div className="text-sm text-gray-500 max-w-sm">
                                            Finished {processDateFromNow(request.createdAt)}
                                        </div>
                                        <MediumOutlineButton>View Full Function Result</MediumOutlineButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-8 pt-5 pb-3">
                    <MediumOutlineButton width="full">Load More</MediumOutlineButton>
                </div>
            </div>
        </div>
    )
}

export default RequestsTable
