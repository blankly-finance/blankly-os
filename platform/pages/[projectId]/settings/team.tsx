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
import ProjectSettingsLayout from "@/components/layouts/ProjectSettingsLayout";
import {useRouter} from "next/router";
import CurrentCollaboratorsCard from "@/components/settings/project-settings/collaborators/CurrentCollaboratorsCard";
import InviteNewMembersCard from "@/components/settings/project-settings/team/InviteNewMembersCard";

function Advanced() {
  const router = useRouter();
  const {projectId} = router.query;

  return (
    <div className="mt-12 max-w-7xl">
      <h1 className="text-3xl mb-8 font-medium">Team Members</h1>
      <CurrentCollaboratorsCard/>
      <br/>
      <InviteNewMembersCard teamId={projectId as string}/>
    </div>
  )
}

Advanced.getLayout = function getLayout(page: ReactElement) {
  return <ProjectSettingsLayout>{page}</ProjectSettingsLayout>;
};

export default Advanced
