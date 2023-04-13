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

import Dropdown from "@/components/general/dropdowns/Dropdown";
import LineChart from "../container-usage/graph/UsageGraphs";

const cpuData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "April", "May", "Jun"],
  datasets: [
    {
      label: "Current vRAM: 15 GB",
      data: [90, 12, 85, 21, 105, 12, 90, 12, 85, 21, 105, 12, 90, 12, 85, 21, 105, 12],
      fill: false,
      backgroundColor: "#0000CC",
      borderColor: "#0000CC"
    },
  ]
};

const ramData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "April", "May", "Jun"],
  datasets: [
    {
      label: "RAM Usage Over Time",
      data: [90, 12, 85, 21, 105, 12, 90, 12, 85, 21, 105, 12, 90, 12, 85, 21, 105, 12],
      fill: false,
      backgroundColor: "#0000CC",
      borderColor: "#0000CC"
    },
  ]
};

const dropdownOptions = [
  {id: 0, label: "September 2nd - October 1st"},
  {id: 1, label: "October 2nd - November 1st"},
  {id: 2, label: "November 2nd - December 1st"},
];

const graphOptions = [
  {id: 0, label: "vCPU Hour"},
  {id: 1, label: "RAM - GB/Hour"}
];

const ContainerUsage = () => {
//   const {token} = useAuth();
//   useEffect(() => {
//     getCPUTimeSeries(token, 1648504008, 1649526436).then((result: any) => {
//     });
//   }, [token]);

  return (
    <div className="border-gray-200 rounded-md px-10 py-8 border my-4">
      <div className="flex justify-between mb-10">
        <h1 className="text-2xl flex-1 font-medium mb-4">Total Container Usage</h1>
        <div className="flex items-center gap-x-2">
          <Dropdown
            update={() => {
            }}
            default={0}
            options={graphOptions}
          />
          <Dropdown
            update={() => {
            }}
            default={0}
            options={dropdownOptions}
          />
        </div>
      </div>
      <LineChart ramData={ramData}/>
    </div>
  );
}

export default ContainerUsage;
