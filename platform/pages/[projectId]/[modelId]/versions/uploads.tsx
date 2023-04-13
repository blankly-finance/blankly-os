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

import {useAuth} from "@/libs/auth";
import {useRouter} from "next/router";

import ModelLayout from "@/components/layouts/ModelNavLayout";
import React, {ReactElement, useEffect, useState} from "react";
import Image from "next/image";
import {DotsVerticalIcon} from "@heroicons/react/solid";
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";
import MediumBlackButton from "@/components/general/buttons/MediumBlackButton";

const profile = "https://source.unsplash.com/random";

const backtests = [
  {
    version: "a234234-jasdf-bfan125-asdf23",
    status: "Uploaded",
    runtime: "1m 22s",
    description: "This is the new version with model updates",
    uploadLoc: "Uploaded from CLI",
    time: "3h",
    user: "bfan1256",
  },
];

const UploadsAll = () => {
  const {user, loading, signout} = useAuth();
  const router = useRouter();

  var [backtestDisplay, setBacktestDisplay] = useState([...backtests]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin");
      }
    }
  });
  return (
    <div className="h-auto">
      <div className="max-w-6xl mx-auto py-8 bg-white">
        <div className="pt-2 flex">
          <div className="w-2/5 flex">
            <div className="w-3/4">
              <h1 className="text-3xl font-semibold text-gray-900 pt-2 roboto">
                Model Uploads
              </h1>

              <div className="w-max roboto text-sm mt-3 text-gray-400">
                Last Backtest: adsfkjdljfkdf, 3h ago <br/>
                Ran by: [profile pic]
              </div>
            </div>
          </div>
          <div className="w-3/5 text-right mt-8 space-x-2">
            <MediumOutlineButton>
              View Model Uploads
            </MediumOutlineButton>
            <MediumBlackButton>
              Revert to Old Version
            </MediumBlackButton>
          </div>
        </div>
        <div className="pt-20">
          <div className="flex flex-col roboto">
            <div className="-my-2 overflow-x-autosm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-8">
                <div className="overflow-hidden border border-gray-200 sm:rounded-md">
                  <table className="min-w-full divide-y  px-4 divide-gray-200">
                    {backtestDisplay.length > 0 ? (
                      <tbody className="bg-white divide-y divide-gray-200">
                      {backtestDisplay.map((backtest) => (
                        <tr key={backtest.version}>
                          <td className="pl-5 pr-3 py-4 whitespace-nowrap">
                            <div className="font-semibold text-sm text-gray-900">
                              {backtest.version}
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {backtest.status}
                            </div>
                            <div className="text-sm text-gray-500">
                              {backtest.runtime}
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-900 max-w-sm">
                              {backtest.description}
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <div className="text-sm text-gray-500 max-w-sm">
                                {backtest.time} ago by {backtest.user}
                              </div>
                              <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative  ml-2">
                                <Image
                                  layout="fill"
                                  objectFit="cover"
                                  src={profile}
                                  alt="Profile Photo"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-500 max-w-sm">
                              <button>
                                <DotsVerticalIcon className="text-black w-4 h-4"/>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    ) : (
                      ""
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UploadsAll.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};

export default UploadsAll;
