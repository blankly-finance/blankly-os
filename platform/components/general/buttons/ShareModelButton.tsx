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

import {Fragment, useCallback, useEffect, useState} from 'react'
import {Popover, Switch, Transition} from '@headlessui/react'
import {ShareIcon} from '@heroicons/react/solid'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {DuplicateIcon} from '@heroicons/react/outline'
import {classNames} from '@/utils/general';
import {generateLink} from "@/utils/dynamic-links";
import {useRouter} from "next/router";
import {getModelOnce, updateModel} from "@/services/models-store";
import {useAuth} from "@/libs/auth";

export default function ShareModelButton(props: any) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [iframeCopied, setIFrameCopied] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [link, setLink] = useState<string>("https://app.blankly.finance/url/url");
  const [iframe, setIframe] = useState<string>('');
  const router = useRouter();
  const { projectId, modelId } = router.query;
  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading) {
      getModelOnce(projectId as string, modelId as string).then((doc) => {
        const model: any = doc.data();
        if (model && model.share && model.link != 'https://app.blankly.finance/url/url') {
          setEnabled(model.share);
          setLink(model.link);
        } else if (model.share) {
          generateLink(`${projectId}/${modelId}/overview`).then((res) => {
            setLink(res.data.shortLink)
            updateModel(projectId as string, modelId as string, { share: true, link: link });
          });
        }
        const iframe = `<iframe src="https://app.blankly.finance/embed/live?id=${projectId}&modelId=${modelId}&option=1" width="100%" height="900"></iframe>`
        setIframe(iframe)
      })
    }
  }, [link, loading, modelId, projectId]);

  const handleEnable = useCallback(() => {
    if (enabled) {
      setEnabled(false);
      updateModel(projectId as string, modelId as string, { share: false, link: "https://app.blankly.finance/url/url" });
    } else {
      setEnabled(true);
      generateLink(`${projectId}/${modelId}/overview`).then((res) => {
        setLink(res.data.shortLink)
        updateModel(projectId as string, modelId as string, { share: true, link: link });
      });
    }
  }, [enabled, link, modelId, projectId])

  return (
    <Popover as="div" className="relative z-10 inline-block text-left">
      <div>
        <Popover.Button
          className="text-sm text-gray-500 mt-.5 flex items-center font-medium border border-gray-200 rounded-md px-3 py-1.5 transition ease-in duration-100 hover:bg-gray-100">
          <span className="h-4 w-4 mr-2 text-gray-400"><ShareIcon /></span> Share
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
          className={classNames('origin-top-right border border-gray-100 absolute right-0 mt-2 rounded-md min-w-xl shadow-2xl bg-white  focus:outline-none', enabled ? 'w-auto' : 'w-80')}>
          <div>
            <div className="pt-6 pb-4">
              <div className="px-6">
                <div>
                  <h1 className="font-medium">Share {props?.model}</h1>
                  <p className='text-xs mt-2 text-gray-500'>Share live model results and backtests
                    seamlessly</p>
                </div>
                <hr className="my-5 -mx-6" />
                <div>
                  <Switch.Group as="div" className="flex items-center justify-between">
                    <Switch.Label as="span">
                      <span className="text-sm font-medium text-gray-900">Model Preview Link & Embed</span>
                    </Switch.Label>
                    <Switch
                      checked={enabled}
                      onChange={() => handleEnable()}
                      className={classNames(
                        enabled ? 'bg-black' : 'bg-gray-300',
                        'relative inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? 'translate-x-3' : 'translate-x-0',
                          'pointer-events-none inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                  {
                    enabled ? (
                      <div>
                        <div className=" text-xs text-gray-400 mt-3">
                          Preview Link for {props?.model}
                        </div>
                        <CopyToClipboard text={link} onCopy={() => setLinkCopied(true)}>
                          <div
                            className="bg-gray-100 flex items-center cursor-pointer justify-between text-sm text-gray-500 hover:text-gray-700 mt-2 px-4 rounded-md py-2 text-left">
                            {link}
                            <span className='w-5 h-5 ml-5'><DuplicateIcon /></span>
                          </div>
                        </CopyToClipboard>
                        {
                          linkCopied ?
                            (
                              <span
                                className="text-xs mt-2 text-gray-400 text-right flex justify-end w-full">Link Copied to Clipboard</span>
                            ) : null
                        }
                        <div className=" text-xs text-gray-400 mt-3">
                          Embed for {props?.model}
                        </div>
                        <CopyToClipboard text={iframe} onCopy={() => setIFrameCopied(true)}>
                          <div
                            className="bg-gray-100 flex items-center inconsolata cursor-pointer justify-between text-sm text-gray-500 hover:text-gray-700 mt-2 px-4 rounded-md py-2 text-left">
                            <span className="w-96 whitespace-nowrap overflow-x-scroll scrollbar-hide">{iframe}</span>
                            <span className='w-5 h-5 ml-5'><DuplicateIcon /></span>
                          </div>
                        </CopyToClipboard>
                        {
                          iframeCopied ?
                            (
                              <span
                                className="text-xs mt-2 text-gray-400 text-right flex justify-end w-full">Embed Copied to Clipboard</span>
                            ) : null
                        }
                      </div>
                    ) : null
                  }
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
