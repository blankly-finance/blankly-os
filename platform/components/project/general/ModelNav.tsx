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

import {useEffect, useState} from 'react';
import {classNames} from "@/utils/general";
import Link from "next/link";
import {useRouter} from "next/router";
import {getModelSubscription} from "@/services/models-store";
import {ModelType} from '@/types/model';
import ShareModelButton from '@/components/general/buttons/ShareModelButton';
import {usePerms} from "@/libs/perms";
import {useStarterModel} from "@/contexts/StarterModelContext";

function findInRoute(route: string, value: string) {
  if (route.indexOf("compare") !== -1 && value === "backtest") {
    return true;
  } else if (route.indexOf("usage") !== -1 && value === "live") {
    return false;
  }
  return route.indexOf(value) !== -1;
}

export default function ModelNav() {
  const router = useRouter();
  const { projectId, modelId } = router.query;
  const { level } = usePerms();
  const [isCompleted, setIsCompleted] = useState(false);
  const [model, setModel] = useState<any>({});
  const [modelType, setModelType] = useState<ModelType>('strategy');
  const isStarterModel = useStarterModel();
  const [tabs, setTabs] = useState([
    { name: "Overview", type: "overview", href: "overview", current: true, shouldShow: true },
    {
      name: "Live",
      type: "live",
      href: "live",
      current: false,
      disabled: false,
      shouldShow: modelType === 'strategy'
    },
    { name: "Logs", type: "logs", href: "logs", current: false, shouldShow: modelType === 'service' },
    {
      name: "Backtests",
      type: "backtest",
      href: "backtests",
      current: false,
      shouldShow: modelType === 'strategy'
    },
    { name: "Screener Runs", type: "run", href: "screener-runs", current: false, shouldShow: modelType === 'screener' },
    { name: "Analytics", type: "analytics", href: "analytics", current: false, shouldShow: modelType === 'service' },
    {
      name: "Versions",
      type: "versions",
      href: "versions",
      current: false,
      shouldShow: true
    },
  ]);

  useEffect(() => {
    if (projectId && modelId) {
      const unsubscribe = getModelSubscription(projectId as string, modelId as string).onSnapshot(
        (query: any) => {
          if (query.data()) {
            const mod = { ...query.data() };
            setModel(mod);

            let newTabs = [
              { name: "Overview", type: "overview", href: "overview", current: true, shouldShow: true },
              {
                name: "Live",
                type: "live",
                href: "live",
                current: false,
                disabled: true,
                shouldShow: mod.type === 'strategy'
              },
              {
                name: "Logs",
                type: "logs",
                href: "logs",
                current: false,
                disabled: false,
                shouldShow: mod.type === 'service'
              },
              {
                name: "Backtests",
                type: "backtest",
                href: "backtests",
                current: false,
                disabled: false,
                shouldShow: mod.type === 'strategy'
              },
              {
                name: "Screener Runs",
                type: "run",
                href: "screener-runs",
                current: false,
                disabled: false,
                shouldShow: mod.type === 'screener'
              },
              {
                name: "Analytics",
                type: "analytics",
                href: "analytics",
                current: false,
                disabled: false,
                shouldShow: mod.type === 'service'
              },];
            if (level >= 5) {
              newTabs = [
                ...newTabs,
                {
                  name: "Versions",
                  type: "versions",
                  href: "versions",
                  current: false,
                  disabled: isStarterModel,
                  shouldShow: true
                },
                // {
                //   name: "Usage",
                //   type: "usage",
                //   href: "live/usage",
                //   current: false,
                //   disabled: isStarterModel,
                //   shouldShow: mod.type === 'strategy'
                // },
                {
                  name: "Settings",
                  type: "settings",
                  href: "settings/general",
                  current: false,
                  disabled: isStarterModel,
                  shouldShow: true
                }]
            }
            if (mod.lifecycleStatus === undefined || mod.lifecycleStatus === null || !mod.lifecycleStatus.running) {
              newTabs[1].disabled = true;
            } else {
              newTabs[1].disabled = false;
            }
            setTabs(newTabs);

            if (mod && mod.type) {
              setModelType(mod.type);
            }
          }
        }, (e: any) => {
          router.push('/dashboard')
        }
      );
      return () => unsubscribe();
    }
  }, [projectId, modelId, router, model.deployedVersion, level, isStarterModel]);


  useEffect(() => {
    if (!isStarterModel) { return; }
    else {
      if (!isCompleted) {
        let newTabs = [];
        for (let tab of tabs) {
          let tabTemp = JSON.parse(JSON.stringify(tab));
          if (tabTemp.type === "live" || tabTemp.type === "versions" || tabTemp.type === "usage" || tabTemp.type === "settings") {
            tabTemp.disabled = true;
          }
          newTabs.push(tabTemp);
        }
        setTabs(newTabs)
        setIsCompleted(true);
      }
    }

  }, [isCompleted, isStarterModel, tabs]);

  return (
    <div className="border-b border-gray-200">
      <div className="mx-auto z-10">
        <div className="scrollbar-hide hidden md:block flex-wrap-none mx-auto max-w-6xl mt-2 px-5 sm:p-0">
          <div className="flex justify-between items-center">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab, index) => (
                tab.shouldShow ? (
                  <div key={index}>
                    {
                      !tab.disabled ?
                        <Link
                          href={`/${projectId}/${modelId}/${tab.href}`}
                        >
                          <a
                            className={classNames(
                              findInRoute(router.route, tab.type)
                                ? "border-gray-700 text-gray-800 font-semibold"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                              "whitespace-nowrap py-4 ease-in duration-100 transition block px-1 border-b-2 font-medium text-sm"
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
                  </div>) : null
              ))}
            </nav>
            <div className="flex space-x-2 z-10 ml-5 md:ml-0">

            </div>
            <div className="hidden sm:block">
              {
                level >= 5 ? <ShareModelButton model={model.name} /> : null
              }
            </div>
          </div>
        </div>
        <div className="scrollbar-hide flex md:hidden overflow-auto flex-wrap-none mx-auto max-w-6xl mt-2 px-5 sm:p-0">
          <div className="flex justify-between items-center">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab, index) => (
                tab.shouldShow ? (
                  <div key={index}>
                    {
                      !tab.disabled ?
                        <Link
                          href={`/${projectId}/${modelId}/${tab.href}`}
                        >
                          <a
                            className={classNames(
                              findInRoute(router.route, tab.type)
                                ? "border-gray-700 text-gray-800 font-semibold"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                              "whitespace-nowrap py-4 block px-1 border-b-2 font-medium text-sm"
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
                  </div>) : null
              ))}
            </nav>
            <div className="flex space-x-2 z-10 ml-5 md:ml-0">

            </div>
            {
              level >= 5 ? <ShareModelButton model={model.name} /> : null
            }
          </div>
        </div>
      </div>
    </div>
  )

}
