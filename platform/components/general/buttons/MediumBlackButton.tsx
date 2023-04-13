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

const MediumBlackButton = ({
                             click,
                             children,
                             width = 'auto',
                             additionalClasses = '',
                             disabled = false
                           }: ButtonProps) => {
  const classes = `${width === 'full' ? 'w-full' : ''} ${disabled ? "bg-gray-700" : "bg-black hover:bg-gray-800"} rounded-md py-2.5 px-6 text-sm transition duration-100 ease-in text-white ${additionalClasses}`;
  return (
    <button onClick={click} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

MediumBlackButton.defaultProps = {
  width: 'auto',
  click: () => {
  }
}

export default MediumBlackButton;
