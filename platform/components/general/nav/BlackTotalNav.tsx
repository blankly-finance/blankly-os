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

import {Disclosure} from "@headlessui/react";
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import BlanklyBlack from "@/public/blankly-black.svg";
import UserProfileIcon from "../profile/UserProfileIcon";
import {useCallback, useState} from "react";
import {useAuth} from "@/libs/auth";
import NotFinishedModal from "../modals/NotFinishedModal";
import {useRouter} from "next/router";
import {classNames} from "@/utils/general";
import TeamManager from "@/components/general/TeamManager";
import {useTeam} from "@/libs/team";

const BlackNav = (props: any) => {
  const {user} = useAuth();
  const router = useRouter();
  const {active} = useTeam();
  const {projectId} = router.query;
  const [isAPIModalOpen, setAPIKeyModal] = useState(false);
  const [isSettingsModalOpen, setSettingsModal] = useState(false);
  const getSettingsHref = useCallback(() => {
    if (active.type === 'user') {
      return '/personal-settings/general';
    } else {
      return `/teams/${active.id}/general`;
    }
  }, [active]);

  return (
    <Disclosure
      as="nav"
      className={classNames(
        props.border ? 'border-b border-gray-200' : "",
        "z-10 pb-4 mb-8 bg-transparent absolute top-5 w-full")}
    >
      {({open}: any) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true"/>
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center z-10">
                  <Link href="/blankly-platform-open-source-main/pages/dashboard">
                    <a>
                      <Image
                        width={110}
                        height={50}
                        src={BlanklyBlack}
                        alt="Blankly Black SVG"
                      />
                    </a>
                  </Link>
                  <TeamManager light={false}/>
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-6 mr-6 md:flex md:space-x-6 items-center">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <a href="https://7jn2pvhb7w9.typeform.com/to/qB6xbfkj" target="_blank"
                     className="flex items-center border rounded-md text-gray-500 cursor-pointer bg-white hover:border-gray-400 h-10 hover:bg-gray-100 px-6 text-sm focus:ring-2 focus:ring-gray-200"
                     rel="noreferrer">
                    Feedback
                  </a>
                  <Link href="/blankly-platform-open-source-main/pages/keys">
                    <button
                      className="text-gray-500 inline-flex items-center px-1 pt-1 text-sm"
                    >
                      API Keys
                    </button>
                  </Link>

                  <Link href="/blankly-platform-open-source-main/pages/dashboard">
                    <a
                      href="blankly-platform-open-source-main/components/general/nav#"
                      className="text-gray-500 inline-flex items-center px-1 pt-1 text-sm"
                    >
                      My Projects
                    </a>
                  </Link>
                  <Link href="/usage">
                    <a
                      href="blankly-platform-open-source-main/components/general/nav#"
                      className="text-gray-500 inline-flex items-center px-1 pt-1 text-sm"
                    >
                      Usage
                    </a>
                  </Link>
                  <Link href={getSettingsHref()}>
                    <a
                      href="blankly-platform-open-source-main/components/general/nav#"
                      className="text-gray-500 inline-flex items-center px-1 pt-1 text-sm"
                    >
                      Settings
                    </a>
                  </Link>
                  {/* Profile Image */}
                  <UserProfileIcon profile={user?.profileUrl}/>
                </div>
                <NotFinishedModal open={isAPIModalOpen} close={() => setAPIKeyModal(false)} featureName="api-keys"
                                  type={"feature"}/>
                <NotFinishedModal open={isSettingsModalOpen} close={() => setSettingsModal(false)}
                                  featureName={"settings"} type={"feature"}/>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <a
                onClick={() => setAPIKeyModal(true)}
                className="text-black inline-flex items-center px-1 pt-1 text-sm"
              >
                API Keys
              </a>
              <Link href="/blankly-platform-open-source-main/pages/dashboard">
                <a
                  href="blankly-platform-open-source-main/components/general/nav#"
                  className="text-black inline-flex items-center px-1 pt-1 text-sm"
                >
                  My Projects
                </a>
              </Link>
              <Link href="/blankly-platform-open-source-main/pages/dashboard">
                <a
                  href="blankly-platform-open-source-main/components/general/nav#"
                  className="text-black inline-flex items-center px-1 pt-1 text-sm"
                >
                  Notifications
                </a>
              </Link>
              <a
                onClick={() => setSettingsModal(true)}
                className="text-black inline-flex items-center px-1 pt-1 text-sm"
              >
                Settings
              </a>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default BlackNav;
