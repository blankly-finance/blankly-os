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

import {getStarterModel} from "@/services/starter-models-store";
import {useEffect, useState} from "react";

const StarterModelsPrompt = ({id}: { id: string }) => {
    const [shortName, setShortName] = useState<string>('');
    useEffect(() => {
        getStarterModel(id).then((query) => {
            if (query.data()) {
                setShortName(' ' + query.data()?.shortName);
            }
        });
    }, [id])

    return (
        <div className="max-w-6xl mx-auto">
            <div
                className="w-full border border-gray-200 rounded-lg h-auto p-5 pb-16 sm:px-0 flex justify-center items-center">
                <div
                    className="w-full py-8 flex flex-col justify-center items-center w-7/12">
                    <h2 className="font-semibold text-2xl my-2 roboto">Here&apos;s how to get
                        started with this new model</h2>
                    <p className="text-gray-400 text-sm my-2">Make sure that you
                        have python installed locally, then open up a terminal and
                        run this</p>
                    <div className="flex items-center">
                        <p className="text-gray-400 text-sm">If you haven&apos;t already
                            set up keys with</p>
                        <p className="font-semibold text-sm text-black">&nbsp;Alpaca&nbsp;</p>
                        <p className="text-gray-400 text-sm">check this video
                            out&nbsp;</p>
                        <a href="blankly-platform-open-source-main/components/project/overview#" className="text-blue-500 text-sm">here</a>
                    </div>
                    <div
                        className="bg-gray-50 px-8 mt-4 py-8 rounded-xl flex flex-col w-10/12">
                        <p className="text-md my-2 inconsolata">$ pip install -U
                            blankly</p>
                        <p className="text-md my-2 inconsolata">$ blankly login</p>
                        <p className="text-md my-2 inconsolata">$ blankly init {shortName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StarterModelsPrompt;
