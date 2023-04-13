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
import BlackButton from "@/components/general/buttons/BlackButton";
import RequestsTable from './RequestsTable';
import OutlineButton from '@/components/general/buttons/OutlineButton';
import {useRouter} from 'next/router';

const requests = [
  {
    type: "GET",
    id: "a234asdf-1234fasdf1234-asdr234",
    tickers: ["MSFT", "TWTR", "TSLA", "FIN"],
    createdAt: 1642706763
  },
  {
    type: "GET",
    id: "a234asdfdf-1234fasdf1234-asdr234",
    tickers: ["GME", "SNAP", "AAPL", "FIN"],
    createdAt: 164270363
  },
  {
    type: "GET",
    id: "a234avasdf-asdfasdf-asdr234",
    tickers: ["MSFT", "TWTR", "TSLA", "FIN"],
    createdAt: 1642706263
  },
  {
    type: "GET",
    id: "a234asdf-asdfasdv-asdr234",
    tickers: ["MSFT", "TWTR", "TSLA", "FIN"],
    createdAt: 1642705763
  },
  {
    type: "GET",
    id: "a234asdf-1231546-asdr234",
    tickers: ["MSFT", "TWTR", "TSLA", "FIN"],
    createdAt: 1642702763
  },
]

function ServicesOverview({model}: {model: any}) {
  const router = useRouter();
  const {projectId} = router.query;

  return (
    <div className="w-full h-auto bg-gray-50 pb-12">
      <div className="max-w-6xl mb-12 mx-auto">
        <div className="pt-10 flex">
          <div className="w-1/2">
            <h1 className="text-2xl font-semibold text-gray-900 roboto">
              Recent Requests
            </h1>
            <div className="w-max">
              {/*<LastDeployed id={projectId} deployedVersionId={model.deployedVersion}/>*/}
            </div>
          </div>
          <div className="w-1/2 text-right mt-8 space-x-2">
            <OutlineButton>Edit Data Connectors</OutlineButton>
            <BlackButton>Parameter Updates</BlackButton>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <RequestsTable requests={requests}/>
      </div>
    </div>
  )
}

export default ServicesOverview
