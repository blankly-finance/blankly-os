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

import {useAuth} from "@/libs/auth";
import {mustEnterPayment} from "@/services/stripe-store";
import router from "next/router";
import {useEffect} from "react";

const GeneralLayout = ({ children }: any) => {
  const { user, token } = useAuth();

  useEffect(() => {
    if (user) {
      mustEnterPayment(token, user.stripeCredits, user.stripeCustomerId)
        .then((result) => {
          if (result === true) {
            router.push({
              pathname: "personal-settings/billing",
              query: {enterCard: true},
            })
          }
        })
        .catch(error => console.error(error))
    }
  }, [token, user]);

  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default GeneralLayout;
