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
import VersionTable from "@/components/project/versions/tables/VersionTable";
import {getModelSubscription} from "@/services/models-store";
import {Model} from "@/types/model";
import {getVersions} from "@/services/version-store";
import dynamic from "next/dynamic";
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";
import Breadcrumbs from "@/components/project/general/Breadcrumbs";

const VersionTableLoading = dynamic(() => import("@/components/project/versions/loading-states/VersionTableLoading"), {
  ssr: false,
});


function findValueById(value: string, arr: Model[]) {
  return arr.filter((entry) => entry.id == value)[0];
}

function getAllNonCurrentIds(value: string, arr: Model[]) {
  return arr.filter((entry) => entry.id !== value);
}

const VersionsAll = () => {
  const {user, loading} = useAuth();
  const router = useRouter();
  const [currentDeployedId, setCurrentDeployedId] = useState('');
  const [versions, setVersions] = useState<any>([]);
  const [limit, setLimit] = useState(20);
  const [status, setCurrentStatus] = useState<any>();
  const [versionsLoading, setVersionsLoading]: any[] = useState(true);
  const {projectId, modelId} = router.query;

  useEffect(() => {
    const unsubscribe = getModelSubscription(projectId as string, modelId as string).onSnapshot((doc) => {
      const data = doc.data() as any;
      setCurrentDeployedId(data.deployedVersion);
      setCurrentStatus(data.lifecycleStatus);
    }, (e: any) => {
      router.push('/dashboard')
    })
    return () => unsubscribe();
  }, [projectId, modelId, router])

  useEffect(() => {
    const unsubscribe = getVersions(projectId as string, modelId as string, limit).onSnapshot((query) => {
      const versions = query.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      });
      setVersions(versions);
      setTimeout(() => {
        setVersionsLoading(false);
      }, 200);
    }, (e: any) => {
      router.push('/dashboard')
    })
    return () => unsubscribe();
  }, [projectId, modelId, limit, router]);


  return (
    <div className="h-auto pb-24">
      <div className="max-w-6xl mx-auto py-10 bg-white p-5 sm:px-0">
        <Breadcrumbs location={"versions"}/>
        <div className="flex">
          <div className="w-3/5 md:w-2/5 flex">
            <div>
              <h1 className="text-2xl md:text-3xl mt-5 sm:mt-0 font-semibold text-gray-900 roboto">
                Your Versions & Uploads
              </h1>
              <p className="text-sm text-gray-400 mt-2">Versions are any models that you have uploaded or deployed</p>
            </div>
          </div>
        </div>
        <div className="pt-12">
          <div className="flex flex-col roboto">

            {
              currentDeployedId && status?.running ? (
                <div>
                  <div className="text-2xl roboto font-semibold my-4">
                    Currently Deployed Model
                  </div>
                  <div className="-my-2 overflow-x-scroll scrollbar-hide sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-8">
                      {
                        versionsLoading ?
                          <VersionTableLoading num="1"/> :
                          <VersionTable isCurrentversion={true}
                                        status={status}
                                        versions={[findValueById(currentDeployedId, versions)]}
                                        currentDeployment={currentDeployedId}
                          />
                      }
                    </div>
                  </div>
                </div>
              ) : null
            }

            <div className="text-2xl roboto font-semibold my-4 mt-8">
              Past Versions & Uploads
            </div>
            <div className="-my-2 overflow-x-auto scrollbar-hide sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-8">
                {
                  versionsLoading ? <VersionTableLoading num="5"/>
                    : (
                      <VersionTable isCurrentDeployment={false}
                                    versions={getAllNonCurrentIds(currentDeployedId, versions)}
                                    currentDeployment={currentDeployedId}/>
                    )
                }
              </div>
              {
                versions.length === limit ?
                  (<div className="sm:px-3 lg:px-8 mt-4">
                    <MediumOutlineButton click={() => setLimit(limit + 10)}>
                      Load More
                    </MediumOutlineButton>
                  </div>) : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

VersionsAll.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};

export default VersionsAll;
