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

import {useCallback, useState} from "react";

const TickerAndAmt = (props: any) => {
  const [ticker, setTicker] = useState('');
  const [asset, setAsset] = useState('');
  const handleBlur = useCallback((e: any) => {
    if (e && e.target) {
      props.update({[ticker]: asset});
    }
  }, [props, ticker, asset])
  return (
    <div className="grid grid-cols-4 space-x-2 mt-4">
      <input
        id="ticker"
        name="ticker"
        type="text"
        onBlur={(e) => {
          setTicker(e.target.value);
          handleBlur(e)
        }}
        onChange={(e) => {
          setTicker(e.target.value);
          handleBlur(e)
        }}
        placeholder="An Asset Ticker"
        className="col-span-2 appearance-none block px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <input
        id="amount"
        name="amount"
        type="number"
        placeholder="Amount of Asset"
        onBlur={(e) => {
          setAsset(e.target.value);
          handleBlur(e)
        }}
        onChange={(e) => {
          setAsset(e.target.value);
          handleBlur(e)
        }}
        autoComplete="amount"
        className="appearance-none block px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
}

export default TickerAndAmt;
