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
import StarterProjectCard from './StarterProjectCard';
import CloudCLIModal from "./modals/CloudCLIModal";

const validate = (values: any) => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'First Name is Required';
  }

  if (!values.description) {
    errors.description = 'Last Name is Required';
  }

  return errors;
};

const NoProjects = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validate,
    onSubmit: async (values) => {
      // TODO
    },
  });
  return (
    <div className="relative flex flex-row items-center justify-evenly h-fit max-w-6xl mx-auto z-10">
      <div className="-mt-16 relative grid grid-cols-2 gap-14">
        <CloudCLIModal/>
        <div className="h-fit bg-gray-50 border-gray-300 border flex flex-col relative z-10 rounded p-8">
          <h3 className="max-w-2xl text-2xl inconsolata font-bold text-black">
            Use a Starter Project
          </h3>
          <div className='mt-5'>
            <StarterProjectCard/>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NoProjects;
