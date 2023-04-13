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

import ContentLoader from "react-content-loader";


const DeploymentsTableLoading = (props: any) => {
  const deployments = [];
  for (let i = 0; i < props.num; i++) {
    deployments.push(i);
  }

  return (
    <div className="pb-12">
      <div className="overflow-hidden border border-gray-200 rounded-md h-auto">
        <table className="min-w-full table-fixed divide-y px-4 divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
          {/* Must create ones for mid screen and small screen */}
          {deployments.map((deployment: any, index: number) => (
            <tr key={index}>
              <ContentLoader
                speed={2}
                width={1150}
                height={70}
                viewBox="0 0 1150 70"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="20" y="30" rx="3" ry="3" width="150" height="15"/>
                <rect x="275" y="30" rx="3" ry="3" width="125" height="15"/>
                <rect x="445" y="30" rx="3" ry="3" width="350" height="15"/>
                <rect x="925" y="30" rx="3" ry="3" width="125" height="15"/>
                <circle cx="1075" cy="38" r="8"/>
              </ContentLoader>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DeploymentsTableLoading
