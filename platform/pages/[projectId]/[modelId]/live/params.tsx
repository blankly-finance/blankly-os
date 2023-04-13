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

import {ReactElement} from "react";
import ModelLayout from "@/components/layouts/ModelNavLayout";
import ParamExpand from "@/components/project/live/ParamExpand";
import {PlusIcon} from "@heroicons/react/solid";
import OutlineButton from "@/components/general/buttons/OutlineButton";
import BlackButton from "@/components/general/buttons/BlackButton";
import Breadcrumbs from "@/components/project/general/Breadcrumbs";

const Params = () => {
  return (
    <div className="h-auto">
      <div className="max-w-6xl mx-auto h-auto bg-white py-10 pb-24">
        <Breadcrumbs location='params' />
        <div className="pt-4 flex">
          <div className="w-1/3">
            <h1 className="text-3xl font-semibold text-gray-900 roboto">
              Live Parameter Updates
            </h1>
            <p className="roboto text-sm text-gray-400 mt-2">
              Last Deployment: a23-basdf234, 3h ago
            </p>
            <div className="w-max">
              <p className="roboto text-sm text-gray-400 mt-2 inline">
                Ran By: [profile pic]
              </p>
            </div>
            <button className="roboto text-sm text-blue-700 mt-3">
              What even are live parameter updates?
            </button>
          </div>
          <div className="w-2/3 text-right mt-4">
            <div className="space-x-2">
              <OutlineButton>
                View Documentation
              </OutlineButton>
              <BlackButton>
                <div className="flex">
                  Create New Config
                  <span className="ml-5 w-5 h-5"><PlusIcon /></span>
                </div>
              </BlackButton>
            </div>
          </div>
        </div>
        <p className="text-red-500 my-5 font-semibold">Note: This is still in beta and not functional. We are actively working on this...</p>
        <div className="mt-8">
          <h1 className="text-2xl font-semibold roboto">
            Currently Deployed Parameters
          </h1>
          <div className="mt-4">
            <ParamExpand />
          </div>
        </div>
        <div className="mt-16">
          <div className="flex">
            <h1 className="text-2xl font-semibold roboto">
              All Parameter Configurations
            </h1>
          </div>
          <div>
            <ParamExpand />
            <ParamExpand />
            <ParamExpand />
            <ParamExpand />
          </div>
        </div>
      </div>
    </div>
  )
}

Params.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};

export default Params
