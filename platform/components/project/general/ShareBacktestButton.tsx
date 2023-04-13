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

import {Fragment, useEffect, useState} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {ShareIcon} from '@heroicons/react/solid'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {DuplicateIcon} from '@heroicons/react/outline'
import {classNames} from '@/utils/general';
import {generateLink} from "@/utils/dynamic-links";
import {useRouter} from "next/router";
import {useAuth} from "@/libs/auth";


export default function ShareBacktestButton(props: {isShared: boolean, shareModel: CallableFunction}) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [link, setLink] = useState<string>("https://app.blankly.finance/url/url");
  const router = useRouter();
  const {projectId, modelId, backtestId} = router.query;

  const {loading} = useAuth();
  useEffect(() => {
    if (!loading) {
      generateLink(`${projectId}/${modelId}/${backtestId}/backtest`).then((res) => {
        setLink(res.data.shortLink)
      });
    }
  }, [backtestId, loading, modelId, projectId])

  return (
    <Popover as="div" className="relative z-10 inline-block text-left">
      <div>
        <Popover.Button
          className="text-sm text-gray-500 mt-.5 flex items-center font-medium border border-gray-200 rounded-md px-3 py-1.5 transition ease-in duration-100 hover:bg-gray-100">
          <span className="h-4 w-4 mr-2 text-gray-400"><ShareIcon/></span> Share
        </Popover.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel
          className={classNames('origin-top-right border border-gray-100 absolute right-0 mt-2 rounded-md min-w-xl shadow-2xl bg-white  focus:outline-none w-auto')}>
          {props.isShared ?
            <div>
              <div className="pt-6 pb-4">
                <div className="px-6">
                  <div>
                    <h1 className="font-medium">Share This Backtest</h1>
                    <p className='text-xs mt-2 text-gray-500'>Share this backtest result using the link below</p>
                  </div>
                  <hr className="my-5 -mx-6"/>
                  <div>
                    <div>
                      <div className=" text-xs text-gray-400 mt-3">
                        Preview Link for This Backtest
                      </div>
                      <CopyToClipboard text={link} onCopy={() => setLinkCopied(true)}>
                        <div
                          className="bg-gray-100 flex items-center cursor-pointer justify-between text-sm text-gray-500 hover:text-gray-700 mt-2 px-4 rounded-md py-2 text-left">
                          {link}
                          <span className='w-5 h-5 ml-5'><DuplicateIcon/></span>
                        </div>
                      </CopyToClipboard>
                      {
                        linkCopied ?
                          (
                            <span
                              className="text-xs mt-2 text-gray-400 text-right flex justify-end w-full">Link Copied to Clipboard</span>
                          ) : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className="w-56">
              <div className="pt-6 pb-4">
                <div className="px-6">
                  <div className='pb-2'>
                    <h1 className="font-medium">Model Not Shared</h1>
                    <p className='text-xs mt-2 text-gray-500'>This model must be shared for this backtest to be public</p>
                  </div>
                  <button onClick={() => props.shareModel()} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm text-white bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Share Model
                  </button>
                </div>
              </div>
            </div>
          }
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
