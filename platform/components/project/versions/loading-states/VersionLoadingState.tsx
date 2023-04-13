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

import ContentLoader from "react-content-loader"

function VersionLoadingState(props: any) {
  const loading = props.loading;

  return (
    <>
      {
        loading === true ?
          <div className="relative max-w-6xl mx-auto -mt-20 grid gap-8 grid-cols-3">
            <div className="bg-white px-4 py-6 shadow-md rounded-lg">
              <ContentLoader
                speed={2}
                width={360}
                height={200}
                viewBox="0 0 360 200"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="10" y="10" rx="3" ry="3" width="200" height="15"/>
                <rect x="10" y="30" rx="3" ry="3" width="160" height="15"/>
                <rect x="10" y="70" rx="3" ry="3" width="250" height="30"/>
                <rect x="10" y="110" rx="3" ry="3" width="120" height="20"/>
                <rect x="10" y="160" rx="3" ry="3" width="130" height="15"/>
                <rect x="10" y="180" rx="3" ry="3" width="250" height="15"/>
              </ContentLoader>
            </div>
            <div className="bg-white px-4 py-6 shadow-md rounded-lg">
              <ContentLoader
                speed={2}
                width={360}
                height={200}
                viewBox="0 0 360 200"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="10" y="10" rx="3" ry="3" width="200" height="15"/>
                <rect x="10" y="30" rx="3" ry="3" width="160" height="15"/>
                <rect x="10" y="70" rx="3" ry="3" width="250" height="30"/>
                <rect x="10" y="110" rx="3" ry="3" width="120" height="20"/>
                <rect x="10" y="160" rx="3" ry="3" width="130" height="15"/>
                <rect x="10" y="180" rx="3" ry="3" width="250" height="15"/>
              </ContentLoader>
            </div>
            <div className="bg-white px-4 py-6 shadow-md rounded-lg">
              <ContentLoader
                speed={2}
                width={360}
                height={200}
                viewBox="0 0 360 200"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="10" y="10" rx="3" ry="3" width="200" height="15"/>
                <rect x="10" y="30" rx="3" ry="3" width="160" height="15"/>
                <rect x="10" y="70" rx="3" ry="3" width="250" height="30"/>
                <rect x="10" y="110" rx="3" ry="3" width="120" height="20"/>
                <rect x="10" y="160" rx="3" ry="3" width="130" height="15"/>
                <rect x="10" y="180" rx="3" ry="3" width="250" height="15"/>
              </ContentLoader>
            </div>


          </div>
          : null
      }

    </>
  )
}

export default VersionLoadingState
