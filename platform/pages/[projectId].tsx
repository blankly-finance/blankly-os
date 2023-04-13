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

import {useRouter} from "next/router";
import React, {ReactElement, useEffect, useState} from "react";
import {getModels} from "@/services/models-store";
import DetailLoadingState from "@/components/project/details/loading-state/DetailLoadingState";
import DetailsBody from "@/components/project/details/DetailsBody"
import ProjectDetailsLayout from "@/components/layouts/ProjectDetailsLayout";
import {classNames} from "@/utils/general";
import BlackButton from "@/components/general/buttons/BlackButton";
import OutlineButton from "@/components/general/buttons/OutlineButton";
import {PlusIcon, UsersIcon} from "@heroicons/react/solid";
import Head from "next/head";
import StarterModelsDetails from "@/components/project/details/StarterModelsDetails";
import {BeakerIcon} from "@heroicons/react/outline";
import CompareModelModal from "@/components/project/live/modals/CompareModelModal";

const ProjectDashboard = () => {
  const router = useRouter();
  const {projectId} = router.query;
  const [models, setModels]: any = useState();
  const [loadingModels, setLoadingModels] = useState(true);

  const [compareModels, setCompareModels] = useState(false)

  // get models
  useEffect(() => {
    const unsubscribe = getModels(projectId).onSnapshot((query) => {
      const mods = query.docs.map((doc) => {
        return ({...doc.data(), id: doc.id})
      });
      if (query.docs.length === 0) {
        router.push(`/${projectId}/create`);
      }
      setModels(mods);
      setLoadingModels(false);
    })

    return () => unsubscribe();
  }, [projectId, router]);

  return (
    <div className="h-auto bg-gray-50">
      <Head>
        <title>Your Models 😶</title>
      </Head>
      <div
        className="py-8 px-4 sm:p-0 max-w-6xl mx-auto sm:pt-12 flex flex-col justify-between sm:flex-row items-center">
        <CompareModelModal open={compareModels} close={() => setCompareModels(false)}/>
        <div className="sm:w-auto w-full">
          <p>Current Models: <span className="font-bold text-blue-600">{models?.length}</span></p>
          <h1 className="text-3xl font-semibold mt-4">Your Models</h1>
        </div>
        <div className="sm:w-auto w-full mt-5 sm:mt-0">
          <div className="hidden md:block h-auto space-x-2">
            <OutlineButton click={() => router.push(`/teams/create`)}>
              <div className="flex items-center">
                Form a New Team <UsersIcon className="text-gray-600 w-5 h-5 ml-2"/>
              </div>
            </OutlineButton>
            <OutlineButton click={() => {
              setCompareModels(true)
            }}>
              <div className="flex space-x-2">
                Compare Live Models
                <BeakerIcon className="ml-3 w-5 h-5"/>
              </div>
            </OutlineButton>
            <BlackButton click={() => router.push(`/${projectId}/create`)}>
              <div className="flex text-center items-center">
                Create a New Model <PlusIcon className="w-5 h-5 ml-2"/>
              </div>
            </BlackButton>
          </div>
          <div className="block md:hidden h-auto flex flex-col space-y-2">
            <OutlineButton click={() => {
              router.push(`/teams/create`);
            }}>
              <div className="flex justify-center items-center">
                Form a New Team <UsersIcon className="text-gray-600 w-5 h-5 ml-2"/>
              </div>
            </OutlineButton>
            <OutlineButton click={() => {
              setCompareModels(true)
            }}>
              <div className="flex space-x-2 justify-center text-center">
                Compare Live Models
                <BeakerIcon className="ml-3 w-5 h-5"/>
              </div>
            </OutlineButton>
            <BlackButton click={() => {
              router.push(`/${projectId}/create`);
            }}>
              <div className="flex justify-center items-center">
                Create a New Model <PlusIcon className="w-5 h-5 ml-2"/>
              </div>
            </BlackButton>
          </div>
        </div>
      </div>
      <div className={classNames("sm:mt-0 pb-16 min-h-screen p-5 sm:px-0", models?.length === 0 ? "sm:mt-10" : "")}>
        {
          loadingModels ?
            <DetailLoadingState/>
            :
            <DetailsBody models={models} projectId={projectId}/>
        }
        <hr className="max-w-6xl mx-auto my-4"/>
        <div className="pb-16 max-w-6xl mx-auto flex flex-col justify-between sm:flex-row items-center">
          {
            loadingModels ?
              <DetailLoadingState/>
              :
              <StarterModelsDetails/>
          }
        </div>
      </div>
    </div>
  );
};

ProjectDashboard.getLayout = function getLayout(page: ReactElement) {
  return <ProjectDetailsLayout>{page}</ProjectDetailsLayout>;
};

export default ProjectDashboard;
