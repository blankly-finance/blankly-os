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

function dynamicScale(chart: any, elementId: string, scaleHeight?: boolean) {
  new ResizeObserver(entries => {
    if (entries.length === 0 || entries[0].target !== document.getElementById(elementId)) {
      return;
    }
    const newRect = entries[0].contentRect;
    if (scaleHeight) {
      chart.applyOptions({height: newRect.height, width: newRect.width});
    } else {
      chart.applyOptions({width: newRect.width});
    }

    // @ts-ignore
  }).observe(document.getElementById(elementId));
}

export {dynamicScale}
