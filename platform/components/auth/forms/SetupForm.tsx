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

import {useAuth} from '@/libs/auth';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import FileUpload from '../../general/FileUpload';
import ErrorAlert from '../../general/alerts/ErrorAlert';
import {uploadFile} from '@/libs/storage';
import SuccessAlert from '../../general/alerts/SuccessAlert';
import {updateUser} from '@/services/user-store';
import {isPhone} from "@/utils/general";
import { firebase } from '@/libs/firebase';


const validate = (values: any) => {
  const errors: any = {};

  if (values.firstName.length > 20) {
    errors.firstName = 'First Name must be 15 characters or less';
  }

  if (values.lastName.length > 20) {
    errors.lastName = 'Last Name must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (values.phone) {
    if (!isPhone(values.phone)) {
      errors.phone = 'Invalid phone number'
    }
  }

  return errors;
};


const SetupForm = () => {
  const {uid, user, loading, token, updateFirebaseUser} = useAuth();
  const [values, setValues] = useState(false);
  const [originalEmail, setOriginalEmail] = useState('');
  const [success, setSuccessAlert] = useState(false);
  const [profile, setProfile] = useState('/default-profile.png');
  const [finished, setFinished] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      bio: '',
    },
    validate,
    onSubmit: async (values) => {

      setFinished(true);
      if (profile !== '/default-profile.png') {
        updateFirebaseUser(`${values.firstName} ${values.lastName}`, profile)
      } else {
        updateFirebaseUser(`${values.firstName} ${values.lastName}`)
      }
      updateUser(uid, values);
      if (originalEmail !== values.email) {
        firebase.auth().currentUser?.updateEmail(values.email)
      }
      router.push(`/${uid}`)
    },
  });

  const uploadProfileImage = async (uid: string, data: FileList) => {
    setSuccessAlert(false);
    const file = data[0];
    const extension = /\.[0-9a-z]+$/i;
    const extensionName = file.name.match(extension);
    if (extensionName) {
      const result = await uploadFile(`/USERS/${uid}/profile${extensionName}`, file);
      const url = await result.ref.getDownloadURL();
      await updateUser(uid, {profileUrl: url});
      setProfile(url);
      setSuccessAlert(true);
    }
  }

  useEffect(() => {
    if (user)
      if (!values) {
        setValues(true);
        formik.values.email = user.email;
        setOriginalEmail(user.email);
        formik.values.phone = user.phone;
        formik.values.firstName = user.firstName;
        formik.values.lastName = user.lastName;
        formik.values.bio = user.bio;
        if (user.profileUrl) {
          setProfile(user.profileUrl);
        }
      }
  }, [loading, user, router, values, formik.values])


  return (
    <div>
      {success ? <SuccessAlert message="Successfully Uploaded Profile Image"/> : null}
      {formik.errors && formik.touched.lastName && formik.touched.email && formik.touched.firstName && formik.touched.bio && formik.touched.phone ?
        <ErrorAlert
          errors={[formik.errors.email, formik.errors.firstName, formik.errors.lastName, formik.errors.phone]}/> : null}
      <div className="pt-5">
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700 text-center">
          Your Profile Picture
        </label>
        <div className="my-5">
          <div className="flex flex-col items-center justify-center">
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img className="h-14 w-14 rounded-full object-cover" src={profile} alt="Profile Photo"/>
            }
            <FileUpload label="Upload Image" onChange={(e) => uploadProfileImage(user.uid, e)}
                        uploadFileName="profile" acceptedFileTypes="image/*"/>
          </div>
        </div>
      </div>
      <form className="space-y-6 mt-4" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <div className="mt-1">
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                required
                autoComplete="given-name"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div className="mt-1">
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                autoComplete="family-name"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              autoComplete="email"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number (Optional)
          </label>
          <div className="mt-1">
            <input
              id="phone"
              name="phone"
              type="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm disabled:opacity-50"
              autoComplete="phone"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <div className="mt-1">
            <textarea
              id="bio"
              name="bio"
              onChange={formik.handleChange}
              value={formik.values.bio}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={finished}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-green-300 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {finished ? (
            <svg className="animate-spin mt-1 h-5 w-5 text-white-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle className="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-100" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>) : "Finish"
          }
        </button>
      </form>
    </div>
  );
}

SetupForm.defaultProps = {
  redirect: '/dashboard'
};

export default SetupForm;
