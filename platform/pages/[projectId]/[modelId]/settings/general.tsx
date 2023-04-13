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
import GeneralDetailsCard from "@/components/settings/model-settings/GeneralDetailsCard";
import {useRouter} from "next/router";
import ModelSettingsLayout from "@/components/layouts/ModelSettingsLayout";
import ModelIDCard from "@/components/settings/model-settings/ModelIDCard";

function General() {
  const router = useRouter();
  const {projectId, modelId} = router.query;
  return (
    <div className="mt-12 pb-20">
      <GeneralDetailsCard projectId={projectId as string} modelId={modelId as string}/>
      <ModelIDCard id={modelId as string}/>
    </div>
  )
}

General.getLayout = function getLayout(page: ReactElement) {
  return <ModelSettingsLayout>{page}</ModelSettingsLayout>;
};

export default General
