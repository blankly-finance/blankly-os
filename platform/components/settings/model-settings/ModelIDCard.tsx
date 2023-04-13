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

import CopyClipboardButton from '@/components/general/buttons/CopyClipboardButton';

const ProjectIDCard = (props: any) => {

    return (
        <div className="flex flex-col w-full items-center justify-start mt-8">
            <div className="h-fit w-full relative bg-white rounded-lg border border-gray-200 mb-8">
                <div className="p-8 mb-16">
                    <h1 className="mb-6 text-2xl font-bold text-black">
                        Your Blankly Model ID
                    </h1>
                    <p className="block mb-2 text-sm text-gray-400">This is the internal Blankly ID we use to identify you</p>
                    <div className="mt-4">
                        <CopyClipboardButton text={props.id} displayText={true}/>
                    </div>
                </div>
                <div
                    className="absolute w-full rounded-b-lg h-16 bottom-0 bg-gray-100 flex flex-row justify-between px-8 items-center">
                    <p className="text-gray-400 text-sm">This is used when you interact with our Blankly API</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectIDCard;
