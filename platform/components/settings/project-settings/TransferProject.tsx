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

const TransferProject = () => {

    return (
        <div className="flex flex-col w-full items-center justify-start mt-8">
            <div className="h-fit w-full relative bg-white rounded-lg border border-gray-200 mb-8">
                <div className="p-8 mb-16">
                    <h1 className="mb-6 text-2xl inconsolata font-bold text-black">
                        Transfer Project
                    </h1>
                    <div className="mt-4">
                        <p className="roboto text-medium w-4/5 text-gray-500">
                            This will transfer this project to another user or team. You can transfer this to a pro account or team to get all the upgrades immediately.
                        </p>
                    </div>
                </div>
                <div
                    className="absolute w-full rounded-b-lg h-16 bottom-0 bg-gray-100 flex flex-row justify-between px-8 items-center">
                    <button type="submit"
                        className="text-white absolute right-4 bg-gray-900 hover:bg-gray-800 rounded-md py-2 text-sm px-8">
                        Transfer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TransferProject;
