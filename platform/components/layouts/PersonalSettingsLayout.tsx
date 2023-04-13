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
import {classNames} from "@/utils/general";
import BlackTotalNav from "../general/nav/BlackTotalNav";
import GeneralLayout from "./GeneralLayout";
import {useRouter} from "next/router";
import {useAuth} from "@/libs/auth";
import Head from "next/head";

const tabs = [
  {name: "General", href: "/personal-settings/general", current: false},
  // { name: "API Keys", href: "#", current: false },
  // { name: "Login Connections", href: "#", current: false },
  {name: "Teams", href: "/personal-settings/teams", current: false},
  // {name: "Billing", href: "/personal-settings/billing", current: false},
  // { name: "Invoices", href: "/personal-settings/invoices", current: false },
  // { name: "Security", href: "#", current: false }
];

const PersonalSettingsLayout = ({children}: any) => {
  const [currTab, setCurrTab] = useState("");
  const [options, setOptions] = useState({clientSecret: ""});
  const router = useRouter();
  const {token, loading, user} = useAuth();

  useEffect(() => { // used to check if there is a user for every settings
    if (!loading) {
      if (!user) {
        router.push('/auth/signin');
      }
    }
  }, [loading, router, user]);

  useEffect(() => {
    //retrieveSetupIntent();
    const routerPath = router.pathname.split("/");
    const currPath = routerPath[routerPath.length - 1];
    // currPath with first letter capitalized
    const currPathNormal = currPath.charAt(0).toUpperCase() + currPath.slice(1);
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].name === currPathNormal) {
        tabs[i].current = true;
        setCurrTab(tabs[i].name);
      }
    }
  }, [router.pathname]);

  return (
    <>
      <BlackTotalNav border={false}/>
      <Head>
        <title>Personal Settings</title>
      </Head>
      <div className="pt-24 border-t-2">
        <div className="h-fit mx-auto">
          <div className="w-full py-8 border-black border-solid bg-white">
            <div className="max-w-6xl mx-auto">
              <h1 className="max-w-2xl pb-8 text-3xl font-semibold mt-8 text-black">
                Personal Settings
              </h1>
            </div>
          </div>
          <div className="bg-gray-50 pt-4 pb-24 min-h-screen">
            <div className="flex flex-row max-w-6xl mx-auto">
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
              <main className="w-full">{children}</main>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

PersonalSettingsLayout.getLayout = function getLayout(page: ReactElement) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default PersonalSettingsLayout;
