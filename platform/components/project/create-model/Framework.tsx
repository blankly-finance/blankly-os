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

import Frameworks from "./Frameworks";

const Framework = (props: any) => {
  return (
    <div className="container shadow-lg w-full h-auto bg-white rounded-lg py-8 px-10">
      <h1 className="text-2xl font-medium mb-5">What {props.live ? "live trading" : "backtesting"} framework are you using?</h1>
      <Frameworks update={props.update} live={props.live ? props.live : false} />
    </div>
  );
}

export default Framework;
