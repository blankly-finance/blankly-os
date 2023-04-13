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

import {splitAndCapitalize} from "@/utils/general";
import {useEffect, useState} from "react";

const processStatus = (statusMessage: string) => {
  let dictionary: any = {
    'Awaiting Setup': (
      <div className="flex mt-.5 items-center">
        <div className="w-5/6 text-left mr-2">
          <div className="text-sm font-semibold text-yellow-400">Awaiting Setup</div>
        </div>
        <div className="relative inline-flex">
          <span className="flex">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
          </span>
        </div>
      </div>
    ),
    'Monitoring Active': (
      <div className="flex mt-.5 items-center">
        <div className="w-5/6 text-left mr-2">
          <div className="text-sm font-semibold text-blue-500">Running</div>
        </div>
        <div className="relative inline-flex">
          <span className="flex">
            <span
              className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </div>
      </div>
    ),
    'Deploying': (
      <div className="flex mt-.5 items-center">
        <div className="w-5/6 text-left mr-2">
          <div className="text-sm font-semibold text-gray-500">Deploying</div>
        </div>
        <div className="relative inline-flex">
          <span className="flex">
            <span
              className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
          </span>
        </div>
      </div>
    ),
    'Started': (
      <div className="flex mt-.5 items-center">
        <div className="w-5/6 text-left mr-2">
          <div className="text-sm font-semibold text-gray-500">Started</div>
        </div>
        <div className="relative inline-flex">
          <span className="flex">
            <span
              className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
          </span>
        </div>
      </div>
    ),
    'Installing Dependencies': (
      <div className="flex mt-.5 items-center">
        <div className="w-5/6 text-left mr-2">
          <div className="text-sm font-semibold text-gray-500">Building</div>
        </div>
        <div className="relative inline-flex">
          <span className="flex">
            <span
              className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
          </span>
        </div>
      </div>
    ),
    'Process Exited': (
      <div className="flex mt-.5 items-center">
        <div className="w-5/6 text-left mr-2">
          <div className="text-sm font-semibold text-green-300">Completed</div>
        </div>
        <div className="relative inline-flex">
          <span className="flex">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-300"></span>
          </span>
        </div>
      </div>
    ),
    'Exited': (
      <div className="flex mt-.5 items-center">
        <div className="w-5/6 text-left mr-2">
          <div className="text-sm font-semibold text-green-300">Manually Exited</div>
        </div>
        <div className="relative inline-flex">
          <span className="flex">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-300"></span>
          </span>
        </div>
      </div>
    ),
    'Not Running': (
      <div className="flex mt-.5 items-center">
        <div className="w-5/6 text-left mr-2">
          <div className="text-sm font-semibold text-gray-500">Not Running</div>
        </div>
        <div className="relative inline-flex">
          <span className="flex">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span>
          </span>
        </div>
      </div>
    ),
    'Unknown': (
      <div className="flex mt-.5 items-center">
        <div className="w-5/6 text-left mr-2">
          <div className="text-sm font-semibold text-gray-500">Not Deployed</div>
        </div>
        <div className="relative inline-flex">
          <span className="flex">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-600"></span>
          </span>
        </div>
      </div>
    ),
  }
  return dictionary[statusMessage];
}

const ModelStatus = (props: any) => {

  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (props.status) {
      if (props.status.message) {
        setStatusMessage(splitAndCapitalize(props.status.message, ' '));
      } else if (props.status.running) {
        setStatusMessage("Monitoring Active")
      } else {
        setStatusMessage("Not Running")
      }

    } else {
      setStatusMessage('Unknown')
    }
  }, [props.status])

  return (
    <div className="px-3 whitespace-nowrap flex justify-start">
      {
        processStatus(statusMessage)
      }
    </div>
  )
}

export default ModelStatus;
