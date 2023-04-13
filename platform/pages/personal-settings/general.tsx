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
import PersonalSettingsLayout from "@/components/layouts/PersonalSettingsLayout";
import NameCard from "@/components/settings/personal-settings/NameCard";
import EmailCard from "@/components/settings/personal-settings/EmailCard";
import ProfilePhotoCard from "@/components/settings/personal-settings/ProfilePhotoCard";
import DeleteAccountCard from "@/components/settings/personal-settings/DeleteAccountCard";
import IDCard from "@/components/settings/personal-settings/IDCard";
import {useAuth} from "@/libs/auth";


function General() {
  const {user} = useAuth();

  return (
    <div className="w-full h-fit">
      <NameCard user={user}/>
      <ProfilePhotoCard user={user}/>
      <EmailCard user={user}/>
      <IDCard user={user}/>
      <DeleteAccountCard/>
    </div>
  )
}

General.getLayout = function getLayout(page: ReactElement) {
  return <PersonalSettingsLayout>{page}</PersonalSettingsLayout>;
};

export default General;
