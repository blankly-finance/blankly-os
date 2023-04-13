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

import {useState} from "react";
import Image from "next/image";
import Gitlab from "@/public/logos/gitlab.svg"
import NotFinishedModal from "@/components/general/modals/NotFinishedModal";

function DeployFromGitModal() {
  const [isGithubOpen, setIsGithubOpen] = useState(false);
  const [isGitlistbOpen, setIsGitlistOpen] = useState(false);
  const [isBitBuckOpen, setIsBitBuckOpen] = useState(false);

  return (
    <div className="container relative flex flex-col p-8 shadow-lg rounded-lg h-auto bg-white">
      <div className="w-3/5 py-2">
        <h2 className="text-2xl inconsolata font-bold">Deploy from Git source repository</h2>
      </div>
      <p className="inconsolate text-gray-500 text-sm w-4/5">
        Easily connect an existing repository and we&apos;ll import the code in
        for you. Check our <a href="blankly-platform-open-source-main/components/project/details/modals" className="text-blue-500 hover:text-blue-600">limits</a> and
        <a href="blankly-platform-open-source-main/components/project/details/modals" className="ml-1 text-blue-500 hover:text-blue-600">fair use policy</a>
      </p>
      <button
        className="w-full relative mt-8 my-1 inline-flex items-center justify-between py-3 px-4 rounded-md bg-black hover:bg-gray-800 text-md text-white"
        onClick={() => setIsGithubOpen(true)}
      >
        <span className="sr-only">Continue with GitHub</span>
        <div>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="flex-1">Continue with GitHub</span>
      </button>
      <button
        className="w-full my-1 relative inline-flex flex flex-row items-center justify-between py-3 px-4 rounded-md  bg-purple-700 hover:bg-purple-800 text-md text-white"
        onClick={() => setIsGitlistOpen(true)}
      >
        <span className="sr-only">Continue with GitLab</span>
        <div className="w-6 h-6">
          <Image
            alt="Gitlab"
            src={Gitlab}
            width={100}
            height={100}
          />
        </div>
        <span className="flex-1">Continue with GitLab</span>
      </button>
      <button
        className="w-full my-1 relative inline-flex justify-between items-center py-3 px-4 rounded-md  bg-blue-700 hover:bg-blue-800 text-md text-white"
        onClick={() => setIsBitBuckOpen(true)}
      >
        <span className="sr-only">Continue with Bitbucket</span>
        <div>
          <svg width="20" height="20" viewBox="-2 -2 65 59">
            <defs>
              <linearGradient x1="104.953%" y1="21.921%" x2="46.569%" y2="75.234%" id="bitbucket-10">
                <stop stopColor="currentColor" stopOpacity=".4" offset="7%"></stop>
                <stop stopColor="currentColor" offset="100%"></stop>
              </linearGradient>
            </defs>
            <path
              d="M59.696 18.86h-18.77l-3.15 18.39h-13L9.426 55.47a2.71 2.71 0 001.75.66h40.74a2 2 0 002-1.68l5.78-35.59z"
              fill="url(#bitbucket-10)" fillRule="nonzero" transform="translate(-.026 .82)"></path>
            <path
              d="M2 .82a2 2 0 00-2 2.32l8.49 51.54a2.7 2.7 0 00.91 1.61 2.71 2.71 0 001.75.66l15.76-18.88H24.7l-3.47-18.39h38.44l2.7-16.53a2 2 0 00-2-2.32L2 .82z"
              fill="currentColor" fillRule="nonzero"></path>
          </svg>
        </div>
        <span className="flex-1">Continue with Bitbucket</span>
      </button>
      <NotFinishedModal open={isGithubOpen} type="feature" close={() => setIsGithubOpen(false)}
                              featureName="deploy-from-github"/>
      <NotFinishedModal open={isGitlistbOpen} type="feature" close={() => setIsGitlistOpen(false)}
                              featureName="deploy-from-gitlist"/>
      <NotFinishedModal open={isBitBuckOpen} type="feature" close={() => setIsBitBuckOpen(false)}
                              featureName="deploy-from-bit-bucket"/>
    </div>
  )
}

export default DeployFromGitModal
