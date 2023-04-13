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

import Stages from "./Stages";

const CurrentStage = (props: any) => {

  return (
    <div className="container shadow-lg w-full h-auto bg-white rounded-lg py-8 px-10">
      <h1 className="text-2xl font-medium mb-5">What&apos;s your current stage?</h1>
      <Stages update={props.update} />
    </div>
  );
}

export default CurrentStage;
