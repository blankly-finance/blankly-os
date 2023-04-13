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

import {classNames} from "@/utils/general";
import Alpaca from '@/public/logos/alpaca-logo.svg';
import {Switch} from "@headlessui/react";
import {useState} from "react";
import Image from "next/image";

const PluginCard = () => {
    const [enabled, setEnabled] = useState(false);
    return (
        <div className="border border-gray-200 rounded-md p-7 col-span-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 relative border rounded-full">
                        <Image objectFit="cover" layout="fill" alt="Alpaca" src={Alpaca} />
                    </div>
                    <h1 className="text-gray-600 font-medium text-sm">Trading View</h1>
                </div>
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={classNames(
                        enabled ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    )}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={classNames(
                            enabled ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                    />
                </Switch>
            </div>
            <div className="mt-4 flex flex-col justify-between">
                <div>
                    <span className="inline-flex -ml-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Webhook
                    </span>
                </div>
                <h1 className="text-xl w-3/4 mt-4 font-semibold">TradingView Webhook Integration</h1>
                <p className="text-gray-500 mt-4 text-sm">This integrates all transactions and trades made by models and outputs them to a specific TradingView webhook URL</p>
                <a className="mb-8 mt-4 text-sm text-blue-600 hover:text-blue-700">See Example Use Cases</a>
                <div className="border px-2 py-2 text-center rounded-full">
                    <p className="text-sm text-gray-500 font-medium">Added by <span className="text-blue-600">3703</span> Others</p>
                </div>
            </div>
        </div>
    );
}

export default PluginCard;
