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

import {OpengraphData} from "@/types/opengraph";

export default function Opengraph({ data }: { data: OpengraphData }) {
    const { title, description, image, url } = data;
    return (
        <>
            <meta property="og:title" content={title}/>
            <meta property="og:url" content={url}/>
            <meta property="og:image" content={image}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>

            <meta name="twitter:site:id" content="1443659239847866369"/>
            <meta name="twitter:creator:id" content="1443659239847866369"/>
            <meta name="twitter:card" content="summary_large_image" />
        </>
    )
}
