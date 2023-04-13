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

const Status = (props: any) => {
  return (
    <div className="px-3 whitespace-nowrap flex justify-start">
      <div className="w-1/6 pt-1 mr-1">
        <div className="rounded-3xl bg-green-300 w-3 h-3"></div>
      </div>
      <div className="w-5/6 text-left ml-1">
        <div className="text-sm text-gray-400">{props.time ? props.time : "Unknown"}</div>
      </div>
    </div>
  )
}

export default Status;
