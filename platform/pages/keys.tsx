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

import {ReactElement, useEffect, useState} from "react";
import BlackTotalNavLayout from "@/components/layouts/BlackTotalNavLayout";
import {useAuth} from "@/libs/auth";
import {useRouter} from "next/router";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/solid";
import OutlineButton from "@/components/general/buttons/OutlineButton";
import BlackButton from "@/components/general/buttons/BlackButton";
import ProfileIcon from "@/components/general/profile/ProfileIcon";
import Image from 'next/image';
import Alpaca from '@/public/logos/alpaca-logo.svg';
import Coinbase from '@/public/logos/coinbase-icon.svg';
import Binance from '@/public/logos/binance-logo.svg';
import Oanda from '@/public/logos/oanda-icon.svg';
import {classNames} from "@/utils/general";


/* This function originally exists in ExchangeIcons. Make it util*/
function getExchangeIcon(exchange: string) {
    switch (exchange) {
        case 'alpaca': {
            return <Image objectFit="cover" layout="fill" alt="Alpaca" src={Alpaca} />;
        }
        case 'coinbase_pro': {
            return <Image objectFit="cover" layout="fill" alt="Coinbase" src={Coinbase} />;;
        }
        case 'binance': {
            return <Image objectFit="cover" layout="fill" alt="Binance" src={Binance} />;;
        }
        case 'Oanda': {
            return <Image objectFit="cover" layout="fill" alt="Oanda" src={Oanda} />;;
        }
    }
}

function Keys() {
    const { user, loading } = useAuth();
    const [displayDetails, setDisDetails] = useState<Array<Boolean>>([false, false, false]);
    const router = useRouter();

    function toggleTab(idx: number) {
        const newDisDetails = [...displayDetails];
        newDisDetails[idx] = !newDisDetails[idx];
        setDisDetails(newDisDetails);
    }

    const keysData = [
        {
            "name": "My Alpaca Portfolio Keys",
            "title": "alpaca-arbitrage-keys",
            "exchange": "alpaca",
            "description": "Keys that are used for arbitrage bots",
            "lastUpdate": "3h ago",
            "uid": "Beta Testing"
        },
        {
            "name": "OANDA Forex Keys",
            "title": "oanda-forex-keys",
            "exchange": "Oanda",
            "description": "OANDA Forex Keys",
            "lastUpdate": "3h ago",
            "uid": "Beta Testing"
        },
        {
            "name": "Financial Modeling Prep Keys",
            "title": "financial-modeling-prep-keys",
            "exchange": "",
            "description": "Used for fundamental data",
            "lastUpdate": "3h ago",
            "uid": "Beta Testing"
        },
    ];

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/auth/signin");
            }
        }
    });


    return (
        <div className="h-auto relative pt-24">
            <div className="max-w-6xl mx-auto py-16">
                <h1 className="text-3xl font-medium mb-4">Your API Keys and Secrets</h1>
                <div className="flex my-4 justify-between">
                    <div className="w-3/5 text-m">
                        <p className="text-gray-400 w-8/12 my-2">
                            Easily store all your keys and addresses with Blankly so you don&apos;t have to
                            reference them in code or store a <a className="text-blue-500">keys.json</a>
                        </p>
                        <button className="text-blue-500 my-2">
                            How do I securely store my keys?
                        </button>
                    </div>
                    <div className="flex space-x-2">
                        <div>
                            <OutlineButton>
                                View Tutorial
                            </OutlineButton>
                        </div>
                        <div>
                            <BlackButton>
                                Add  New Key
                            </BlackButton>
                        </div>
                    </div>
                </div>
                <p className="text-red-500 my-5 font-semibold">Note: This is still in beta and not functional. We are actively working on this...</p>
                <div className="w-full h-auto py-4">
                    {keysData.map((key: any, index: number) => (
                        <div key={index} className="w-full border my-4 flex flex-col border-gray-200 rounded-md h-fit">
                            <div className="w-full border flex items-center py-4 px-8 border-gray-200 rounded-md h-fit">
                                <div className="flex flex-col w-3/12 font-medium text-sm text-gray-900">
                                    <p className="text-lg">{key.name}</p>
                                    <a className="inconsolata font-medium text-sm text-blue-500">{key.title}</a>
                                </div>
                                <div className="w-2/12 flex items-center justify-center font-medium text-sm text-gray-900">
                                    <div className="w-8 h-8 relative">
                                        {getExchangeIcon(key.exchange)}
                                    </div>
                                </div>
                                <div className="w-4/12 flex items-center font-medium text-m text-gray-900">
                                    {key.description}
                                </div>
                                <div className="w-4/12 whitespace-nowrap flex justify-end items-center text-sm text-gray-500">
                                    <div className="flex items-center justify-end">
                                        <div className="text-m text-gray-500 max-w-sm">
                                            3 hrs ago by {key.uid}
                                        </div>
                                        <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative mx-2">
                                            <ProfileIcon id={key.uid} />
                                        </div>
                                        <button onClick={() => toggleTab(index)}>
                                            {
                                                displayDetails[index] ?
                                                    <ChevronUpIcon className="h-7 w-7" aria-hidden="true" />
                                                    :
                                                    <ChevronDownIcon className="h-7 w-7" aria-hidden="true" />
                                            }

                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={classNames(displayDetails[index] ? "border rounded-b-lg w-full h-auto" : "hidden")}>
                                <div className="w-full p-8 roboto">
                                    <div className="flex w-full px-0 items-center justify-center">
                                        <div className="w-3/5  mr-2 h-auto">
                                            <p className="mb-2">Key Name</p>
                                            <input
                                                id="name"
                                                name="name"
                                                type="name"
                                                readOnly
                                                value={keysData[index].name}
                                                className="w-full my-1 p-4 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="w-2/5 ml-6 h-auto">
                                            <p className="mb-2">Key ID</p>
                                            <input
                                                id="id"
                                                name="id"
                                                type="id"
                                                readOnly
                                                value={keysData[index].title}
                                                className="w-full my-1 p-4 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full h-auto">
                                            <p className="my-2">API Key</p>
                                            <input
                                                id="api_key"
                                                name="api_key"
                                                type="api_key"
                                                readOnly
                                                value={keysData[index].name}
                                                className="w-full my-1 p-4 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full h-auto">
                                            <p className="my-2">API Secret</p>
                                            <input
                                                id="api_secret"
                                                name="api_secret"
                                                type="password"
                                                value="confidential"
                                                readOnly
                                                className="w-full my-1 p-4 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full relative bg-gray-50 border-t flex py-6 pl-8 items-center rounded-b-lg">
                                    <p className="text-gray-400 mr-4">Easily connect these keys to your blankly models</p>
                                    <button className="text-blue-500 ml-4 text-md">How do I use these keys?</button>
                                    <div className="absolute top-3 right-2 mr-4">
                                        <BlackButton>
                                            Edit Key Details
                                        </BlackButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

Keys.getLayout = function getLayout(page: ReactElement) {
    return <BlackTotalNavLayout border={true}>{page}</BlackTotalNavLayout>;
};

export default Keys;
