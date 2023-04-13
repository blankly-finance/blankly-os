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

import React from 'react'
import ContentLoader from "react-content-loader"

function GitCLIModalSkeleton() {
    return (
        <div className="container relative flex flex-col px-10 py-6 shadow-lg rounded-md h-auto bg-white">
            <ContentLoader
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                viewBox="0 0 400 230"
            >
                <rect x="0" y="0" rx="3" ry="3" width="250" height="20" />
                <rect x="360" y="0" rx="3" ry="3" width="40" height="20" />
                <rect x="0" y="40" rx="3" ry="3" width="300" height="30" />
                <rect x="30" y="90" rx="3" ry="3" width="400" height="40" />
                <rect x="30" y="140" rx="3" ry="3" width="400" height="40" />
                <rect x="0" y="200" rx="3" ry="3" width="400" height="60" />
            </ContentLoader>
        </div>
    )
}

export default GitCLIModalSkeleton
