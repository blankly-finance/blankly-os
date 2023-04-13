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

import LastDeployed from "@/components/project/versions/LastDeployed";
import {getModelOnce} from "@/services/models-store";
import ModelLayout from "@/components/layouts/ModelNavLayout";
import {useRouter} from "next/router";
import {ReactElement, useEffect, useState} from "react";

const Analytics = () => {
  const [model, setModel] = useState<any>({});
  const router = useRouter();
  const {projectId, modelId} = router.query;

  useEffect(() => {
    getModelOnce(projectId as string, modelId as string).then(
      (query) => {
        const mod = {...query.data()};
        setModel(mod);
      }
    );
  }, [projectId, modelId]);
  return (
    <div>
      <div className="py-10 bg-white">
        <div className="pt-4 flex max-w-6xl mx-auto">
          <div>
            <div className="flex items-center">
              <h1 className="text-3xl font-medium text-gray-900 roboto">
                Function Analytics
              </h1>
            </div>
            <LastDeployed id={projectId as string} modelId={modelId as string}
                          deployedVersionId={model?.deployedVersion}/>
          </div>
        </div>
      </div>
    </div>

  );
}

Analytics.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};


export default Analytics;
