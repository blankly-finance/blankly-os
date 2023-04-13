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

import {ReactElement, useEffect, useState} from "react";
import ModelLayout from "@/components/layouts/ModelNavLayout";
import Status from "@/components/project/general/Status";
import {useRouter} from "next/router";
import {getModelOnce} from "@/services/models-store";
import LastDeployed from "@/components/project/versions/LastDeployed";
import BlackButton from "@/components/general/buttons/BlackButton";
import OutlineButton from "@/components/general/buttons/OutlineButton";
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("@/components/project/container-usage/graph/UsageGraphs"), {
  ssr: false,
})

const cpuData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "April", "May", "Jun"],
  datasets: [
    {
      label: "CPU Usage Over Time",
      data: [90, 12, 85, 21, 105, 12, 90, 12, 85, 21, 105, 12, 90, 12, 85, 21, 105, 12],
      fill: false,
      backgroundColor: "#0000CC",
      borderColor: "#0000CC"
    },
  ]
};

const ramData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "April", "May", "Jun"],
  datasets: [
    {
      label: "RAM Usage Over Time",
      data: [90, 12, 85, 21, 105, 12, 90, 12, 85, 21, 105, 12, 90, 12, 85, 21, 105, 12],
      fill: false,
      backgroundColor: "#0000CC",
      borderColor: "#0000CC"
    },
  ]
};

const storageData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "April", "May", "Jun"],
  datasets: [
    {
      label: "Storage Usage Over Time",
      data: [90, 12, 85, 21, 105, 12, 90, 12, 85, 21, 105, 12, 90, 12, 85, 21, 105, 12],
      fill: false,
      backgroundColor: "#0000CC",
      borderColor: "#0000CC"
    },
  ]
};

function Usage() {
  const router = useRouter();
  const {modelId, projectId} = router.query;
  const [model, setModel] = useState<any>();

  useEffect(() => {
    getModelOnce(projectId as string, modelId as string).then(
      (query) => {
        const mod = {...query.data()};
        setModel(mod);
      }
    );
  }, [projectId, modelId]);

  return (
    <div className="h-fit md:mx-auto mx-8 max-w-6xl pt-10">
      <div className="w-100 rounded-lg bg-red-500 h-fit p-4 mb-4">
        <p className="text-white flex flex-row items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"/>
          </svg>
          This is just a static page at the moment! We&apos;re working on flushing this feature to get it out to you!
          {/*&nbsp;*/}
          {/*Your container is being overutilized and can lead to container failure,&nbsp;*/}
          {/*<a href="#"><p className="font-bold">add more computing resources</p></a>&nbsp;to keep it up and*/}
          {/*running*/}
        </p>
      </div>
      <div className="w-full h-fit flex md:flex-row flex-col md:items-center md:justify-between justify-start">
        <div className="flex flex-col items-start">
          <p className="text-gray-500 text-sm mb-2"><a
            onClick={() => router.push(`/${projectId}/${modelId}/live`)}
            className="text-blue-600 cursor-pointer">Live</a> / <a className="text-blue-600 cursor-pointer"
                                                                   onClick={() => router.push(`/${projectId}/${modelId}/live/log`)}>Live
            Deployment Logs</a> / Container Usage
          </p>
          <div className="flex items-center">
            <h1 className="text-3xl font-semibold text-gray-900 roboto">
              Container Usage
            </h1>
            <div className="ml-8">
              <Status status="Running" time="4:59:32"/>
            </div>
          </div>
          <LastDeployed id={projectId as string} modelId={modelId as string}
                        deployedVersionId={model?.deployedVersion}/>
        </div>
        <div className="md:text-right text-left mt-8">
          <div className="space-x-2">
            <OutlineButton additionalClasses={"w-28 sm:w-60"}>
              Stop Container
            </OutlineButton>
            <BlackButton additionalClasses={"w-36 sm:w-60"}>
              Add Blankly Automation™
            </BlackButton>
          </div>
        </div>
      </div>
      <div className="w-full mt-8 h-fit flex sm:flex-row flex-col justify-between">
        <div className="w-2/4 flex flex-col items-start">
          <div className="flex flex-row w-fit justify-between">
            <p className="text-xl inconsolata font-semibold mr-2">CPU Utilization:</p>
            <p className="text-xl inconsolata font-semibold text-blue-500">0%</p>
          </div>
          <div className="flex flex-row w-fit justify-between">
            <p className="text-xl inconsolata font-semibold mr-2">RAM Utilization:</p>
            <p className="text-xl inconsolata font-semibold text-blue-500">0%</p>
          </div>
          <div className="flex flex-row w-fit justify-between">
            <p className="text-xl inconsolata font-semibold mr-2">Storage Utilization:</p>
            <p className="text-xl inconsolata font-semibold text-blue-500">0%</p>
          </div>
          <a href="[projectId]/[modelId]/live#"><p className="text-sm text-blue-500 mt-4">What&apos;s a good utilization rate?</p></a>
        </div>
        <h1 className="text-2xl font-semibold text-left my-2">Estimated Hosting Costs: <span
          className="text-blue-600">$00.00</span></h1>
      </div>
      <h2 className="text-2xl font-semibold mt-12">CPU Usage Over Time</h2>
      <LineChart cpuData={cpuData}/>
      <h2 className="text-2xl font-semibold mt-12">RAM Usage Over Time</h2>
      <LineChart ramData={ramData}/>
      <h2 className="text-2xl font-semibold mt-12">Storage Usage Over Time</h2>
      <LineChart cpuData={cpuData} ramData={ramData}/>
    </div>
  )
}

Usage.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};

export default Usage
