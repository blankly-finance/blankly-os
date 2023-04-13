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

// import {IBasicDataFeed} from "@/public/static/charting_library";
// import {
//   ErrorCallback,
//   HistoryCallback,
//   LibrarySymbolInfo,
//   OnReadyCallback,
//   PeriodParams,
//   ResolutionString,
//   ResolveCallback,
//   SearchSymbolsCallback,
//   SubscribeBarsCallback,
//   SymbolResolveExtension
// } from "@/public/static/charting_library/datafeed-api";
// import axios from "axios";
// import json from "json5";
//
// class Datafeed implements IBasicDataFeed {
//   private exchange: string;
//   private tickers: string[];
//   private flag: boolean;
//   private cancelToken: any;
//
//
//   private resolutions: any = ["1", "5", "15", "30", "60", "240", "1D"];
//
//   constructor(exchange: string, tickers: string[], cancelToken: any) {
//     this.exchange = exchange;
//     this.tickers = tickers;
//     this.flag = false;
//     this.cancelToken = cancelToken;
//   }
//
//   onReady(callback: OnReadyCallback): void {
//     // prepare the graph for the specific exchange
//     let data: any = {};
//     const upperCase = this.exchange.charAt(0).toUpperCase() + this.exchange.slice(1);
//
//     data["exchanges"] = [{value: this.exchange, name: upperCase, desc: upperCase + " API Brokerage"}];
//     data["supported_resolutions"] = this.resolutions;
//     data["units"] = {currency: [{id: "usd", name: 'USD', description: 'United States Dollar'}]};
//     data["currency_codes"] = ["USD"];
//     data["symbols_types"] = []; // modify this to support symbol types in the future
//     // handle symbol types through ticker keys? (this is stocks/index label)
//     setTimeout(() => {
//       callback({
//         exchanges: data.exchanges,
//         supported_resolutions: data.supported_resolutions,
//         units: data.units,
//         currency_codes: data.currency_codes,
//         supports_marks: true,
//         supports_time: true,
//         supports_timescale_marks: false,
//         symbols_types: data.symbols_types,
//       });
//     }, 0)
//   }
//
//   searchSymbols(userInput: string, exchange: string, symbolType: string, onResult: SearchSymbolsCallback): void {
//     // get array of all elements that start with user input
//     userInput = userInput.toUpperCase();
//     const results = this.tickers.filter((ticker) => ticker.startsWith(userInput));
//
//     // format the result to be returned
//     const returnResult = results.map((entry) => {
//       return {
//         symbol: entry,
//         full_name: entry,
//         description: entry,
//         exchange: this.exchange,
//         ticker: entry,
//         type: "", // modify this in the future if we have the result
//       }
//     })
//
//     onResult(returnResult);
//   }
//
//   getBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, periodParams: PeriodParams, onResult: HistoryCallback, onError: ErrorCallback): void {
//     // get bars
//     const instance = axios.create({
//       baseURL: `${process.env.NEXT_PUBLIC_URL_CONNECT_API}`
//     });
//     const resValue = this.resolutionToSeconds(resolution);
//     let dataReq = {
//       exchange: this.exchange,
//       command: "get_product_history",
//       args: {
//         symbol: symbolInfo.name,
//         epoch_start: periodParams.from,
//         epoch_stop: periodParams.to,
//         resolution: resValue,
//       }
//     }
//
//     instance.post('/', dataReq, {cancelToken: this.cancelToken}).then((response: { data: { result: string; }; }) => {
//       let result = json.parse(response.data.result)
//       let data = []
//       let points = Object.keys(result['time']).length
//       for (let i = 0; i < points; i++) {
//         if (result['volume']) {
//           data.push({
//             time: result['time'][i] * 1000,
//             open: result['open'][i],
//             high: result['high'][i],
//             low: result['low'][i],
//             close: result['close'][i],
//             volume: result['volume'][i],
//           })
//         } else {
//           data.push({
//             time: result['time'][i] * 1000,
//             open: result['open'][i],
//             high: result['high'][i],
//             low: result['low'][i],
//             close: result['close'][i],
//           })
//         }
//       }
//       onResult(data);
//     })
//   }
//
//   resolveSymbol(symbolName: string, onResolve: ResolveCallback, onError: ErrorCallback, extension: SymbolResolveExtension | undefined): void {
//     const resolutions = this.resolutions;
//     if (this.exchange === "alpaca") {
//       setTimeout(() => {
//         onResolve({
//           name: symbolName,
//           full_name: symbolName,
//           ticker: symbolName,
//           description: symbolName,
//           type: "stock",
//           session: "0930-1600",
//           exchange: this.exchange,
//           has_intraday: true,
//           intraday_multipliers: ['1', '15', '30'],
//           listed_exchange: this.exchange,
//           timezone: "America/New_York",
//           format: "price",
//           pricescale: .2,
//           minmov: .01,
//           supported_resolutions: resolutions as ResolutionString[],
//         })
//       }, 0)
//     } else if (this.exchange === "oanda") {
//       setTimeout(() => {
//         onResolve({
//           name: symbolName,
//           full_name: symbolName,
//           ticker: symbolName,
//           description: symbolName,
//           type: "forex",
//           session: "0000-0000",
//           exchange: this.exchange,
//           has_intraday: true,
//           listed_exchange: this.exchange,
//           timezone: "America/New_York",
//           format: "price",
//           pricescale: .2,
//           minmov: .01,
//           supported_resolutions: resolutions as ResolutionString[],
//         })
//       }, 0)
//     } else {
//       setTimeout(() => {
//         onResolve({
//           name: symbolName,
//           full_name: symbolName,
//           ticker: symbolName,
//           description: symbolName,
//           type: "crypto",
//           session: "24x7",
//           exchange: this.exchange,
//           has_intraday: true,
//           listed_exchange: this.exchange,
//           timezone: "America/New_York",
//           format: "price",
//           pricescale: .2,
//           minmov: .01,
//           supported_resolutions: resolutions as ResolutionString[],
//         })
//       }, 0)
//     }
//   }
//
//   subscribeBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, onTick: SubscribeBarsCallback, listenerGuid: string, onResetCacheNeededCallback: () => void): void {
//     // not needed
//   }
//
//   unsubscribeBars(listenerGuid: string): void {
//     this.flag = true;
//   }
//
//   private resolutionToSeconds(resolution: ResolutionString) {
//     if (resolution === "1D") {
//       return 86400
//     } else if (resolution === "1W") {
//       return 604800
//     } else if (resolution === "1M") {
//       return 2592000
//     } else if (resolution === "15s") {
//       return 15
//     }
//     return parseInt(resolution) * 60
//   }
// }
//
// export default Datafeed;

export {}