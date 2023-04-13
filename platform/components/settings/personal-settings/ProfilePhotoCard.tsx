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

import { useState } from "react";
import RoundedProfileIcon from '@/components/general/profile/RoundedProfileIcon';
import { uploadFile } from "@/libs/storage";
import { updateUser } from "@/services/user-store";
import FileUpload from "@/components/general/FileUpload";
import { useAuth } from "@/libs/auth";
import {User} from "@/types/user"

const ProfilePhotoCard = (props: { user: User }) => {
  const [success, setSuccessAlert] = useState(false);
  const [profile, setProfile] = useState('/default-profile.png');
  const {updateFirebaseUser} = useAuth();
  const user = props.user;

  const uploadProfileImage = async (uid: string, data: FileList) => {
    setSuccessAlert(false);
    const file = data[0];
    const extension = /\.[0-9a-z]+$/i;
    const extensionName = file.name.match(extension);
    if (extensionName) {
      const result = await uploadFile(`/users/${uid}/profile${extensionName}`, file);
      const url = await result.ref.getDownloadURL();
      updateFirebaseUser(undefined, profile)
      await updateUser(uid, { profileUrl: url });
      setProfile(url);
      setSuccessAlert(true);
    }
  }

  return (
    <div className="flex flex-col w-full h-fit items-center justify-start mt-8">
      <div className="h-fit w-full relative bg-white rounded-lg border border-gray-200 mb-8">
        <div className="p-8 mb-16 relative">
          <h1 className="mb-6 text-2xl font-medium text-black">
            Your Profile Photo
          </h1>
          <div className="mt-4">
            <div
              className="block text-gray-700"
            >
              Upload a new profile photo so others can know who you are
            </div>
          </div>
          <div className="h-24 w-24 absolute top-6 right-16">
            <RoundedProfileIcon id={user?.uid} />
          </div>

        </div>
        <div
          className="absolute w-full rounded-b-lg h-16 bottom-0 bg-gray-100 flex flex-row justify-between px-8 items-center">
          <p className="text-gray-400">We recommend you have a profile photo</p>
          <div className="-mt-3">
            <FileUpload label="Upload New Image" onChange={(e) => uploadProfileImage(user.uid, e)}
              uploadFileName="profile" acceptedFileTypes="image/*" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePhotoCard;
