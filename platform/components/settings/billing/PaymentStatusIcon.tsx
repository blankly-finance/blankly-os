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

import React from 'react';
import {classNames} from "@/utils/general";

function DefaultIcon(props: { status: string, additionalClasses?: string }) {
  const status = props.status;
  return (
    <div className="flex items-center h-full">
      <div
        className={classNames(status === "paid" ? "bg-green-200 text-green-900" : "bg-yellow-100 text-yellow-900", "px-2 py-1 my-auto text-xs rounded items-center", props.additionalClasses)}>
        {
          status === "paid" ?
            <p>Paid</p>
            :
            <p>Pending</p>
        }
      </div>
    </div>
  );
}

export default DefaultIcon;
