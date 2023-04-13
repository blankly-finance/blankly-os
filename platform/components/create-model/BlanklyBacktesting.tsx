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

import { getBacktestsOnce } from "@/services/backtest-store";
import { updateModel } from "@/services/models-store";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import ErrorAlert from "../general/alerts/ErrorAlert";

const BlanklyBacktesting = ({projectName, modelName}: {projectName: string, modelName: string}) => {
    const router = useRouter();
    const {modelId, projectId} = router.query;
    const [errors, setErrors] = useState<any>([]);
    const verifyBacktest = useCallback(() => {
        getBacktestsOnce(projectId as string, modelId as string).then((query) => {
            if (query.docs.length > 0) {
                router.push(`/${projectId}/${modelId}/backtests`);
                updateModel(projectId as string, modelId as string, {
                    lifecycleStatus: {
                        message: 'Not Running',
                    }
                })
            } else {
                setErrors(['No backtest was found, make sure you run the bot.py file']);
            }
        });
    }, [projectId, modelId, router])
    return (
        <div>
            <p className="mt-6">1. First, let&apos;s upgrade <span className="inconsolata">blankly</span> let&apos;s login...</p>
            <div className="flex mt-5">
                <div className="bg-gray-100 w-full rounded-md">
                    <p className="inconsolata m-3 ml-6 text-md text-gray-700">
                        $&nbsp;&nbsp;pip&nbsp;install -U blankly
                    </p>
                    <p className="inconsolata m-3 ml-6 text-md text-gray-700">
                        $&nbsp;&nbsp;blankly login
                    </p>
                </div>
            </div>
            <p className="mt-6 w-4/5">2. To initialize your directory with all the items that you need, we&apos;ve given you an easy command. Now in the directory of your choice, run...</p>
            <div className="flex mt-5">
                <div className="bg-gray-100 w-full rounded-md">
                    <p className="inconsolata m-3 ml-6 text-md text-gray-700">
                        $&nbsp;&nbsp;blankly&nbsp;init
                    </p>
                    <p className="inconsolata m-3 ml-6 text-md text-gray-700">
                        ...
                    </p>
                    <p className="inconsolata m-3 ml-6 text-md text-gray-700">
                        What model are you currently using? (Choose <span className="text-blue-500 font-bold">{modelName}</span>...)
                    </p>
                </div>
            </div>
            <p className="mt-6 w-4/5">3. Since you already have an algorithm in backtesting, simply run your file (i.e. <span className="inconsolata">bot.py</span>)</p>
            <div className="flex mt-5">
                <div className="bg-gray-100 w-full rounded-md">
                    <p className="inconsolata m-3 ml-6 text-md text-gray-700">
                        $&nbsp;&nbsp;python&nbsp;bot.py
                    </p>
                </div>
            </div>
            <p className="mt-6 w-4/5">Now since we&apos;ve logged in and set up our directory and connection with the platform, your backtest and future backtests should now be in the platform</p>
            <ErrorAlert errors={errors} />
            <div className="flex mt-12 text-sm">
                <button onClick={verifyBacktest}
                    className="bg-gray-900 hover:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-full h-10 text-white roboto rounded-lg">
                    Verify and View Backtest
                </button>
            </div>
            <p onClick={() => router.push(`/${projectId}/${modelId}/overview`)} className="text-sm text-center cursor-pointer text-blue-500 hover:text-blue-600 mt-3">Actually, I&apos;ll just skip set up for now</p>
        </div>
    );
}

export default BlanklyBacktesting;
