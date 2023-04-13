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

import { useCallback, useState } from "react";

const GeneralModelDetails = (props: any) => {
  const [name, setName] = useState(props.name ? props.name : "");
  const [desc, setDesc] = useState(props.desc ? props.desc : "");

  const handleBlur = useCallback((key: string, e: any) => {
    if (e && e.target) {
      props.update({ [key]: e.target.value });
    }
  }, [props])

  return (
    <div className="container shadow-lg w-full h-auto bg-white rounded-lg py-8 px-10">
      {
        props.first ? (
          <h1 className="text-2xl font-semibold">Your First Model Details</h1>
        ) : (<h1 className="text-2xl font-semibold">General Model Details</h1>)
      }
      {
        props.first ? (
          <p className="text-gray-400 mt-2 text-sm">Your model is your trading algorithm</p>
        ) : null
      }
      <a href="https://blankly.finance/links/pNZXjBH6cAREZGsc9" target="_blank" rel="noreferrer" className="block my-2 text-sm text-blue-500">See a Demo Model <span aria-hidden>&rarr;</span></a>
      <div>
        <p className="roboto text-sm mt-4 text-gray-700">Model Name</p>
        <input
          onBlur={(e) => handleBlur('name', e)}
          type="text"
          name="modelName"
          placeholder={"i.e. Crypto Grid Trading Bot"}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleBlur('name', e)
          }}
          id="modelName"
          className=" focus:ring-gray-700 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md mt-2"
          autoComplete="off"
        />
      </div>
      <div>
        <p className="roboto text-sm mt-4 text-gray-700 mb-2">Description</p>
        <textarea
          onBlur={(e) => handleBlur('description', e)}
          id="about"
          name="about"
          placeholder={"ex. This utilizes a grid based strategy to identify support and resistance levels for trading"}
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
            handleBlur('description', e)
          }}
          rows={4}
          className="w-full block focus:ring-gray-700 focus:border-gray-700 sm:text-sm border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
}

export default GeneralModelDetails;
