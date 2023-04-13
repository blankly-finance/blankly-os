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

import BorderedNavLayout from "@/components/layouts/BorderedNavLayout";
import StarterModelForm from "@/components/starter-models/StarterModelForm";
import React, {ReactElement} from "react";

const Setup = () => {

  return (
    <div className="py-12 mt-6 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="text-center text-4xl font-extrabold text-gray-900">
          Submit a Starter Model
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg">
        <StarterModelForm />
      </div>
    </div>
  );
};

Setup.getLayout = function getLayout(page: ReactElement) {
  return <BorderedNavLayout>{page}</BorderedNavLayout>;
};

export default Setup;
