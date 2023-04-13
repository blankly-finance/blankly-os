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

import Alpaca from '@/public/logos/alpaca-logo.svg';
import Coinbase from '@/public/logos/coinbase-icon.svg';
import Binance from '@/public/logos/binance-logo.svg';
import Oanda from '@/public/logos/oanda-icon.svg';
import FTX from '@/public/logos/ftx-icon.svg';
import Kucoin from '@/public/logos/kucoin-icon.svg';
import Image from 'next/image';

function getExchangeIcon(exchange: string) {
  switch (exchange) {
    case 'alpaca': {
      return <Image objectFit="cover" layout="fill" alt="Alpaca" src={Alpaca}/>;
    }
    case 'coinbase_pro': {
      return <Image objectFit="cover" layout="fill" alt="Coinbase" src={Coinbase}/>;

    }
    case 'binance': {
      return <Image objectFit="cover" layout="fill" alt="Binance" src={Binance}/>;

    }
    case 'oanda': {
      return <Image objectFit="cover" layout="fill" alt="Oanda" src={Oanda}/>;
    }
    case 'ftx': {
      return <Image objectFit="cover" layout="fill" alt="ftx" src={FTX}/>;
    }
    case 'kucoin': {
      return <Image objectFit="cover" layout="fill" alt="kucoin" src={Kucoin}/>;
    }
  }
}

const ExchangeIcons = (props: { exchanges: string[] }) => {
  const exchanges = props.exchanges;
  return (
    <div className="space-x-2 flex items-center">
      {
        exchanges?.map((exchange) => {
          return (
            <div className="w-5 h-5 relative" key={exchange}>
              {getExchangeIcon(exchange)}
            </div>
          )
        })
      }
    </div>
  );
}

export default ExchangeIcons;
