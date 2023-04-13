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
    errors.name = 'Team Name is Required';
  }
  return errors;
};

const GeneralDetailsCard = () => {
  const [submitted, setSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validateOnBlur: true,
    validate,
    onSubmit: (values) => {
      setSubmit(true);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="h-fit mt-10 flex-1 relative bg-white rounded-lg border border-gray-200 mb-8">
        <div className="p-8 mb-16 w-full">
          <h1 className="my-2 text-2xl inconsolata font-bold text-black">
            General Details
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
                onChange={formik.handleChange}
                value={formik.values.name}
                required
                className="appearance-none block w-3/5 px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        {formik.errors && formik.touched.name && formik.touched.description ?
          <ErrorAlert errors={[formik.errors.name, formik.errors.description]} /> : null}
        <div
          className="absolute w-full rounded-b-lg h-16 bottom-0 bg-gray-100 flex flex-row justify-between px-8 items-center">
          <p className="text-gray-400 text-sm">Please use max 48 characters</p>
          <button type="submit"
            className="text-white bg-black hover:bg-gray-800 rounded-md py-2 text-sm px-8">Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default GeneralDetailsCard;
