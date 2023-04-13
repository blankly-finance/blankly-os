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

const GetStarted = (props: any) => {
  return (
    <div className="shadow-lg container w-full h-auto bg-white rounded-lg py-8 px-10">
      <h1 className="text-2xl font-semibold">
        Okay! Let&apos;s Get Started
      </h1>
      <h2 className="roboto mt-3 mb-2 text-md text-gray-500">
        We&apos;re super excited to be on this journey with you! Let&apos;s show you how Blankly can really speed up your algotrading experience 😶
      </h2>
      <div className="flex mt-12 text-sm">
        <button type="submit"
          className="bg-gray-900 hover:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-full h-10 text-white roboto rounded-lg"
          onClick={props.clicked}>
          Let&apos;s Get Started
        </button>
      </div>
    </div>
  );
}

export default GetStarted
