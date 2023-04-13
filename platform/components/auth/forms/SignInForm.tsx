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

import {useFormik} from 'formik';
import {useState} from 'react';
import ErrorAlert from '../../general/alerts/ErrorAlert';
import AuthErrorAlert from '../alerts/AuthErrorAlert';
import {useAuth} from "@/libs/auth";
import ConfirmationAlert from "@/components/auth/alerts/ConfirmationAlert";

const validate = (values: { email: string, password: string }) => {
  const errors: any = {};

  if (!values.password) {
    errors.password = 'Password is Required';
  }
  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(values.email)) {
    errors.email = 'Invalid Email Address';
  }
  return errors;
};

const SignInForm = (props: any) => {
  const {signinWithEmailPassword, resetPassword} = useAuth();
  const [hasAuthError, setHasAuthError] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnBlur: true,
    validate,
    onSubmit: (values) => {
      signinWithEmailPassword(values.email, values.password, props.redirect).catch((error: any) => {
        setHasAuthError(true);
      });
    },
  });

  const [confirmation, setConfirmation] = useState(false)
  const sendResetPassword = () => {
    resetPassword(formik.values.email).then((res: any) => {
      setConfirmation(true)
    }, (e: any) => {
      setConfirmation(true)
    })
  }

  return (
    <div>
      {hasAuthError ? <AuthErrorAlert error={"Invalid Email and/or Password"}/> : null}
      {formik.errors && formik.touched.email && formik.touched.password ?
        <ErrorAlert errors={[formik.errors.email, formik.errors.password]}/> : null}
      {
        confirmation ?
          <ConfirmationAlert
            message={"A password reset link has been sent to your email address if your account exists"}/> : null
      }
      <form className="space-y-6 mt-4" onSubmit={formik.handleSubmit}>
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
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <div
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              onClick={() => sendResetPassword()}
            >
              Forgot your password?
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-green-300 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
