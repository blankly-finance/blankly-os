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

import ExchangeIcons from "../../general/ExchangeIcons";
import ModelStatus from "./ModelStatus";

const ModelCard = (props: {
    version: string;
    name: string;
    desc: string;
    id: string;
    exchanges: Array<string>;
    tickers: Object;
    status: string;
}) => {
    let tickers: string[] = [];
    let exchanges: string[] = [];
    if (props.tickers) {
        tickers = Object.keys(props.tickers);
    }
    if (props.exchanges) {
        const uniqueExchanges = new Set(Object.keys(props.exchanges));
        exchanges = [...Array.from(uniqueExchanges)];
    }
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md h-full flex flex-col">
            <div
                className="bg-white px-8 py-6 transition ease-in-out duration-200 hover:shadow-lg shadow-md rounded-lg flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-xs roboto w-3/4">
                        {" "}
                        Current Version: {props.version ? props.version : "No Version Deployed"}
                    </p>
                    <div className="text-right -mr-3">
                        <button>
                            {/* <DotsVerticalIcon className="w-4 h-4 text-right" /> */}
                        </button>
                    </div>
                </div>
                {props.name ?
                    (<h1 className="mt-3 text-2xl roboto font-semibold text-black">
                        {(props.name as any).slice(0, 150)}{(props.name as any).length > 150 ? "..." : ""}
                    </h1>)
                    : (<h1 className="mt-3 text-xl roboto font-semibold text-black">
                        {props.id}
                    </h1>)
                }
                {
                    props.desc ? (
                        <p className="mt-1 text-sm text-gray-500 grow roboto flex-auto"> {(props.desc as any).slice(0, 200)}{(props.desc as any).length > 200 ? "..." : ""}</p>
                    ) : <p className="mt-1 text-sm text-gray-400 grow italic roboto flex-auto">No description</p>
                }

                <div className="flex mt-4 items-center">
                    <p className="roboto text-sm mr-2">Exchanges: </p>
                    <ExchangeIcons exchanges={exchanges}/>
                    <span className="text-sm roboto text-gray-500 font-semibold">
            {
                exchanges.length === 0 ? "No Exchanges" : null
            }
          </span>
                </div>
                <div className="roboto text-sm mt-1">
                    <span className="space-x-2">Tickers:</span>
                    <span className="font-semibold ">
            {" "}
                        {tickers.map((ticker) => (
                            <span key={ticker}>{ticker} </span>
                        ))}
                        {
                            tickers.length === 0 ? <span className="text-gray-500">No Tickers</span> : null
                        }
          </span>
                </div>
                <div className="roboto text-sm mt-1 flex items-center">
                    <span className="space-x-1">Status: </span>
                    <ModelStatus status={props?.status}/>
                </div>
            </div>
        </div>
    );
};

export default ModelCard;
