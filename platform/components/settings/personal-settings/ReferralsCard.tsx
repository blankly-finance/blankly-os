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

import BlackButton from "@/components/general/buttons/BlackButton";

const ReferralsCard = () => {
    return (
      <div className="flex flex-col w-full h-fit items-center justify-start mt-8">
          <div className="h-fit w-full relative bg-white rounded-lg border border-gray-200 mb-8">
              <div className="p-8 mb-16 relative">
                  <h1 className="mb-6 text-2xl inconsolata font-bold text-black">
                      Blankly Referrals
                  </h1>
                  <div className="mt-4">
                      <div
                        className="block text-gray-700"
                      >
                          You&#39;ll be able to see all the referrals you&#39;ve made. Every successful <b>model
                          deployment</b> by
                          a referral means 1 month free for each of you
                      </div>
                  </div>
              </div>
              <div
                className="absolute w-full rounded-b-lg h-16 bottom-0 bg-gray-100 flex justify-between px-8 items-center">
                  <p className="text-sm text-gray-400">Have a Blankly Code? Plug it in here and we&#39;ll get you your free
                      stuff</p>
                  <BlackButton>
                      Add New Referral
                  </BlackButton>
              </div>
          </div>
      </div>
    );
}

export default ReferralsCard;
