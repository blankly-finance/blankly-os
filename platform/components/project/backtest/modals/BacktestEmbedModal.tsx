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
import {Dialog, Switch, Transition} from '@headlessui/react'
import CopyToClipboard from 'react-copy-to-clipboard'
import {classNames} from '@/utils/general'
import {useRouter} from 'next/router'
import {CodeIcon} from '@heroicons/react/solid'

export default function BacktestEmbedModal(props: any) {
    const [iframe, setIframe] = useState('');
    const [accountValuesEnabled, setAccountValuesEnabled] = useState(true);
    const [metricsEnabled, setMetricsEnabled] = useState(true);
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const { projectId, modelId, backtestId } = router.query;
    const handleAVEnable = useCallback(() => {
        if (accountValuesEnabled) {
            setAccountValuesEnabled(false);
        } else {
            setAccountValuesEnabled(true);
        }
    }, [accountValuesEnabled])

    const handleMetricsEnabled = useCallback(() => {
        if (metricsEnabled) {
            setMetricsEnabled(false);
        } else {
            setMetricsEnabled(true);
        }
    }, [metricsEnabled])

    useEffect(() => {
        let iframe = '';
        if (metricsEnabled && accountValuesEnabled) {
            iframe = `<iframe src="https://app.blankly.finance/embed/backtest?id=${projectId}&modelId=${modelId}&backtestId=${backtestId}&option=3" width="100%" height="900"></iframe>`
        } else if (metricsEnabled && !accountValuesEnabled) {
            iframe = `<iframe src="https://app.blankly.finance/embed/backtest?id=${projectId}&modelId=${modelId}&backtestId=${backtestId}&option=2" width="100%" height="900"></iframe>`
        } else {
            iframe = `<iframe src="https://app.blankly.finance/embed/backtest?id=${projectId}&modelId=${modelId}&backtestId=${backtestId}&option=1" width="100%" height="900"></iframe>`
        }
        setIframe(iframe);
    }, [accountValuesEnabled, backtestId, iframe, metricsEnabled, modelId, projectId])

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={props.close}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-8">
                            <div>
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mt-5 bg-blue-100">
                                    <CodeIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-left sm:mt-5">
                                    <Dialog.Title as="h3" className="text-center text-2xl leading-6 font-medium text-blue-500">
                                        Embed This Backtest
                                    </Dialog.Title>
                                    <Switch.Group as="div" className="mt-8 flex items-center justify-between">
                                        <Switch.Label as="span">
                                            <span className="font-medium text-gray-900">Show Account Values</span>
                                        </Switch.Label>
                                        <Switch
                                            checked={accountValuesEnabled}
                                            onChange={() => handleAVEnable()}
                                            className={classNames(
                                                accountValuesEnabled ? 'bg-black' : 'bg-gray-300',
                                                'relative inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    accountValuesEnabled ? 'translate-x-3' : 'translate-x-0',
                                                    'pointer-events-none inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                )}
                                            />
                                        </Switch>
                                    </Switch.Group>
                                    <Switch.Group as="div" className="mt-2 flex items-center justify-between">
                                        <Switch.Label as="span">
                                            <span className="font-medium text-gray-900">Show Backtest Metrics</span>
                                        </Switch.Label>
                                        <Switch
                                            checked={metricsEnabled}
                                            onChange={() => handleMetricsEnabled()}
                                            className={classNames(
                                                metricsEnabled ? 'bg-black' : 'bg-gray-300',
                                                'relative inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    metricsEnabled ? 'translate-x-3' : 'translate-x-0',
                                                    'pointer-events-none inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                )}
                                            />
                                        </Switch>
                                    </Switch.Group>
                                    <div className="mt-5">
                                        <p className='text-xs text-gray-400'>Embeddable Code</p>
                                        <CopyToClipboard text={iframe} onCopy={() => setCopied(true)}>
                                            <div
                                                className="break-all bg-gray-100 inconsolata cursor-pointer justify-between text-md text-gray-500 hover:text-gray-700 mt-2 px-4 rounded-md py-2 text-left">
                                                {iframe}
                                            </div>
                                        </CopyToClipboard>
                                    </div>
                                    {
                                        copied ?
                                            (
                                                <span
                                                    className="text-xs mt-2 text-gray-400 text-right flex justify-end w-full">Code Copied to Clipboard</span>
                                            ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
