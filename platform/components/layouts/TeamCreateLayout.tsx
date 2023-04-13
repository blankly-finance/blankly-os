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

import React, {ReactElement, useState} from "react";
import {ArrowLeftIcon} from "@heroicons/react/solid";
import {Link} from "react-scroll";
import {classNames} from "@/utils/general";
import {TeamInvites} from "@/components/create-team/TeamInvites";
import {useRouter} from "next/router";
import {useAuth} from "@/libs/auth";
import BlackNav from "@/components/general/nav/BlackNav";

const options = [
  {
    id: 1,
    content: "General Details",
    dot: "h-4 w-4 rounded-full flex items-center justify-center",
    stringID: "GD",
  },
  {
    id: 2,
    content: "Team Invites",
    dot: "h-4 w-4 rounded-full flex items-center justify-center",
    stringID: "TI",
  },
  {
    id: 3,
    content: "Choose your plan",
    dot: "h-4 w-4 rounded-full flex items-center justify-center",
    stringID: "CP",
  }
];

const TeamCreateLayout = ({border = false, children}: any) => {

  const router = useRouter()
  const {uid} = useAuth()

  const [currTab, setTab] = useState('GD');

  return (
    <div>
      <BlackNav border={border}/>
      <div className="bg-white">
        <div>
          <div className="max-w-6xl mx-auto pt-32 pb-20 z-10">
            <div className="w-1/3">
              <button className="inline-block text-gray-500"
                      onClick={() => router.push(`/${uid}`)}>
                <ArrowLeftIcon className=" w-4 h-4 inline align-middle"/>
                <p className=" roboto inline pl-2 align-middle">Back to Dashboard</p>
              </button>
              <h1 className="text-3xl font-bold mt-7">
                Create A New Team
              </h1>
              <p className="roboto text-gray-400 pt-3 w-3/4">
                It&apos;s easy to get more people onto a project. Let&apos;s create a new team together
              </p>
            </div>
          </div>
          <div className="bg-gray-50">
            <div className="max-w-6xl h-auto mx-auto z-10 flex">
              <div className="pt-32 w-1/3 inline">
                <div className="flow-root">
                  <ul role="list" className="-mb-8">
                    {options.map((event, eventIdx) => (
                      <div key={event.id}>
                        <Link to={event.stringID} smooth={true}>
                          <li onClick={() => setTab(event.stringID)}>
                            <div className="relative pb-8">
                              {/* Creates the line */}
                              {eventIdx !== options.length - 1 ? (
                                <span
                                  className="absolute top-2 left-2 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"/>
                              ) : null}
                              <div className="relative flex space-x-4">
                                <div>
                                      <span
                                        className={classNames(event.dot, currTab === event.stringID ? 'bg-gray-900' : 'bg-gray-300')}></span>
                                </div>
                                <div className="min-w-0 flex-1 flex justify-between space-x-4">
                                  <div className="text-md text-gray-500 cursor-pointer inconsolata -mt-1">
                                    {event.content}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </Link>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-2/3 inline -mt-28 pb-20">
                <div className="pb-10">
                  <main className="w-full">{children}</main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}


TeamCreateLayout.getLayout = function getLayout(page: ReactElement) {
  return <TeamCreateLayout>{page}</TeamCreateLayout>;
};

export default TeamCreateLayout;
