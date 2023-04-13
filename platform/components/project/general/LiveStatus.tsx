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
    'Monitoring Active': (
      <div className="flex mt-.5 items-center">
        <div className="relative inline-flex">
                    <span className="flex">
                        <span
                          className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
        </div>
        <div className="w-5/6 text-left ml-2">
          <div className="text-sm font-semibold text-blue-500">Running</div>
        </div>
      </div>
    ),
    'Started': (
      <div className="flex mt-.5 items-center">

        <div className="relative inline-flex">
                    <span className="flex">
                        <span
                          className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                    </span>
        </div>
        <div className="w-5/6 text-left ml-2">
          <div className="text-sm font-semibold text-gray-500">Started</div>
        </div>
      </div>
    ),
    'Installing Dependencies': (
      <div className="flex mt-.5 items-center">
        <div className="relative inline-flex">
                    <span className="flex">
                        <span
                          className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                    </span>
        </div>
        <div className="w-5/6 text-left ml-2">
          <div className="text-sm font-semibold text-gray-500">Building</div>
        </div>
      </div>
    ),
    'Process Exited': (
      <div className="flex mt-.5 items-center">
        <div className="relative inline-flex">
                    <span className="flex">
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-300"></span>
                    </span>
        </div>
        <div className="w-5/6 text-left mr-2">
          <div className="text-sm font-semibold text-green-300">Exited</div>
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
  return dictionary[status] ? dictionary[status] : dictionary['Unknown'];
}

const LiveStatus = (props: any) => {
  return (
    <div className="flex flex-col justify-start px-3">
      <div className="whitespace-nowrap flex justify-start">
        {
          processStatus(props.status ? props.status : 'Unknown')
        }

      </div>
      {
        props.showTime ? (
          <div className="text-sm text-gray-400">{props.time ? props.time : ""}</div>
        ) : null
      }
    </div>
  )
}

export default LiveStatus;
