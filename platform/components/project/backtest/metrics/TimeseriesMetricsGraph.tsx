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

import {useEffect} from "react";
import {createChart} from "lightweight-charts";

function TimeSeriesMetricsGraph(props: { metrics: any }) {
    const timeseriesMetrics = props.metrics;

    useEffect(() => {
        const drawdownEl = document.getElementById("drawdown");
        while (drawdownEl?.firstChild) {
            drawdownEl.removeChild(drawdownEl.firstChild);
        }
        const rollingSharpeEl = document.getElementById("rolling-sharpe");
        while (rollingSharpeEl?.firstChild) {
            rollingSharpeEl.removeChild(rollingSharpeEl.firstChild);
        }
        const rollingVolatilityEl = document.getElementById("rolling-volatility");
        while (rollingVolatilityEl?.firstChild) {
            rollingVolatilityEl.removeChild(rollingVolatilityEl.firstChild);
        }

        let drawdown = timeseriesMetrics.drawdown;
        const sharpe = timeseriesMetrics.rolling_sharpe;
        const volatiltiy = timeseriesMetrics.rolling_volatility;

        // Done to make the graphs even
        drawdown = drawdown.slice(drawdown.length - sharpe.length, drawdown.length);

        const drawdownChart = createChart('drawdown', {
            width: 1300,
            height: 200
        });
        const drawdownLineSeries = drawdownChart.addLineSeries({ color: "Blue"});
        drawdownLineSeries.setData(drawdown);
        //drawdownChart.timeScale().fitContent();
        const sharpeChart = createChart('rolling-sharpe', {
            width: 1300,
            height: 200
        });
        const sharpeLineSeries = sharpeChart.addLineSeries({ color: "Red"});
        sharpeLineSeries.setData(sharpe);
        //sharpeChart.timeScale().fitContent();
        const volatilityChart = createChart('rolling-volatility', {
            width: 1300,
            height: 200
        });
        const volatilitySeries = volatilityChart.addLineSeries({ color: "Green"});
        volatilitySeries.setData(volatiltiy);

        sharpeChart.timeScale().subscribeVisibleLogicalRangeChange(range => {
            if (range) {
                drawdownChart.timeScale().setVisibleLogicalRange(range);
                volatilityChart.timeScale().setVisibleLogicalRange(range);
            }
        });
        drawdownChart.timeScale().subscribeVisibleLogicalRangeChange(range => {
            if (range) {
                sharpeChart.timeScale().setVisibleLogicalRange(range)
                volatilityChart.timeScale().setVisibleLogicalRange(range);
            }
        });
        volatilityChart.timeScale().subscribeVisibleLogicalRangeChange(range => {
            if (range) {
                drawdownChart.timeScale().setVisibleLogicalRange(range);
                sharpeChart.timeScale().setVisibleLogicalRange(range);
            }
        });
    }, [timeseriesMetrics])

    return (
        <div />
    );
}

export default TimeSeriesMetricsGraph;
