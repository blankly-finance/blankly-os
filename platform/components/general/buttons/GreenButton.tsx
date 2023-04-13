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

import {ButtonProps} from "@/types/buttons";

const GreenButton = ({click, children, width = 'auto', additionalClasses = '', disabled = false}: ButtonProps) => {
  const classes = `${additionalClasses} ${width === 'full' ? 'w-full' : ''} ${disabled ? "bg-gray-500" : "bg-green-400 hover:bg-green-500"} py-2.5 px-6 ease-in duration-100 text-sm rounded-md text-white focus:ring-2 focus:ring-gray-200`;
  return (
    <button onClick={click} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

GreenButton.defaultProps = {
  width: 'auto',
  click: () => {
  }
}

export default GreenButton;
