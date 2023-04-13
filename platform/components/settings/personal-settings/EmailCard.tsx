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
import {useEffect, useState} from "react";
import {User} from '@/types/user';
import {firebase} from "@/libs/firebase";
import {getUserOnce, updateUser} from '@/services/user-store';

const validate = (values: any) => {
  const errors: any = {};

  if (!values.email) {
    errors.email = 'Email is Required';
  }

  return errors;
};

const EmailCard = (props: { user: User }) => {
  const [submitted, setSubmit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [email, setEmail] = useState("");
  const id = props.user?.uid;

  async function getUser() {
    const user = await getUserOnce(id);
    const data = user.data() as User;

    if (data) {
      formik.values.email = data.email;
      setEmail(data.email);
    }
  }

  useEffect(() => {
    getUser();
  }, [id])

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnBlur: true,
    validate,
    onSubmit: (values) => {
      setSubmit(true);
      updateUser(id, { email: values.email })
      firebase.auth().currentUser?.updateEmail(values.email).then(() => {
        setUpdated(true)
      })
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col w-full h-full items-center justify-start mt-8">
        <div className="h-fit w-full relative bg-white rounded-lg border border-gray-200 mb-8">
          <div className="p-8 mb-16">
            <h1 className="mb-6 text-2xl font-medium text-black">
              Your Email
            </h1>
            <div className="mt-4">
              <p className="block mb-2 text-sm text-gray-400 font-medium">Email address used to login to Blankly</p>
              <label
                htmlFor="email"
                className="block text-sm my-4 font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                  className="appearance-none block w-3/5 px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          {formik.errors && formik.touched.email ?
            <ErrorAlert errors={[formik.errors.email]}/> : null}
          { updated && <p>Your email was successfully updated</p> }
          <div
            className="absolute w-full rounded-b-lg h-16 bottom-0 bg-gray-100 flex flex-row justify-between px-8 items-center">
            <p className="text-gray-400">An email will be sent for verification</p>
            <button type="submit"
                    className="text-white bg-black hover:bg-gray-800 rounded-md py-2 text-sm px-8">Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EmailCard;
