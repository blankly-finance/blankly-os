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
import ModelLayout from "@/components/layouts/ModelNavLayout";
import {classNames, prettyPrintJSON} from "@/utils/general";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import MediumBlackButton from "@/components/general/buttons/MediumBlackButton";

const tabs = [
  {name: "Key/Value", type: "KEY", href: "#", current: true},
  {name: "JSON Object", type: "JSON", href: "#", current: false},
];

const validate = (values: any) => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'Configuration Name is Required'
  }
  if (!values.description) {
    errors.description = 'A Configuration Description is Required';
  }

  return errors;
};

const Config = () => {
  const [currTab, setTab] = useState("JSON");
  const router = useRouter();
  const {projectId, modelId} = router.query;
  const configString = {
    to: "2y",
    initial_values: {"USD": 100000, "BTC": 25},
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validate,
    onSubmit: (values) => {

    },
  });
  return (
    <div className="max-w-4xl mx-auto my-12 mb-36 roboto">
      <div>
        <p className="text-gray-400 text-sm mb-1">
          <button onClick={() => router.push(`/${projectId}/${modelId}/backtests`)}
                  className="inline text-blue-600 mr-1">Backtests
          </button>
          / Create New Backtest Config
        </p>
        <h1 className="text-3xl font-semibold mt-4">
          New Backtest Configuration
        </h1>
        <p className="text-gray-400 text-md mt-4">
          Easily reuse this backtest configuration for future backtests
        </p>
        <button className="text-blue-700 text-md -mt-1">
          Building a good backtest configuration
        </button>
      </div>
      <form>

        <div className="mt-6">
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-black"
            >
              Configuration Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="My Awesome Configuration"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                required
                className="appearance-none block w-2/5 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-700 focus:border sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="description"
              className="block text-md font-medium text-black"
            >
              Configuration Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                placeholder="Enter what this configuration tests..."
                rows={5}
                onChange={formik.handleChange}
                value={formik.values.description}
                className="appearance-none block w-full p-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-700 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="">
          <div className="my-8 max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto flex items-center justify-between mb-8 ">
              <p className="roboto font-medium text-black text-2xl">
                Configuration Arguments
              </p>
              <nav className="flex space-x-2" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setTab(tab.type)}
                    className={classNames(
                      currTab === tab.type
                        ? "bg-gray-100 text-gray-700"
                        : "text-gray-500 hover:text-gray-700 border border-gray-100",
                      "px-3 py-2 font-medium text-sm rounded-md"
                    )}
                    aria-current={currTab === tab.type ? "page" : undefined}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-md">
          <div className="p-8 whitespace-pre inconsolata">
            {prettyPrintJSON(configString)}
          </div>
        </div>
        <div className="mt-12 border border-gray-200 py-5 rounded-md">
          <div className="px-12 py-6">
            <h1 className="text-2xl font-semibold text-blue-600 inconsolata">
              Now Integrate With Your Future Backtests
            </h1>
            <p className="mt-4 text-md roboto">
              Easily connect with this backtest configuration in your code, both locally and in the cloud (ensure your
              blankly.json credentials are set)
            </p>
            <div className="inconsolata mt-3 text-lg font-semibold">
              Backtest in Code
              <div className="bg-gray-100 rounded-md py-6 px-8 mt-2">
                <p className="font-medium text-gray-700 text-md">
                  # Initialize your stratagy and events
                  <br/>
                  alpaca = Alpaca()
                  <br/>
                  s = Strategy(alpaca)
                  <br/>
                  s.add_price_event(your_awesome_event, &apos;MSFT&apos;, resolution=&apos;15m&apos;)
                  <br/>
                  <br/>
                  <p className="font-semibold text-blue-700">
                    s.backtest(config=&apos;backtest-config-1&apos;) # &#60;-- update this
                  </p>
                </p>
              </div>
              <div className="inconsolata mt-8 font-semibold">
                Or Backtest in the Terminal
                <div className="bg-gray-100 rounded-md py-4 px-8 mt-2">
                  <p className="font-medium text-gray-700 text-md">
                    <span className="font-semibold">$</span>
                    {" "}
                    blankly backtest strategy.py <span
                    className="text-blue-600 font-semibold">--config=backtest-config-1</span> --cloud
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button type="submit" className="w-full">
            <MediumBlackButton width="full">
              Run Backtest Configuration
            </MediumBlackButton>
          </button>
        </div>
      </form>
    </div>
  )
}

Config.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};

export default Config
