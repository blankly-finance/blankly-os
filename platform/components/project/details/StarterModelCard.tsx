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
import ExchangeIcons from "../../general/ExchangeIcons";
import RoundedProfileIcon from "@/components/general/profile/RoundedProfileIcon";
import Label from "./Label";
import StarterModelModal from "@/components/general/modals/StarterModelModal";
import {StarterModel} from "@/types/model";

const StarterModelCard = (props: { model: StarterModel }) => {
    const [model, setModel] = useState<any>({});
    const [modal, setModal] = useState(false);
    let tickers: string[] = [];
    let exchanges: string[] = [];
    if (model.tickers) {
        tickers = Object.keys(model.tickers);
    }
    if (model.exchange) {
        const uniqueExchanges = new Set(Object.keys(model.exchange));
        exchanges = [...Array.from(uniqueExchanges)];
    }

    useEffect(() => {
        if (!props.model) return;
        setModel(props.model);
    }, [props])

    return (
        <div onClick={() => setModal(true)}
             className="sm:mx-auto transition ease-in-out duration-200 hover:shadow-lg bg-white sm:w-full sm:max-w-md h-full flex flex-col shadow-md rounded-lg"
        >
            {
                JSON.stringify(model) === "{}" ?
                    null
                    :
                    <>
                        <div
                            className="px-8 py-6 flex-1 flex flex-col">
                            <div className="flex">
                                {model.labels.map((label: string, index: number) => (
                                    <div key={index} className="mr-1">
                                        <Label text={label}/>
                                    </div>
                                ))}
                            </div>
                            {model.name ?
                                <h1 className="mt-5 text-2xl roboto font-semibold text-black">
                                    {(model.name as any).slice(0, 150)}{(model.name as any).length > 150 ? "..." : ""}
                                </h1>
                                : <h1 className="mt-5 text-xl roboto font-semibold text-black">
                                    {model.id}
                                </h1>
                            }
                            {
                                model.description ? (
                                    <p className="mt-1 text-sm text-gray-500 grow roboto flex-auto"> {(model.description as any).slice(0, 200)}{(model.description as any).length > 200 ? "..." : ""}</p>
                                ) : <p className="mt-1 text-sm text-gray-400 grow italic roboto flex-auto">No
                                    description</p>
                            }

                            <div className="flex mt-4 mb-2 items-center">
                                <p className="roboto text-sm mr-2">Exchange: </p>
                                <span className="text-sm roboto text-gray-500 font-semibold">
                                {
                                    exchanges.length === 0 || exchanges[0] === "keyless" ? "No Exchange" :
                                        <ExchangeIcons exchanges={exchanges}/>

                                }
                                </span>
                            </div>
                            <div className="roboto text-sm my-2">
                                <span className="space-x-2">Tickers:</span>
                                <span className="font-semibold ">
                                    {" "}
                                    {tickers.map((ticker) => (
                                        <span className="mr-1" key={ticker}>{ticker}</span>
                                    ))}
                                    {
                                        tickers.length === 0 ? <span className="text-gray-500">No Tickers</span> : null
                                    }
                                </span>
                            </div>
                            <div className="roboto text-sm my-1 flex items-center">
                                <p className="space-x-1">Created by: </p>
                                <div className="h-6 w-6 ml-2">
                                    <RoundedProfileIcon id={model.creatorUid}/>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 border-t divide-x">
                            <div className="flex flex-col justify-center py-2 items-center">
                                <h3 className="text-2xl text-blue-500 font-semibold my-1">{model.stats.sharpe}</h3>
                                <p className="text-sm mb-1">Sharpe</p>
                            </div>
                            <div className="flex flex-col justify-center py-2 items-center">
                                <h3 className="text-2xl text-blue-500 font-semibold my-1">{model.stats.sortino}</h3>
                                <p className="text-sm mb-1">Sortino</p>
                            </div>
                            <div className="flex flex-col justify-center py-2 items-center">
                                <h3 className="text-2xl text-blue-500 font-semibold my-1">{model.stats.cagr * 100}%</h3>
                                <p className="text-sm mb-1">CAGR</p>
                            </div>
                        </div>
                        {/*@ts-ignore*/}
                        <StarterModelModal open={modal} close={() => setModal(false)} model={model} tickers={tickers} exchanges={exchanges} />
                    </>
            }
        </div>

    );
};

export default StarterModelCard;
