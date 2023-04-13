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

import {Bar} from "react-chartjs-2";

const BarGraph = (props: any) => {
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: false,
      },
      y: {
        grid: {
          display: false
        },
      },
    },
  }


  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: props.backgroundColor,
        maxBarThickness: 40,
        borderRadius: 10,
      },
    ],
  };

  return (
    <Bar options={options} data={data}/>
  )
}

export default BarGraph
