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

function DeployFromCLIModal() {
    return (
        <div className="container relative flex flex-col px-10 py-6 shadow-lg rounded-md h-auto bg-white">
            <div className="py-2 w-4/5">
                <h2 className="text-2xl inconsolata font-bold">Deploy Models Using CLI</h2>
            </div>
            <p className="inconsolate text-gray-500 text-md w-4/5">
                Easily create new models or add previous ones from the terminal.
                <a href="blankly-platform-open-source-main/components/project/details/modals" className="text-blue-500 hover:text-blue-600"> Check out our examples</a>
            </p>
            <p className="mt-5 mb-2 text-gray-700">Don&apos;t have a project directory yet?</p>
            <div className="flex text-sm">
                <div className="bg-gray-100 w-full rounded-lg">
                    <p className="inconsolata m-3 ml-6 text-lg text-gray-700">
                        $&nbsp;&nbsp;blankly&nbsp;init
                    </p>
                </div>
            </div>
            <p className="mt-5 mb-2 text-gray-700">When you&apos;re ready, deploy your models to the cloud</p>
            <div className="flex text-sm">
                <div className="bg-gray-100 w-full rounded-lg">
                    <p className="inconsolata m-3 ml-6 text-lg text-gray-700">
                        $&nbsp;&nbsp;blankly&nbsp;deploy
                    </p>
                </div>
            </div>
            <button className="border rounded-md mt-8 bg-black hover:bg-gray-800">
                <p className="my-3 ml-5 mr-3 roboto text-sm text-white">
                    View Starter Repositories
                </p>
            </button>
        </div>
    )
}

export default DeployFromCLIModal;
