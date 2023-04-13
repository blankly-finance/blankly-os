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
import {useState} from 'react';
import ErrorAlert from '../../general/alerts/ErrorAlert';
import AuthErrorAlert from '../alerts/AuthErrorAlert';

const validate = (values: any) => {
  const errors: any = {};

  if (!values.password) {
    errors.password = 'Password is Required';
  }
  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(values.email)) {
    errors.email = 'Invalid Email Address';
  }
  if (!values.confirm) {
    errors.confirm = 'Confirm Password is Required';
  } else if (values.confirm !== values.password) {
    errors.confirm = 'Passwords don\'t match'
  }
  return errors;
};

const SignUpForm = (props: { redirect?: string }) => {
  const {createAccountWithEmailPassword} = useAuth();
  const [hasAuthError, setHasAuthError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [submitted, setSubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm: '',
    },
    validate,
    onSubmit: (values) => {
      setSubmit(true);
      createAccountWithEmailPassword(values.email, values.password, props.redirect).catch((error: any) => {
        setAuthError(error.message);
        setHasAuthError(true);
      })
    },
  });
  return (
    <div>
      {hasAuthError ? <AuthErrorAlert error={authError}/> : null}
      {formik.errors && formik.touched.email && formik.touched.password && formik.touched.confirm
        ? <ErrorAlert errors={[formik.errors.email, formik.errors.password, formik.errors.confirm]}/> : null}
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
              onBlur={formik.handleBlur}
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
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="confirm"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="confirm"
              name="confirm"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-green-300 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
