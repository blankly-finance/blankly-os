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

import {useAuth} from "@/libs/auth";
import {getBacktestsOnce} from "@/services/backtest-store";
import {generateKey} from "@/services/deployment-api-store";
import {updateModel} from "@/services/models-store";
import {DuplicateIcon} from "@heroicons/react/outline";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import ErrorAlert from "../general/alerts/ErrorAlert";

const SlateBacktesting = ({projectName, modelName}: { projectName: string, modelName: string }) => {
  const [json, setJson] = useState<any>({
    model_id: '',
    api_key: '',
    api_pass: '',
  });
  const router = useRouter();
  const {projectId, modelId} = router.query;
  const {token} = useAuth();

  useEffect(() => {
    generateKey(token, projectId as string, 'temp').then((response: any) => {
      const data = {
        model_id: modelId,
        api_key: response.apiKey,
        api_pass: response.apiPass,
      }
      setJson(data)
    });
  }, [modelId, projectId, token])

  const [errors, setErrors] = useState<any>([]);
  const verifyBacktest = useCallback(() => {
    getBacktestsOnce(projectId as string, modelId as string).then((query) => {
      if (query.docs.length > 0) {
        router.push(`/${projectId}/${modelId}/backtests`);
        updateModel(projectId as string, modelId as string, {
          lifecycleStatus: {
            message: 'Not Running',
          }
        })
      } else {
        setErrors(['No backtest was found, make sure you run the bot.py file']);
      }
    });
  }, [projectId, modelId, router])

  return (
    <div>
      <div>
        <p className="mt-6">1. First, let&apos;s install <span className="inconsolata">blankly-slate</span></p>
        <div className="flex mt-5">
          <div className="bg-gray-100 w-full rounded-md">
            <p className="inconsolata m-3 ml-6 text-md text-gray-700">
              $&nbsp;&nbsp;pip&nbsp;install&nbsp;blankly-slate
            </p>
          </div>
        </div>
        <p className="mt-6 w-4/5">2. Next, create a <span className="inconsolata">slate.json</span> in your
          project directory, and plug in these details (we&apos;ve generated these all for you)</p>
        <div className="flex mt-5">
          <div className="bg-gray-100 w-full rounded-md">
            <p className="inconsolata m-3 ml-6 text-md text-gray-400">
              # slate.json
            </p>
            <div className="inconsolata m-6 ml-6 text-md text-gray-700 whitespace-pre">
              {`${JSON.stringify(json, undefined, 2)}`}
            </div>
            <div className="float-right">
              <CopyToClipboard text={`${JSON.stringify(json, undefined, 2)}`}>
                <button
                  className="py-3 px-8 inconsolata text-sm text-gray-400 hover:text-gray-500 rounded-md px-4 py-2">
                  Copy to Clipboard
                  <span>
                                        <DuplicateIcon
                                          className="w-5 h-5 text-gray-400 hover:text-gray-500 inline ml-4 -mt-0.5"/>
                                    </span>
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <p className="mt-6 w-4/5">3. Now let&apos;s integrate and export a backtest result with your current
          code</p>
        <a href="https://docs.slate.com" className="text-sm mt-2 text-blue-500">For more information, check out
          our docs</a>
        <div className="flex mt-5">
          <div className="bg-gray-100 w-full rounded-md">
            <p className="inconsolata m-3 ml-6 text-md text-gray-400">
              # slate.json
            </p>
            <p className="inconsolata m-3 ml-6 text-md text-gray-700">
              from slate import Slate
            </p>
            <p className="inconsolata m-3 ml-6 text-md text-gray-700">
              s = Slate()
            </p>
            <p className="inconsolata m-3 ml-6 text-md text-gray-400">
              Your current code and logic...
            </p>
            <p className="inconsolata m-3 ml-6 text-md text-gray-700">
              s.backtest.result([&apos;BTC-USD&apos;, &apos;ETH-USD&apos;], &apos;USD&apos;, &apos;2020-05-08&apos;, &apos;2021-05-08&apos;,
              account_values, trades)
            </p>
          </div>
        </div>
        <p className="mt-6 w-4/5">Now since we&apos;ve logged in and set up our directory and connection with the
          platform, your first backtest should now be in the platform</p>
        <ErrorAlert errors={errors}/>
        <div className="flex mt-12 text-sm">
          <button onClick={verifyBacktest}
                  className="bg-gray-900 hover:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-full h-10 text-white roboto rounded-lg">
            Verify and View Backtest
          </button>
        </div>
        <p onClick={() => router.push(`/${projectId}/${modelId}/overview`)}
           className="text-sm text-center cursor-pointer text-blue-500 hover:text-blue-600 mt-3">Actually,
          I&apos;ll just skip set up for now</p>
      </div>
    </div>
  );
}

export default SlateBacktesting;
