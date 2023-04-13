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

import React, {useCallback, useState} from "react";
import {useRouter} from "next/router";
import {Model} from "@/types/model";
import ModelCard from "@/components/project/details/ModelCard";
import NoModelNameModal from "@/components/general/modals/NoModelNameModal";
import GitCLIModal from "./modals/GitCLIModal";

function DetailsBody(props: any) {
  const models = props.models;
  const projectId = props.projectId;
  const router = useRouter();
  const [currentModel, setCurrentModel] = useState('');
  const [openModelNameUpdate, setModelNameUpdate] = useState(false);

  const openModelIfName = useCallback((model: Model) => {
    if (model.lifecycleStatus?.message === 'Awaiting Setup') {
      router.push(`/${projectId}/${model.id}/onboarding`);
    } else if (model.name) {
      router.push(`/${projectId}/${model.id}/overview`);
    } else {
      setModelNameUpdate(true);
      setCurrentModel(model.id);
    }
  }, [projectId, router])

  return (
    <>
      {
        models?.length === 0 ?
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row max-w-xl items-center justify-center h-fit">
              <div className="h-auto mt-20">
                <GitCLIModal/>

              </div>
            </div>
            <p className="my-8 text-gray-500">Check out our documentation on our recommendations to <a href="blankly-platform-open-source-main/components/project/details"
                                                                                                       className="text-blue-500">get
              started</a></p>
          </div>
          :
          <div className="max-w-6xl mx-auto pb-12 z-10">
            <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6 sm:mt-8">
              {models?.map((model: any, index: number) => {
                return (
                  <div
                    className="cursor-pointer flex flex-col"
                    key={model.id}
                    onClick={() => openModelIfName(model)}
                  >
                    <div className="flex-1">
                      <ModelCard
                        key={model.id}
                        version={model.deployedVersion}
                        name={model.name}
                        id={model.id}
                        desc={model.description}
                        exchanges={model.exchanges}
                        tickers={model.tickers}
                        status={model.lifecycleStatus}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <NoModelNameModal projectId={projectId as string} open={openModelNameUpdate} id={currentModel}
                              close={() => {
                                setModelNameUpdate(false)
                              }}/>
          </div>

      }
    </>
  )
}

export default DetailsBody
