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
import ContentLoader from "react-content-loader"

function DetailLoadingState() {
    return (
        <div className="max-w-6xl mx-auto flex flex-col pt-0 md:pt-40 w-full h-full items-center">
            <div className="flex md:flex-row flex-col space-y-6 md:space-y-0 justify-evenly items-center w-full">
                <div className="bg-white mx-4 px-4 py-6 shadow-md rounded-lg">
                    <ContentLoader
                        speed={2}
                        width={360}
                        height={200}
                        viewBox="0 0 340 200"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="10" y="10" rx="3" ry="3" width="250" height="15" />
                        <rect x="330" y="5" rx="3" ry="3" width="10" height="25" />
                        <rect x="10" y="50" rx="3" ry="3" width="300" height="50" />
                        <rect x="10" y="120" rx="3" ry="3" width="320" height="15" />
                        <rect x="10" y="150" rx="3" ry="3" width="320" height="15" />
                        <rect x="10" y="180" rx="3" ry="3" width="320" height="15" />
                    </ContentLoader>
                </div>
                <div className="bg-white mx-4 px-4 py-6 shadow-md rounded-lg">
                    <ContentLoader
                        speed={2}
                        width={360}
                        height={200}
                        viewBox="0 0 340 200"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="10" y="10" rx="3" ry="3" width="250" height="15" />
                        <rect x="330" y="5" rx="3" ry="3" width="10" height="25" />
                        <rect x="10" y="50" rx="3" ry="3" width="300" height="50" />
                        <rect x="10" y="120" rx="3" ry="3" width="320" height="15" />
                        <rect x="10" y="150" rx="3" ry="3" width="320" height="15" />
                        <rect x="10" y="180" rx="3" ry="3" width="320" height="15" />
                    </ContentLoader>
                </div>
                <div className="bg-white mx-4 px-4 py-6 shadow-md rounded-lg">
                    <ContentLoader
                        speed={2}
                        width={360}
                        height={200}
                        viewBox="0 0 340 200"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="10" y="10" rx="3" ry="3" width="250" height="15" />
                        <rect x="330" y="5" rx="3" ry="3" width="10" height="25" />
                        <rect x="10" y="50" rx="3" ry="3" width="300" height="50" />
                        <rect x="10" y="120" rx="3" ry="3" width="320" height="15" />
                        <rect x="10" y="150" rx="3" ry="3" width="320" height="15" />
                        <rect x="10" y="180" rx="3" ry="3" width="320" height="15" />
                    </ContentLoader>
                </div>

            </div>

        </div>
    )
}

export default DetailLoadingState
