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
import {useState} from "react";

const validate = (values: any) => {
  const errors: any = {};

  if (!values.name) {
    errors.root = 'Password is Required';
  }
  return errors;
};

const RootDirCard = () => {
  const [submitted, setSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      root: '',
    },
    validateOnBlur: true,
    validate,
    onSubmit: (values) => {
      setSubmit(true);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col w-full h-full items-center justify-start mt-8">
        <div className="h-fit w-full relative bg-white rounded-lg border border-gray-200 mb-8">
          <div className="p-8 mb-16">
            <h1 className="my-2 text-2xl inconsolata font-bold text-black">
              Root Directory
            </h1>
            <p className="my-2 text-gray-400">
              The root directory used to house you code. Leave this empty if you don&apos;t have a subdirectory
              or if you&apos;ve explicitly defined a <a href="blankly-platform-open-source-main/components/settings/project-settings#" className="text-red-400">deployments.json</a>
            </p>
            <div className="mt-4">
              <div className="mt-1">
                <input
                  id="root"
                  name="root"
                  type="root"
                  onChange={formik.handleChange}
                  value={formik.values.root}
                  required
                  className="appearance-none block w-3/5 px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-row mt-4 items-center">
              <input className="rounded mx-2" type="checkbox" id="includeSource" name="includeSource"/>
              <p className="text-sm">Include source files outside of the Root Directory during Build</p>
            </div>
          </div>
          {formik.errors && formik.touched.root ? <ErrorAlert errors={[formik.errors.root]}/> : null}
          <div
            className="absolute w-full rounded-b-lg h-16 bottom-0 bg-gray-100 flex flex-row justify-between px-8 items-center">
            <p className="text-gray-400">Learn more about <a href="blankly-platform-open-source-main/components/settings/project-settings#" className="text-blue-600">Root Directory</a></p>
            <button type="submit" className="text-white bg-black hover:bg-gray-800 rounded-md py-2 text-sm px-8">Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RootDirCard;
