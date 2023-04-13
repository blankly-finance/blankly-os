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

import React from "react";
import {useRouter} from "next/router";
import ModelEntry from "../ModelEntry";

export default function ModelsToBacktestTable() {
  const router = useRouter();
  const {ids} = router.query;
  let dersionIds = ids as string[];
  if (typeof ids === "string") {
    dersionIds = [ids];
  }

  return (
    <div className="flex flex-col roboto">
      <div className="-my-2 overflow-x-autosm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-8">
          <div className="overflow-hidden border border-gray-200 sm:rounded-md">
            <table className="min-w-full divide-y  px-4 divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
              {dersionIds?.map((id) => (
                <ModelEntry id={id} key={id}/>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
