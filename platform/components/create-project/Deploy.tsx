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

const Deploy = (props: { clicked: any }) => {
  return (
    <div className="shadow-lg container w-full h-auto bg-white rounded-lg py-8 px-10">
      <h1 className="inconsolata text-2xl font-semibold">
        Deploy &#38; Get Started
      </h1>
      <h2 className="roboto mt-3 mb-2 text-md text-gray-500">
        Awesome! Now let&#39;s get started. Simply go through the setup steps
        below in your working directory, and you&#39;ll be up and running in no
        time.
      </h2>
      <p className="mt-6">If you don&apos;t have a Blankly Directory yet</p>
      <div className="flex mt-5">
        <div className="bg-gray-100 w-full rounded-lg">
          <p className="inconsolata m-3 ml-6 text-md text-gray-700">
            $&nbsp;&nbsp;blankly&nbsp;init
          </p>
          <p className="inconsolata m-3 ml-6 text-md text-gray-700">
            $&nbsp;&nbsp;blankly&nbsp;deploy
          </p>
        </div>
      </div>
      <p className="mt-6">If you already have one, simply run</p>
      <div className="flex mt-4">
        <div className="bg-gray-100 w-full rounded-lg">
          <p className="inconsolata m-3 ml-6 text-md text-gray-700">
            $&nbsp;&nbsp;blankly&nbsp;deploy
          </p>
        </div>
      </div>
      <div className="flex mt-12 text-sm">
        <button type="submit"
                className="bg-gray-900 hover:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 w-full h-10 text-white roboto rounded-lg"
                onClick={props.clicked}>
          Create New Project
        </button>
      </div>
    </div>
  );
}

export default Deploy;
