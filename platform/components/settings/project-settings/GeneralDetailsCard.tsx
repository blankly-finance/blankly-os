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
import SuccessAlert from "@/components/general/alerts/SuccessAlert";
import {getProjectOnce, updateProject} from "@/services/projects-store";
import {useFormik} from "formik";
import {useEffect, useState} from "react";

const validate = (values: any) => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'Name is Required';
  }
  if (!values.desc) {
    errors.desc = 'Description is Required';
  }
  return errors;
};

const GeneralDetailsCard = ({ id }: { id: string }) => {
  const [submitted, setSubmit] = useState(false);
  const [project, setProject] = useState();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const formik = useFormik({
    initialValues: {
      name,
      desc,
    },
    validateOnBlur: true,
    validate,
    onSubmit: (values) => {
      updateProject(id, {
        name: values.name,
        description: values.desc,
      })
      setSubmit(true);
    },
  });

  useEffect(() => {
    getProjectOnce(id).then((res) => {
      const data = res.data();
      setProject(data as any);
      if (data) {
        formik.values.name = data.name;
        formik.values.desc = data.description;
        setName(data.name)
        setDesc(data.description)
      }
    })
  }, [id])

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col w-full h-full items-center justify-start mt-8">
        <div className="h-fit w-full relative bg-white rounded-lg border border-gray-200 mb-8">
          <div className="p-8 mb-16">
            <h1 className="my-4 text-2xl inconsolata font-bold text-black">
              General Details
            </h1>
            <p className="my-2 text-gray-400">
              Project Name and ID are used to identify your project in the dashboard, CLI,
              and the API along with your deployments
            </p>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Project Name
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
                  className="appearance-none block w-3/5 px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="desc"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="desc"
                  name="desc"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.desc}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            {
              submitted ?
                (
                  <SuccessAlert message="Succesfully updated project details" />
                )
                : null
            }
            {formik.errors && formik.touched.name && formik.touched.desc ?
              <ErrorAlert errors={[formik.errors.name, formik.errors.desc]} /> : null}
          </div>
          <div
            className="absolute w-full rounded-b-lg h-16 bottom-0 bg-gray-100 flex flex-row justify-between px-8 items-center">
            <p className="text-gray-400 text-sm">Learn more about <a href="blankly-platform-open-source-main/components/settings/project-settings#" className="text-blue-500">Project Name
              and ID</a></p>
            <button type="submit"
              className="text-white bg-black hover:bg-gray-800 rounded-md py-2 text-sm px-8">Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default GeneralDetailsCard;
