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

import {getPrice, getTime, lookupOrderType, roundByExchange} from "@/libs/trade-utils";
import {getPrimaryColor} from "@/utils/general";


const setSingleShape = (tvWidget: any, trades: any, symbol: string) => {
  for (const i in trades) {
    if (trades[i].symbol == symbol) {
      if (lookupOrderType(trades[i].type) == 'Spot Market' || (lookupOrderType(trades[i].type) == 'Spot Limit' && trades[i].executed_time == undefined)) {
        if (trades[i].side == "sell") {
          tvWidget.activeChart().createExecutionShape()
            .setText(lookupOrderType(trades[i].type) + " SELL @ " + roundByExchange(getPrice(trades[i]), trades[i].symbol) + ", Size: " + trades[i].size)
            .setTextColor("#EC368D")
            .setArrowColor("#EC368D")
            .setDirection("sell")
            .setFont("bold 15pt helvetica")
            // .setArrowHeight(Math.random() * 50)
            .setArrowSpacing(5)
            .setTime(getTime(trades[i]))
            .setPrice(getPrice(trades[i]));
        } else {
          tvWidget.activeChart().createExecutionShape()
            .setText(lookupOrderType(trades[i].type) + " BUY @ " + roundByExchange(getPrice(trades[i]), trades[i].symbol) + ", Size: " + trades[i].size)
            .setTextColor("#30BBFE")
            .setArrowColor("#30BBFE")
            .setDirection("buy")
            // .setArrowHeight(Math.random() * 50 + 15)
            .setFont("bold 15pt helvetica")
            .setArrowSpacing(5)
            .setTime(getTime(trades[i]))
            .setPrice(getPrice(trades[i]));
        }
      } else if (lookupOrderType(trades[i].type) == 'Spot Limit') {
        const startDate = trades[i].time
        const endDate = trades[i].executed_time ? trades[i].executed_time : Date.now() / 1000

        tvWidget.activeChart().createMultipointShape(
          [{time: startDate, price: Number(trades[i].price)}, {time: endDate, price: Number(trades[i].price)}],
          {
            lock: true,
            disableSelection: true,
            disableUndo: true,
            text: "limit",
            shape: "trend_line",
          }
        )

        if (trades[i].side == "sell" && trades[i].status == "done") {
          tvWidget.activeChart().createExecutionShape()
            .setText(lookupOrderType(trades[i].type) + " SELL @ " + roundByExchange(getPrice(trades[i]), trades[i].symbol) + ", Size: " + trades[i].size)
            .setTextColor("#EC368D")
            .setArrowColor("#EC368D00")
            .setDirection("sell")
            .setFont("bold 15pt helvetica")
            .setArrowHeight(50)
            .setArrowSpacing(5)
            .setTime(trades[i].executed_time)
            .setPrice(Number(trades[i].price));
        } else if (trades[i].side == "buy" && trades[i].status == "done") {
          tvWidget.activeChart().createExecutionShape()
            .setText(lookupOrderType(trades[i]) + " BUY @ " + roundByExchange(getPrice(trades[i]), trades[i].symbol) + ", Size: " + trades[i].size)
            .setTextColor("#30BBFE")
            .setArrowColor("#30BBFE00")
            .setDirection("buy")
            .setArrowHeight(50)
            .setFont("bold 15pt helvetica")
            .setArrowSpacing(5)
            .setTime(trades[i].executed_time)
            .setPrice(Number(trades[i].price));
        }
      }
    }
  }
}

const setMultiShape = (tvWidget: any, trades: any, symbol: string) => {
  for (const i in trades) {
    if (trades[i].symbol == symbol) {
      if (lookupOrderType(trades[i].type) == 'Spot Limit') {
        const startDate = trades[i].time
        const endDate = trades[i].executed_time ? trades[i].executed_time : Date.now() / 1000

        tvWidget.activeChart().createMultipointShape(
          [{time: startDate, price: Number(trades[i].price)}, {time: endDate, price: Number(trades[i].price)}],
          {
            lock: true,
            disableSelection: true,
            disableUndo: true,
            text: "limit",
            shape: "arrow",
          }
        )

        if (trades[i].side == "sell" && trades[i].status == "done") {
          tvWidget.activeChart().createExecutionShape()
            .setText(lookupOrderType(trades[i].type) + " SELL @ " + roundByExchange(getPrice(trades[i]), trades[i].symbol) + ", Size: " + trades[i].size)
            .setTextColor(getPrimaryColor(trades[i].index))
            .setArrowColor(getPrimaryColor(trades[i].index))
            .setDirection("sell")
            .setFont("bold 15pt helvetica")
            .setArrowHeight(50)
            .setArrowSpacing(5)
            .setTime(trades[i].executed_time)
            .setPrice(Number(trades[i].price));
        } else if (trades[i].side == "buy" && trades[i].status == "done") {
          tvWidget.activeChart().createExecutionShape()
            .setText(lookupOrderType(trades[i]) + " BUY @ " + roundByExchange(getPrice(trades[i]), trades[i].symbol) + ", Size: " + trades[i].size)
            .setTextColor(getPrimaryColor(trades[i].index))
            .setArrowColor(getPrimaryColor(trades[i].index))
            .setDirection("buy")
            .setArrowHeight(50)
            .setFont("bold 15pt helvetica")
            .setArrowSpacing(5)
            .setTime(trades[i].executed_time)
            .setPrice(Number(trades[i].price));
        }

      } else {
        if (trades[i].side == "sell") {
          tvWidget.activeChart().createExecutionShape()
            .setText("Size: " + trades[i].size + " " + lookupOrderType(trades[i].type) + " SELL @ " + getPrice(trades[i]))
            .setTextColor(getPrimaryColor(trades[i].index))
            .setArrowColor(getPrimaryColor(trades[i].index))
            .setDirection("sell")
            .setFont("bold 15pt helvetica")
            // .setArrowHeight(Math.random() * 50)
            .setArrowSpacing(5)
            .setTime(getTime(trades[i]))
            .setPrice(getPrice(trades[i]));
        } else {
          tvWidget.activeChart().createExecutionShape()
            .setText(lookupOrderType(trades[i]) + " BUY @ " + getPrice(trades[i].type) + ", Size: " + trades[i].size)
            .setTextColor(getPrimaryColor(trades[i].index))
            .setArrowColor(getPrimaryColor(trades[i].index))
            .setDirection("buy")
            // .setArrowHeight(Math.random() * 50 + 15)
            .setFont("bold 15pt helvetica")
            .setArrowSpacing(5)
            .setTime(getTime(trades[i]))
            .setPrice(getPrice(trades[i]));
        }
      }
    }
  }
}

export {setSingleShape, setMultiShape}
