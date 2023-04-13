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

import {getPrice, getTime, lookupOrderType} from "@/libs/trade-utils";
import {getPrimaryColor} from "@/utils/general";
import {processEpoch} from "@/utils/date";

const createDisplay = (label: string, value: number, time: number, pre?: string) => {
  const displayValue = pre == '$' ? value.toLocaleString('en-US') : value
  const dateStr = processEpoch(time)

  return '<div class="text-xl mb-.5">' + label + '</div>' +
    '<div class="text-lg mb-.5">'
    + pre + displayValue
    + '</div>' +
    '<div>' + dateStr + '</div>'
}

const processData = (data: any, symbol: string | undefined) => {
  if (data && data.accountValue && symbol) {
    let trades = data.trades
    let pos = 0
    let positions: any = []

    let startTime = data.startTime
    let stopTime = data.stopTime
    let count = 0
    while (startTime < stopTime && count < trades.length) {
      let trade = trades[count]
      while (count < trades.length && startTime >= trade.time && startTime <= trade.time + 3600 * 24) {
        if (trade.symbol == symbol) {
          if (trade.side == "buy") {
            pos += trade.size
          } else if (trade.side == "sell") {
            pos -= trade.size
          }
        }
        count++;
        if (count < trades.length) {
          trade = data.trades[count]
        }
      }
      positions.push({time: startTime, value: pos})
      startTime += 3600 * 24
    }
    return positions
  } else if (data && data.accountValues && symbol) {
    let trades = data.trades

    if (!trades?.length) {
      return
    }

    let pos: any = []
    let positions: any = []

    for (let i = 0; i < data.backtestIds.length; ++i) {
      pos.push(0)
      positions.push([])
    }

    let startTime = data.startTime
    let stopTime = data.stopTime
    let count = 0

    while (startTime < stopTime && count < trades.length) {
      let trade = trades[count]
      while (count < trades.length && startTime >= trade.time && startTime <= trade.time + 3600 * 24) {
        if (trade.symbol == symbol) {
          if (trade.side == "buy") {
            pos[trade.index] += trade.size
          } else if (trade.side == "sell") {
            pos[trade.index] -= trade.size
          }
        }
        count++;
        if (count < trades.length) {
          trade = data.trades[count]
        }
      }

      for (let i = 0; i < data.backtestIds.length; ++i) {
        positions[i].push({time: startTime, value: pos[trade.index]})
      }
      startTime += 3600 * 24
    }
    return positions
  } else {
    return data?.accountValue ? data.accountValue : data?.accountValues
  }
}

const getSingleMarker = (trades: any, symbol: string) => {
  let markers: any = []
  for (const i in trades) {
    if (trades[i].symbol == symbol) {
      if (trades[i].side == "buy") {
        markers.push({
          time: getTime(trades[i]),
          position: 'belowBar',
          color: '#2196F3',
          shape: 'arrowUp',
          // text: lookupOrderType(trades[i]) + ' Buy @ ' + roundByExchange(getPrice(trades[i]), trades[i].symbol)
        })
      } else {
        markers.push({
          time: getTime(trades[i]),
          position: 'aboveBar',
          color: '#e91e63',
          shape: 'arrowDown',
          // text: lookupOrderType(trades[i]) + ' Sell @ ' + roundByExchange(getPrice(trades[i]), trades[i].symbol)
        })
      }
    }
  }
  return markers
}

const getMultiMarker = (trades: any, symbol: string) => {
  let markers: any = []
  for (const i in trades) {
    if (trades[i].symbol == symbol) {
      if (trades[i].side == "buy") {
        markers.push({
          time: getTime(trades[i]),
          position: 'belowBar',
          color: getPrimaryColor(trades[i].index),
          shape: 'arrowUp',
          text: lookupOrderType(trades[i]) + ' Buy @ ' + getPrice(trades[i])
        })
      } else {
        markers.push({
          time: getTime(trades[i]),
          position: 'aboveBar',
          color: getPrimaryColor(trades[i].index),
          shape: 'arrowDown',
          text: lookupOrderType(trades[i]) + ' Sell @ ' + getPrice(trades[i])
        })
      }
    }
  }
  return markers
}

export {createDisplay, processData, getSingleMarker, getMultiMarker}
