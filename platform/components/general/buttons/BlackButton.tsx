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

import { ButtonProps } from "@/types/buttons";
import { classNames } from "@/utils/general";

const BlackButton = ({ click, children, width = 'auto', additionalClasses="" }: ButtonProps) => {
    const classes = `rounded-md py-3 px-8 text-sm border transition ease-in duration-100 bg-black hover:bg-gray-800 focus:ring-2 focus:ring-gray-800 text-white ${additionalClasses}`;
    return (
        <button onClick={click} className={classNames(classes, width === 'full' ? 'w-full' : '')}>
            {children}
        </button>
    );
}

BlackButton.defaultProps = {
    width: 'auto',
    click: () => {}
}

export default BlackButton;
