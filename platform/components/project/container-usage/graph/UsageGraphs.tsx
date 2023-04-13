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

import React, {useEffect} from 'react'
import {createChart} from "lightweight-charts";

function UsageGraphs(props: { cpuData?: any, ramData?: any }) {
  const cpuData = props.cpuData;
  const ramData = props.ramData

  useEffect(() => {
    const cpuEl = document.getElementById("cpu-chart");
    const ramEl = document.getElementById("ram-chart");

    while (cpuEl?.firstChild) {
      cpuEl.removeChild(cpuEl.firstChild);
    }
    while (ramEl?.firstChild) {
      ramEl.removeChild(ramEl.firstChild);
    }

    const cpuChart = createChart('cpu-chart', {
      width: 1200,
      height: 400
    });
    const cpuLineSeries = cpuChart.addLineSeries({color: "Blue"});
    cpuLineSeries.setData(cpuData);

    const ramChart = createChart('ram-chart', {
      width: 1200,
      height: 400
    });
    const ramLineSeries = ramChart.addLineSeries({color: "Red"});
    ramLineSeries.setData(ramData);
  }, [cpuData, ramData]);

  return (
    <div/>
  )
}

export default UsageGraphs;
