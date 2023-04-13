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

import ErrorAlert from "@/components/general/alerts/ErrorAlert";
import {useFormik} from "formik";
import {User} from '@/types/user';
import {updateUser} from '@/services/user-store';
import {useEffect, useState} from "react";
import SuccessAlert from "@/components/general/alerts/SuccessAlert";
import {useAuth} from "@/libs/auth";

const validate = (values: any) => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'Name is Required';
  }
  if (values.name.length > 48) {
    errors.nameLen = 'Please Use a Max of 48 Characters'
  }
  return errors;
};

const NameCard = (props: { user: User }) => {
  const [submitted, setSubmit] = useState(false);
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const id = props.user?.uid;
  const {updateFirebaseUser} = useAuth();

  const formik = useFormik({
    initialValues: {
      name: username,
      bio,
    },
    validateOnBlur: true,
    validate,
    onSubmit: (values) => {
      updateFirebaseUser(values.name);
      updateUser(id, {
        firstName: values.name.split(' ')[0] ? values.name.split(' ')[0] : "",
        lastName: values.name.split(' ')[1] ? values.name.split(' ')[1] : "",
        bio: values.bio ? values.bio : "",
      })
      setSubmit(true);
    },
  });

  useEffect(() => {
    if (props.user) {
      formik.values.name = props.user.firstName && props.user.lastName ? `${props.user.firstName} ${props.user.lastName}` : props.user.firstName ? `${props.user.firstName}` : "Unknown";
      setUserName(`${props.user.firstName} ${props.user.lastName}`)
      formik.values.bio = props.user.bio
      setBio(props.user.bio)
    }
  }, [props.user])

  return (
    <form onSubmit={formik.handleSubmit}>

      <div className="flex flex-col w-full h-full items-center justify-start mt-8">

        <div className="h-fit w-full relative bg-white rounded-lg border border-gray-200 mb-8">
          <div className="p-8 mb-16">

            <h1 className="mb-6 text-2xl inconsolata font-bold text-black">
              Your Name
            </h1>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  required
                  className="appearance-none block w-3/5 px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.bio}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              {
                submitted ?
                  (
                    <SuccessAlert message="Succesfully updated details"/>
                  )
                  : null
              }
            </div>
          </div>

          {formik.errors && formik.touched.name ?
            <ErrorAlert errors={[formik.errors.name]}/> : null}
          <div
            className="absolute w-full rounded-b-lg h-16 bottom-0 bg-gray-100 flex flex-row justify-between px-8 items-center">
            <p className="text-gray-400 text-sm">Please use a max of 48 characters</p>
            <button type="submit"
                    className="text-white bg-black hover:bg-gray-800 rounded-md py-2 text-sm px-8">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default NameCard;
