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

import {XCircleIcon} from '@heroicons/react/solid'

function ErrorMessage(props: { numErrors: {} | null | undefined }) {
  if (props.numErrors == 1) {
    return (
      <h3 className="text-sm font-medium text-red-800">There was an error with your submission</h3>
    )
  }
  return (
    <h3 className="text-sm font-medium text-red-800">There were {props.numErrors} errors with your submission</h3>
  )
}

export default function ErrorAlert(props: any) {
  const messages = props.errors.filter((x: any) => x !== undefined);
  if (messages.length == 0) {
    return (<></>);
  }
  const errors = messages.map((error: any, index: number) => {
    return (
      <li key={index}>{error}</li>
    )
  });

  return (
    <div className="rounded-md mt-5 bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
        </div>
        <div className="ml-3">
          <ErrorMessage numErrors={errors.length}/>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc pl-5 space-y-1">
              {errors}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
