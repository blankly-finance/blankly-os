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

import {ReactElement, useEffect, useState} from "react";
import Link from "next/link";
import BlackNav from "../general/nav/BlackNav";
import {classNames} from "@/utils/general";
import ProjectDetailsNav from "../project/general/ProjectDetailsNav";
import {useRouter} from "next/router";
import GeneralLayout from "./GeneralLayout";
import {useAuth} from "@/libs/auth";
import Head from "next/head";
import {useTeam} from "@/libs/team";
import {getTeamOnce} from "@/services/team-store";
import {stripePromise} from "@/services/stripe-store";
import {Elements} from "@stripe/react-stripe-js";

const ProjectSettingsLayout = ({children}: any) => {
  const [currTab, setCurrTab] = useState("General");
  const router = useRouter();

  useEffect(() => {
    const path = router.pathname
    const final = path.substr(path.lastIndexOf('/') + 1);
    const tabName = final.charAt(0).toUpperCase() + final.slice(1);

    setCurrTab(tabName)
  }, [router.pathname])

  const {projectId} = router.query;

  const [tabs, setTabs] = useState([
    {name: "General", href: `/${projectId}/settings/general`, current: true},
    // {name: "Billing", href: `/${projectId}/settings/billing`, current: false},
    {name: "Advanced", href: `/${projectId}/settings/advanced`, current: false}
  ])

  const {active} = useTeam()
  const {uid, user} = useAuth();

  const [name, setName] = useState<any>()

  useEffect(() => {
    if (active.type == 'user') {
      if (user) {
        setName(user.firstName)
      }
    } else if (active.type == 'team') {
      getTeamOnce(active.id).then((doc) => {
        setName(doc.data()?.name)

        setTabs([
          {name: "General", href: `/${projectId}/settings/general`, current: true},
          {name: "Team", href: `/${projectId}/settings/team`, current: false},
          {name: "Advanced", href: `/${projectId}/settings/advanced`, current: false}
        ])
      })
    }
  }, [active, projectId, uid, user])

  return (
    <>
      <BlackNav border={false}/>
      <ProjectDetailsNav/>
      <Head>
        <title>Project Settings</title>
      </Head>
      <div className="bg-gray-50  h-screen">
        <div className="h-fit mx-auto pb-24 bg-gray-50">
          <div className="w-full pb-8 border-black border-solid bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="mt-10 pt-4">
                <h1 className="max-w-2xl pb-8 mt-2 text-3xl mt-4 font-semibold text-black">
                  {name} Settings
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-row max-w-6xl mx-auto">
            <div className="flex flex-col items-start w-1/6 h-full py-10">
              {
                tabs.map((tab) => {
                  return (
                    <Link
                      key={tab.name}
                      href={tab.href}
                    >
                      <a
                        onClick={() => setCurrTab(tab.name)}
                        className={classNames(
                          currTab === tab.name
                            ? "my-3 font-semibold"
                            : "my-3", "block"
                        )}
                      >
                        {tab.name}
                      </a>

                    </Link>
                  )

                })
              }
            </div>
            <Elements stripe={stripePromise}>
              <main className="w-full">{children}</main>
            </Elements>
          </div>
        </div>
      </div>
    </>
  );
};

ProjectSettingsLayout.getLayout = function getLayout(page: ReactElement) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default ProjectSettingsLayout
