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

import {BadgeCheckIcon} from '@heroicons/react/solid'

export default function ConfirmationAlert(props: { message: string }) {

  return (
    <div className="rounded-md mt-5 bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <BadgeCheckIcon className="h-5 w-5 text-green-400" aria-hidden="true"/>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">{props.message}</h3>
        </div>
      </div>
    </div>
  )
}
