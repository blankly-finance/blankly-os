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

import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { DuplicateIcon } from '@heroicons/react/outline';

function CopyClipboardButton(props: any) {
    return (
        <CopyToClipboard text={props.text}>
            <button
                className="border py-3 px-8 inconsolata text-lg rounded-md px-4 py-2 bg-white hover:border-gray-400 hover:bg-gray-100"
                onClick={props.text}>
                {
                    props.displayText ?
                    <>{props.text}</>
                    :
                    <>Copy to Clipboard</>
                }
                <span>
                    <DuplicateIcon className="w-5 h-5 text-gray-400 inline ml-4 -mt-0.5" />
                </span>
            </button>
        </CopyToClipboard>
    )
}

export default CopyClipboardButton
