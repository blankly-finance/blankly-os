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
import {useRouter} from "next/router";
import ModelNav from "../project/general/ModelNav";
import Breadcrumbs from "../project/general/Breadcrumbs";
import GeneralLayout from "./GeneralLayout";
import {useAuth} from "@/libs/auth";

const ProjectSettingsLayout = ({ children }: any) => {
  const [currTab, setCurrTab] = useState("General");
  const router = useRouter();
  const { projectId, modelId } = router.query;

  const { loading, user } = useAuth();

  useEffect(() => { // used to check if there is a user for every settings
    if (!loading) {
      if (!user) {
        router.push('/auth/signin');
      }
    }
  }, [loading, router, user])

  const tabs = [
    { name: "General", href: `/${projectId}/${modelId}/settings/general`, current: true },
    // { name: "Container", href: `/${projectId}/${modelId}/settings/general`, current: true },
    // { name: "Integrations", href: "#", current: false },
    // {name: "Git", href: "#", current: false},
    // { name: "Security", href: "#", current: false },
    { name: "Advanced", href: `/${projectId}/${modelId}/settings/advanced`, current: false },
  ];

  return (
    <>
      <div className="pb-20">
        <BlackNav border={false} />
      </div>
      <ModelNav />
      <div className="xl:mx-0 mx-8 bg-gray-50 h-screen">
        <div className="h-fit mx-8 xl:mx-auto pb-24 bg-gray-50">
          <div className="w-full pb-8 border-black border-solid bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="mt-10 pt-4">
                <Breadcrumbs location={"settings"} />
                <h1 className="max-w-2xl pb-8 mt-2 text-3xl mt-4 font-semibold text-black">
                  Model Settings
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
            <div className="flex flex-col items-start w-2/6 h-full py-10">
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
            <main>{children}</main>
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
