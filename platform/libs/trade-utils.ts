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

function lookupOrderType(type: string) {
  const lookup: any = {
    'market': 'Spot Market',
    'limit': 'Spot Limit',
    'spot-market': 'Spot Market',
    'spot_market': 'Spot Market',
    'spot-limit': 'Spot Limit',
    'spot_limit': 'Spot Limit',
    'margin-market': 'Margin Market',
    'margin_market': 'Margin Market',
    'margin-limit': 'Margin Limit',
    'margin_limit': 'Margin Limit',
    'spot-stop': 'Spot Stop Loss',
    'spot_stop': 'Spot Stop Loss'
  }
  if (type) {
    return lookup[type];
  }
  return lookup['market'];
}

function getTime(trade: any) {
  if (trade?.created_at) {
    return trade?.created_at
  } else {
    return trade?.time;
  }
}

function getPrice(trade: any) {
  if (trade?.executed_price) {
    return Number(trade.executed_price)
  } else if (trade?.price) {
    return Number(trade.price)
  } else {
    return 0
  }
}

function roundByExchange(number: any, symbol: string) {
  if (symbol.indexOf('-') !== -1) {
    return parseFloat(number).toFixed(4)
  }
  return parseFloat(number).toFixed(2)
}

export {
  lookupOrderType,
  getTime,
  roundByExchange,
  getPrice
}
