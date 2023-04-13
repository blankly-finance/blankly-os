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

import SetupForm from "@/components/auth/forms/SetupForm";
import BorderedNavLayout from "@/components/layouts/BorderedNavLayout";
import {useAuth} from "@/libs/auth";
import {getProjectsOnce} from "@/services/projects-store";
import {useRouter} from "next/router";
import React, {ReactElement, useEffect, useState} from "react";

const Setup = () => {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState(router.query.redirectUrl)

  const {user, uid} = useAuth();

  const [cid, setCid] = useState("")

  useEffect(() => {
    if (router.query.redirectUrl === "/dashboard" || router.query.redirectUrl === `/${uid}`) {
      getProjectsOnce(uid).then((val) => {
        if (val.docs.length > 0) {
          setRedirectUrl("/create")
        }
      })
    }
  }, [router.query.redirectUrl, uid]);

  return (
    <div className="py-12 mt-6 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-4xl font-extrabold text-gray-900">
          Let&apos;s Finish Setting up Your Account
        </h2>
      </div>
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <SetupForm />
        </div>
    </div>
  );
};

Setup.getLayout = function getLayout(page: ReactElement) {
  return <BorderedNavLayout>{page}</BorderedNavLayout>;
};

export default Setup;
