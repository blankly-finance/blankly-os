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

import FacebookButton from "@/components/auth/buttons/FacebookButton";
import GithubButton from "@/components/auth/buttons/GithubButton";
import GoogleButton from "@/components/auth/buttons/GoogleButton";
import SignInForm from "@/components/auth/forms/SignInForm";
import BorderedNavLayout from "@/components/layouts/BorderedNavLayout";
import {ReactElement} from "react";
import Link from 'next/link';
import {useRouter} from "next/router";

const SignIn = () => {
  const router = useRouter();
  let redirectUrl = router.query.redirectUrl;
  if (!redirectUrl) {
    redirectUrl = '/dashboard';
  }

  return (
    <div className="py-12 mt-6 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-5xl font-extrabold text-gray-900">
          Sign in to Blankly
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:px-10">
          <div className="flex flex-col space-y-3">
            <div>
              <GithubButton redirect={redirectUrl} location='Sign In'/>
            </div>

            <div>
              <GoogleButton redirect={redirectUrl} location='Sign In'/>
            </div>

            <div>
              <FacebookButton redirect={redirectUrl} location='Sign In'/>
            </div>
          </div>
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"/>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <SignInForm redirect={redirectUrl}/>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-600">
        <Link href={`/auth/register?redirectUrl=${redirectUrl}`}>
          <a href="blankly-platform-open-source-main/pages/auth#" className="font-medium text-blue-600 hover:text-blue-500">
            Don&apos;t have an account? Sign Up
          </a>
        </Link>
      </p>
      <div className="mt-12 max-w-xs mx-auto flex justify-center">
        <a
          href="https://blankly.finance/links/43Qch43oZHWx1YEM8"
          className="
            block
            rounded-md
            flex-1
            border border-transparent
            px-5
            py-3
            bg-gray-900
            text-base
            font-medium
            text-white
            shadow-xl
            hover:bg-black
            focus:outline-none
            focus:ring-2
            focus:ring-gray-500
            focus:ring-offset-2
            sm:px-10
          "
        >
          See a Demo Model <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

    </div>
  );
};

SignIn.getLayout = function getLayout(page: ReactElement) {
  return (
    <BorderedNavLayout>
      {page}
    </BorderedNavLayout>
  )
}

export default SignIn;
