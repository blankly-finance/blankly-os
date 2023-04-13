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

import Link from 'next/link';

const Complete = () => {
    const closeWindow = () => {
        if (process.browser) {
            window.close();
        }
    }
    return (
        <div className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
            <div className="max-w-max mx-auto">
                <main className="sm:flex">
                    <p className="text-4xl font-extrabold text-green-400 sm:text-5xl">Yay!</p>
                    <div className="sm:ml-6">
                        <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">You are logged in</h1>
                            <p className="mt-1 text-base text-gray-500">Please close this window and continue locally.</p>
                        </div>
                        <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                            <button
                                onClick={() => { closeWindow() }}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Close Window
                            </button>
                            <Link href="/blankly-platform-open-source-main/pages/dashboard">
                                <a
                                    href="blankly-platform-open-source-main/pages/auth#"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    To Dashboard
                                </a>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Complete;
