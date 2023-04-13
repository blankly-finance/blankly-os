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
import {useAuth} from "@/libs/auth";
import GeneralLayout from "./GeneralLayout";

const TeamSettingsLayout = ({ children }: any) => {
  const [currTab, setCurrTab] = useState("General");
  const router = useRouter();
  const { teamId } = router.query;
  const tabs = [
    { name: "General", href: "/general", current: true },
    // { name: "API Keys", href: "/keys", current: false },
    // { name: "Enterprise", href: "/enterprise", current: false },
    { name: "Members", href: "/members", current: false },
    // { name: "Billing", href: "/billing", current: false },
    // { name: "Invoices", href: "/invoices", current: false },
    // { name: "Security", href: "/security", current: false }
  ];

  const { loading, user } = useAuth();

  useEffect(() => { // used to check if there is a user for every settings
    if (!loading) {
      if (!user) {
        router.push('/auth/signin');
      }
    }
  }, [loading, router, user])

  return (
    <>
      <BlackNav border={true} />
      <div className="pt-24 border-t-2">
        <div className="h-fit mx-auto">
          <div className="w-full py-8 border-black border-solid bg-white">
            <div className="max-w-5xl mx-auto">
              <h1 className="max-w-2xl pb-8 text-3xl font-semibold mt-8 text-black">
                Team Settings
              </h1>
            </div>
          </div>
          <div className="bg-gray-50 pt-4 h-full pb-24">
            <div className="flex flex-row max-w-5xl mx-auto">
              <div className="flex flex-col items-start w-2/6 h-full py-10">
                {
                  tabs.map((tab) => {
                    return (
                      <Link
                        key={tab.name}
                        href={`/teams/${teamId}${tab.href}`}
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

TeamSettingsLayout.getLayout = function getLayout(page: ReactElement) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default TeamSettingsLayout;
