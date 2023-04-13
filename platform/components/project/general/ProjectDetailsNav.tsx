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

import {classNames} from "@/utils/general";
import Link from "next/link";
import {useRouter} from "next/router";
import {usePerms} from '@/libs/perms';

function findInRoute(route: string, value: string) {
  if ((route.split('/').length == 2 || route.split('/')[2].length == 0) && value === 'details') {
    return true
  }
  return route.indexOf(value) !== -1;
}

export default function ProjectDetailsNav() {
  const { level } = usePerms();
  const router = useRouter();
  const { projectId } = router.query;

  const tabs: any = [
    { name: "Overview", type: "details", href: "", current: true, shouldShow: true },
    // {
    //   name: "Activity",
    //   type: "activity",
    //   href: "activity",
    //   current: false,
    //   shouldShow: true
    // },
    // projects are no more, do we need project usage?
    // { name: "Usage Details", type: "project-usage", href: "project-usage", current: false, shouldShow: true },
    { name: "Settings", type: "settings", href: "settings/general", current: false, shouldShow: true },
  ];

  return (
    <div className="border-b border-gray-200">
      <div className="mx-auto pt-20 z-10">
        <div className="scrollbar-hide mx-auto hidden md:block flex-wrap-none max-w-6xl px-5 sm:p-0 mt-2">
          <div className="flex justify-between items-center w-full">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab: any, index: number) => (
                <div key={index}>
                  {
                    tab.shouldShow ?
                      <Link
                        href={`/${projectId}/${tab.href}`}
                      >
                        <a
                          className={classNames(
                            findInRoute(router.route, tab.type)
                              ? "border-gray-700 text-gray-800 font-semibold"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                            "whitespace-nowrap ease-in duration-100 block py-4 px-1 border-b-2 font-medium text-sm"
                          )}
                          aria-current={findInRoute(router.route, tab.type) ? "page" : undefined}
                        >
                          {tab.name}
                        </a>
                      </Link>
                      :
                      <a
                        className={"border-transparent block text-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"}
                      >
                        {tab.name}
                      </a>
                  }
                </div>
              ))}
            </nav>
          </div>
        </div>
        <div className="scrollbar-hide mx-auto flex md:hidden overflow-auto flex-wrap-none max-w-6xl px-5 sm:p-0 mt-2">
          <div className="flex justify-between items-center w-full">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab: any, index: number) => (
                <div key={index}>
                  {
                    tab.shouldShow ?
                      <Link
                        href={`/${projectId}/${tab.href}`}
                      >
                        <a
                          className={classNames(
                            findInRoute(router.route, tab.type)
                              ? "border-gray-700 text-gray-800 font-semibold"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                            "whitespace-nowrap block py-4 px-1 border-b-2 font-medium text-sm"
                          )}
                          aria-current={findInRoute(router.route, tab.type) ? "page" : undefined}
                        >
                          {tab.name}
                        </a>
                      </Link>
                      :
                      <a
                        className={"border-transparent block text-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"}
                      >
                        {tab.name}
                      </a>
                  }
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
