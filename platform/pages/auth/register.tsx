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

import Image from "next/image";
import BlanklyWhite from "@/public/blankly-white.svg";
import Background from "@/public/background.svg";
import Link from "next/link";
import FacebookButton from "@/components/auth/buttons/FacebookButton";
import GithubButton from "@/components/auth/buttons/GithubButton";
import GoogleButton from "@/components/auth/buttons/GoogleButton";
import SignUpForm from "@/components/auth/forms/SignUpForm";
import {useRouter} from "next/router";

const Register = () => {
  const router = useRouter();
  let redirectUrl = router.query.redirectUrl;

  if (!redirectUrl) {
    redirectUrl = '/dashboard';
  }
  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden bg-gray-900 sm:flex flex-col items-end justify-start text-white relative w-0 flex-1">
        <div className="ml-20 xl:mt-20 mt-18">
          <Image
            width={165}
            height={165}
            src={BlanklyWhite}
            alt="Blankly Black SVG"
          />
          <div className="mt-0">
            <h1 className="inconsolata text-green-400 font-bold text-4xl">
              Deploy live in seconds
            </h1>
            <p className="mt-3 text-md w-3/4">
              New updates are instantly pushed to our deployment engines.
            </p>
          </div>
          <div className="mt-7">
            <h1 className="inconsolata text-green-400 font-bold text-4xl">
              Backtests in the cloud
            </h1>
            <p className="mt-3 text-md w-3/4">
              Store all your model history and backtests in the cloud for better
              feedback and better models. Get backtesting metrics all out of the box and add your own too.
            </p>
          </div>
          <div className="mt-7">
            <h1 className="inconsolata text-green-400 font-bold text-4xl">
              Security at heart
            </h1>
            <p className="mt-3 text-md w-3/4">
              Your code and resources are yours. No one else can touch them.{" "}
            </p>
          </div>
          <div className="absolute bottom-0 right-0">
            <Image width={500} height={500} src={Background} alt="coins"/>
          </div>
        </div>
      </div>
      <div className="flex-1 w-6/12 flex flex-col items-start justify-center py-12 px-4 sm:px-6 lg:flex-none">
        <div className="mx-auto sm:mx-20 w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Let&apos;s help you better build trading algorithms fast
            </h2>
          </div>

          <div className="mt-8">
            <div className="mt-6 sm:mx-auto sm:w-full">
              <div className="bg-white py-8">
                <div className="flex flex-col space-y-3">
                  <div>
                    <GithubButton redirect={redirectUrl} location='Sign Up'/>
                  </div>

                  <div>
                    <GoogleButton redirect={redirectUrl} location='Sign Up'/>
                  </div>

                  <div>
                    <FacebookButton redirect={redirectUrl} location='Sign Up'/>
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
                  <SignUpForm redirect={redirectUrl as string}/>
                  <p className="text-xs text-gray-500 mt-5">By creating an account, you agree to our <a
                    className="text-blue-500" target="_blank" rel="noreferrer" href="https://blankly.finance/terms">Terms
                    of Service</a> and <a className="text-blue-500" target="_blank" rel="noreferrer"
                                          href="https://blankly.finance/privacy-policy">Privacy Policy</a></p>
                  <p className="mt-7 text-center text-sm text-gray-600">
                    <Link href={`/auth/signin?redirectUrl=${redirectUrl}`}>
                      <a href="blankly-platform-open-source-main/pages/auth#" className="font-medium text-blue-600 hover:text-blue-500">
                        Already have an account? Sign In
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
