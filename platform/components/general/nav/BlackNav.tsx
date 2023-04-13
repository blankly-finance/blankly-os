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

import {Fragment, useEffect, useState} from "react";
import {Menu, Transition} from "@headlessui/react";
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import BlanklyBlack from "@/public/blankly-black.svg";
import UserProfileIcon from "../profile/UserProfileIcon";
import {useAuth} from "@/libs/auth";
import NotFinishedModal from "../modals/NotFinishedModal";
import {useRouter} from "next/router";
import {classNames} from "@/utils/general";
import TeamManager from "@/components/general/TeamManager";
import FeedbackDropdown from "@/components/general/dropdowns/FeedbackDropdown";
import {getProjectsOnce} from "@/services/projects-store";
import {useTeam} from "@/libs/team";

const BlackNav = (props: any) => {
  const {user, uid} = useAuth();
  const {active} = useTeam();
  const router = useRouter();
  const {projectId} = router.query;
  const [isAPIModalOpen, setAPIKeyModal] = useState(false);
  const [isSettingsModalOpen, setSettingsModal] = useState(false);
  const [little, showLittle] = useState(false);

  useEffect(() => {
    getProjectsOnce(uid).then((query) => {
      if (query.docs.length === 0) {
        showLittle(true);
      }
    })
  }, [uid])


  return (
    <Menu
      as="nav"
      className={classNames(
        props.border ? 'border-b border-gray-200' : "",
        "z-20 pb-4 mb-8 bg-transparent absolute top-5 w-full")}
    >
      {({open}: any) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex w-full md:w-auto justify-between">

                <div className="flex-shrink-0 hidden md:flex items-center z-10">
                  <Link href={`/${active.id}`}>
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
                <div className="flex-shrink-0 md:hidden flex items-center z-10">
                  <Link href={uid ? `/${active.id}` : '/auth/signin'}>
                    <a>
                      <Image
                        width={60}
                        height={60}
                        src={BlanklyBlack}
                        alt="Blankly Black SVG"
                      />
                    </a>
                  </Link>
                  <TeamManager light={false}/>
                </div>
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Menu.Button
                    className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true"/>
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                    )}
                  </Menu.Button>
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-6 mr-6 md:flex md:space-x-6 items-center">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <a
                    className="text-gray-500 inline-flex hover:text-gray-700 ease-in duration-100 transition items-center px-1 pt-1 text-sm"
                    rel="noreferrer">
                    <FeedbackDropdown/>
                  </a>
                  {
                    !little ? (
                      <>
                        {/* <Link href='/dashboard'>
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700 ease-in duration-100 transition inline-flex items-center px-1 pt-1 text-sm"
                          >
                            My Projects
                          </a>
                        </Link> */}
                        <Link href={`/${projectId}`}>
                          <a
                            href="blankly-platform-open-source-main/components/general/nav#"
                            className="text-gray-500 hover:text-gray-700 ease-in duration-100 transition inline-flex items-center px-1 pt-1 text-sm"
                          >
                            My Models
                          </a>
                        </Link>
                        {/* <Link href={`/keys`}>
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700 ease-in duration-100 transition cursor-pointer inline-flex items-center px-1 pt-1 text-sm"
                          >
                            API Keys
                          </a>
                        </Link> */}
                      </>
                    ) : null
                  }
                  {/* <a
                    href="https://docs.blankly.finance"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 hover:text-gray-700 ease-in duration-100 transition inline-flex items-center px-1 pt-1 text-sm"
                  >
                    Docs
                  </a> */}
                  <a
                    href="https://slate-docs.web.app"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 hover:text-gray-700 ease-in duration-100 transition inline-flex items-center px-1 pt-1 text-sm"
                  >
                    Slate Docs
                  </a>
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

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {/* <Menu.Item>
                  {({ active }) => (
                      <a
                          onClick={() => setAPIKeyModal(true)}
                          className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                          )}
                      >
                        API Keys
                      </a>
                  )}
                </Menu.Item> */}
                <Menu.Item>
                  {({active}) => (
                    <Link href="/blankly-platform-open-source-main/pages/dashboard">
                      <a
                        href="blankly-platform-open-source-main/components/general/nav#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        My Projects
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({active}) => (
                    <Link href="/blankly-platform-open-source-main/pages/dashboard">
                      <a
                        href="blankly-platform-open-source-main/components/general/nav#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Notifications
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <form method="POST" action="blankly-platform-open-source-main/components/general/nav#">
                  <Menu.Item>
                    {({active}) => (
                      <a
                        onClick={() => setSettingsModal(true)}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default BlackNav;
