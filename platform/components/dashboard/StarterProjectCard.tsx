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

import Image from 'next/image';
import AlpacaLogo from "@/public/logos/alpaca-logo.svg"
import BinanceLogo from "@/public/logos/binance-logo.svg"
import {useState} from "react";
import NotFinishedModal from "@/components/general/modals/NotFinishedModal";

const StarterProjectCard = () => {
  const [isModal, setModal] = useState(false);
  return (
    <div>
      <div
        className="cursor-pointer hover:shadow-md hover:ring-1 hover:ring-gray-300 transition-all bg-white flex flex-col rounded-lg shadow px-8 py-4 m-1"
        onClick={() => setModal(true)}>
        <div className="flex flex-row my-2 justify-between">
          <p className="font-semibold inconsolata text-xl">RSI Bot Project</p>
          <span
            className="inline-flex items-center px-2.5 py-0.5 -mr-4 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Momentum
                </span>
        </div>
        <div className="flex flex-row my-2 justify-between items-center">
          <div className="flex flex-row justify-evenly items-center">
            <p className="mr-5 text-sm">Exchanges:</p>
            <Image src={AlpacaLogo} width="25" height="25" alt="alpaca logo"/>
            <div className="mr-1"/>
            <Image src={BinanceLogo} width="25" height="25" alt="binance logo"/>
          </div>

          <p className="font-semibold text-blue-600 text-lg">1 Strategy, 2 Signals</p>
        </div>
        <div className="flex flex-row mt-1 justify-between items-center">
          <p className="text-sm">Symbols: &nbsp; ARK,SPY,USACAD</p>
          <p className="text-xs text-gray-400">Used by 3K Members</p>
        </div>
      </div>
      <NotFinishedModal open={isModal} close={() => setModal(false)}
                        featureName={"starter-project"} type={"feature"}/>
    </div>

  )

}

export default StarterProjectCard;
