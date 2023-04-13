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
import {useCallback, useState} from "react";

const tabs = [
  {name: 'Fixed Plans', type: 'fixed', href: '#', current: true},
  {name: 'Custom Config', type: 'custom', href: '#', current: false},
]

function ShowPlan(props: { type: string, update: any, plan: string }) {
  if (props.type === 'fixed') {
    return <FixedPlans update={props.update} plan={props.plan}/>;
  } else {
    return <CustomConfig update={props.update}/>;
  }
}

function CustomConfig(props: any) {
  const [config, setConfig] = useState({
    cpu: 0,
    ram: 0,
    storage: 0,
  });

  const updateConfig = useCallback((config: any) => {
    setConfig(config);
    props.update({
      type: 'custom',
      config
    });
  }, [props])

  return (
    <div className="mt-6">
      <h2 className="inconsolata text-md text-gray-400">Custom Config for Your Use Case</h2>
      <div className="flex mb-4">
        <div className="w-1/3 h-auto flex mt-1 mr-1">
          <div className="w-2/3">
            <input
              onChange={(e) => {
                config.cpu = parseInt(e.target.value);
                updateConfig(config)
              }}
              type="number"
              name="vCPU"
              value={config.cpu}
              id="vCPU"
              className="focus:ring-gray-700 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md mt-1"
              placeholder="vCPU Ct."
              autoComplete="off"
            />
          </div>
          <div className="w-1/3 roboto text-md mt-3 ml-2">vCPUs</div>
        </div>
        <div className="w-1/3 h-auto flex mt-1 mr-1 ml-3">
          <div className="w-2/3">
            <input
              onChange={(e) => {
                config.ram = parseInt(e.target.value);
                updateConfig(config)
              }}
              type="number"
              name="RAM"
              value={config.ram}
              id="RAM"
              className="focus:ring-gray-700 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md mt-1"
              placeholder="RAM Amt."
              autoComplete="off"
            />
          </div>
          <div className="w-1/3 roboto text-md mt-3 ml-2">RAM</div>
        </div>
        <div className="w-1/3 h-auto flex mt-1 ml-1">
          <div className="w-2/3">
            <input
              onChange={(e) => {
                config.storage = parseInt(e.target.value);
                updateConfig(config)
              }}
              type="number"
              name="GB"
              value={config.storage}
              id="GB"
              className="focus:ring-gray-700 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md mt-1"
              placeholder="Storage Amt."
              autoComplete="off"
            />
          </div>
          <div className="w-1/3 roboto text-md mt-3 ml-2">GB</div>
        </div>
      </div>
    </div>
  )
}

function FixedPlans(props: any) {

  return (
    <>
      <p className="text-sm inconsolata text-blue-500">Additional computing resources can be added on later</p>
      <div className="flex mt-3">
        <div className="w-1/3 mr-1 ml-1">
          <div
            className={classNames("container py-6 h-full border-2 rounded-lg text-center hover:border-gray-500",
              props.plan.plan === 'basic' ? "border-gray-900" : "border-gray-300"
            )}>
            <button onClick={() => {
              props.update({type: 'fixed', plan: 'basic'});
            }}>
              <div className="px-2">
                <h3 className="inconsolata mb-5 text-2xl font-semibold mt-3">
                  Basic
                </h3>
                <div className="text-gray-500 text-sm roboto">
                  <p>Great for initial experiments or API-base models</p>
                  <p>2 vCPU</p>
                  <p>4 GB RAM</p>
                  <p>2 GB Storage</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="w-1/3 ml-1 mr-1">
          <div
            className={classNames("container py-6 h-full border-2 rounded-lg text-center hover:border-gray-500",
              props.plan.plan === 'premium' ? "border-gray-900" : "border-gray-300"
            )}>
            <button onClick={() => {
              props.update({type: 'fixed', plan: 'premium'});
            }}>
              <div className="px-2">
                <h3 className="inconsolata text-blue-500 mb-5 text-2xl font-semibold mt-3">
                  Premium
                </h3>
                <div className="text-gray-500 text-sm roboto">
                  <p>Fit for Machine Learning and Intensive Models</p>
                  <p>4 vCPU</p>
                  <p>8 GB RAM</p>
                  <p>12 GB Storage</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="w-1/3 ml-1 mr-1">
          <div
            className={classNames("container py-6 h-full border-2 rounded-lg text-center hover:border-gray-500",
              props.plan.plan === 'advanced' ? "border-gray-900" : "border-gray-300"
            )}>
            <button onClick={() => props.update({type: 'fixed', plan: 'advanced'})}>
              <div className="px-2">
                <h3 className="inconsolata mb-5 text-2xl font-semibold mt-3">
                  Advanced
                </h3>
                <div className="text-gray-500 text-sm roboto">
                  <p>The best specs for the most intense models</p>
                  <p>8 vCPU</p>
                  <p>16 GB RAM</p>
                  <p>25 GB Storage</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}


export default function ChoosePlan(props: any) {

  const [currTab, setTab] = useState('fixed');
  const [currPlan, setPlan] = useState('premium');

  return (
    <div className="container shadow-lg w-full h-auto bg-white rounded-lg py-8 px-10">
      <div className="border-b pb-5 border-gray-300">
        <div className="flex justify-between">
          <h1 className="inconsolata text-2xl font-semibold">Choose a Plan</h1>
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full focus:ring-gray-500 focus:border-gray-500 border-gray-300 rounded-md"
                defaultValue="Fixed"
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setTab(tab.type)}
                    className={classNames(
                      currTab === tab.type ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                      'px-3 py-2 font-medium text-sm rounded-md'
                    )}
                    aria-current={currTab === tab.type ? 'page' : undefined}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="py-4">
          <ShowPlan plan={currPlan} update={(value: any) => {
            props.update(value), setPlan(value)
          }} type={currTab}/>
        </div>
      </div>
      <div className="w-full text-right mt-4">
        <p className="inconsolata text-gray-900 text-xl font-bold">Monthly Total: $49.99</p>
      </div>
    </div>
  );
}

export {ChoosePlan};
