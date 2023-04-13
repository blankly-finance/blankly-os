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

import MediumBlackButton from "../general/buttons/MediumBlackButton";
import {CardElement} from '@stripe/react-stripe-js';

export default function AddPaymentMethod(props: any) {

  return (
    <div className="container shadow-lg w-full h-auto bg-white rounded-lg py-8 px-10">
      <div className="pb-2">
        <div className="flex justify-between">
          <h1 className="inconsolata text-2xl font-semibold">Add Payment Method</h1>
        </div>
      </div>
      <div className="py-6 text-center">
        <CardElement />
      </div>
      <div>
        <MediumBlackButton width="full" click={props.clicked}>
          Create Team & Send Invites
        </MediumBlackButton>
      </div>
    </div>
  );
}

export {AddPaymentMethod};
