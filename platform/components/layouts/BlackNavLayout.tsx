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

import {ReactElement, useEffect} from 'react';
import BlackNav from "../general/nav/BlackNav";
import {useAuth} from "@/libs/auth";
import {useRouter} from "next/router";

const BlackNavLayout = ({border = false, children}: any) => {
  const router = useRouter();
  const {loading, user} = useAuth();

  useEffect(() => { // used to check if there is a user for every settings
    if (!loading) {
      if (!user) {
        router.push('/auth/signin');
      }
    }
  }, [loading, router, user])

  return (
    <>
      <BlackNav border={border}/>
      <main className="relative">{children}</main>
    </>
  );
};

BlackNavLayout.getLayout = function getLayout(page: ReactElement) {
  return <BlackNavLayout>{page}</BlackNavLayout>;
};

export default BlackNavLayout;
