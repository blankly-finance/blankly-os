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

const processStatus = (status: string) => {
  let dictionary: any = {
    'Uploaded': (
      <div className="flex mt-.5 items-center">
        <div className="relative inline-flex">
          <span className="flex">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
        </div>
        <div className="w-5/6 text-left ml-2">
          <div className="text-sm text-gray-500">Uploaded</div>
        </div>
      </div>
    ),
    'Deployed': (
      <div className="flex mt-.5 items-center">
        <div className="relative inline-flex">
          <span className="flex">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-300"></span>
          </span>
        </div>
        <div className="w-5/6 text-left ml-2">
          <div className="text-sm font-semibold text-gray-500">Deployed</div>
        </div>
      </div>
    ),
    'Unknown': (
      <div className="flex mt-.5 items-center">
        <div className="w-5/6 text-left mr-2">
          <div className="text-sm font-semibold text-gray-500">Unknown</div>
        </div>
        <div className="relative inline-flex">
          <span className="flex">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-600"></span>
          </span>
        </div>
      </div>
    ),
  }
  return dictionary[status];
}

const VersionStatus = (props: any) => {
  return (
    <div className="px-3 whitespace-nowrap flex justify-start">
      {
        processStatus(props.status ? props.status : 'Unknown')
      }
    </div>
  )
}

export default VersionStatus;
