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

import { useEffect, useState } from "react";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";

const DonutChartWithLabel = ({ percent }: { percent: number }) => {

  const [data, setData] = useState<any>([{ x: 1, y: 0 }, { x: 2, y: 100 }]);
  const [displayPercent, setDisplayPercent] = useState<any>(0);
  useEffect(() => {
    setTimeout(() => {
      setData([{ x: 1, y: percent }, { x: 2, y: 100 - percent }]);
      setDisplayPercent(percent);
    }, 1000)
  }, [percent])

  return (
    <div>

      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
          standalone={false}
          data={data}
          animate={{ duration: 500 }}
          innerRadius={110}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color = datum.y > 30 ? "rgb(74 222 128)" : "red";
                return datum.x === 1 ? color : "transparent";
              }
            }
          }}
        />
        <VictoryLabel
          textAnchor="middle" verticalAnchor="middle"
          x={200} y={200}
          text={displayPercent}
          style={{ fontSize: 95, fontFamily: "Inconsolata", fontWeight: "bold" }}
        />
      </svg>
    </div>
  );
}

export default DonutChartWithLabel;
