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

import Image from "next/image";
import VisaLogo from "@/public/logos/cards/visa.png";
import MastercardLogo from "@/public/logos/cards/mastercard.png";
import AmexLogo from "@/public/logos/cards/amex.png";
import DiscoverLogo from "@/public/logos/cards/discover.png";
import DinersLogo from "@/public/logos/cards/diners.png";
import JCBLogo from "@/public/logos/cards/jcb.png";
import UnionPayLogo from "@/public/logos/cards/unionpay.png";
import {XIcon} from "@heroicons/react/solid";
import React from "react";

const CardIcon = (cardType: string) => {
  let logoSrc: any = {
    'visa': VisaLogo,
    'mastercard': MastercardLogo,
    'amex': AmexLogo,
    'discover': DiscoverLogo,
    'jcb': JCBLogo,
    'diners': DinersLogo,
    'unionpay': UnionPayLogo,
  }[cardType];

  if (!logoSrc) {
    return <div>cardType</div>
  }

  return <Image layout="fixed" width="50" height="25" objectFit="cover" src={logoSrc} alt={cardType}/>
}

const CardDisplay = (props: { type: string, method: any, initialMethod: string, updatePayment: Function, detachMethod: Function }) => {
  const method = props.method
  const initialMethod = props.initialMethod

  return (
    <div className="items-center py-2 grid auto-cols-fr grid-flow-col">
      <div className="">
        {CardIcon(method.type)}
      </div>
      <div className="col-span-3">
        {method.type[0].toUpperCase() + method.type.slice(1)} •••• {method.last4Digits}
      </div>
      <div className="col-span-2 justify-self-start">
        {
          method.id === initialMethod ?
            <div className="bg-blue-100 px-2 py-1 text-xs rounded flex items-center text-blue-900">
              {props.type}
            </div>
            :
            <></>
        }
        {
          method.id === initialMethod ?
            <></>
            :
            <button className="border border-gray-200 px-2 py-1 rounded mr-12 text-gray-700 text-xs hover:bg-blue-50"
                    onClick={() => props.updatePayment(method.id)}>
              Set {props.type}
            </button>
        }

      </div>
      <div className="col-span-2 justify-self-start">
        Expires {method.expires}
      </div>
      <div className="justify-self-end">
        {
          method.id === initialMethod ?
            <XIcon className="h-6 w-6 text-gray-500"/>
            :
            <XIcon className="h-6 w-6 cursor-pointer" onClick={() => props.detachMethod(method.id)}/>
        }
      </div>
    </div>
  )
}

export default CardDisplay
