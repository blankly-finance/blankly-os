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

import {processEpoch} from "@/utils/date";

const Logs = (props: any) => {
  return (
    <div className="mx-auto">
      <div className="mx-auto bg-white">
        <div className="bg-gray-50 pb-24 border-t min-h-screen">
          <div className="text-md pt-8 inconsolata">
            {
              props.logs.length === 0 ? (
                <div className="max-w-6xl mx-auto text-gray-500">
                  No logs were given...
                </div>
              ) : null
            }
            {props.logs?.map((entry: any) => {
              if (entry.type == "stdout") {
                return (
                  <div key={entry.time} className="bg-gray-50">
                    <div
                      className="max-w-7xl mx-auto flex flex-col md:flex-row justify-start text-gray-700 px-4 py-1"
                    >
                      <span className="mr-8 text-gray-400 md:text-gray-700 md:w-52 tracking-tight">{processEpoch(entry.time, "")}</span>
                      <p className="whitespace-pre-wrap flex-1 break-words">{entry.msg}</p>
                    </div>
                  </div>
                );
              } else if (entry.type == "warning" || (entry.msg && entry.msg.indexOf("WARNING") >= 0)) {
                return (
                  <div key={entry.time} className="bg-yellow-100 h-fit">
                    <div
                      className="max-w-7xl mx-auto flex h-fit flex-col md:flex-row justify-start text-yellow-600 px-4 py-2"
                    >
                      <span className="mr-8 md:w-52 text-yellow-400 md:text-yellow-600 tracking-tight">{processEpoch(entry.time, "")}</span>
                      <p className="whitespace-pre-wrap flex-1 break-words">{entry.msg}</p>
                    </div>
                  </div>
                );
              } else if (entry.type == "stderr") {
                return (
                  <div key={entry.time} className="bg-red-200">
                    <div
                      className="max-w-7xl mx-auto flex flex-col md:flex-row justify-start text-red-600 px-4 py-2"
                    >
                      <span className="mr-8 md:w-52 text-red-400 md:text-red-600 tracking-tight">{processEpoch(entry.time, "")}</span>
                      <p className="whitespace-pre-wrap flex-1 break-words">{entry.msg}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Logs;
