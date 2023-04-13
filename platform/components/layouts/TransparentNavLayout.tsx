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

import {useAuth} from '@/libs/auth';
import {useRouter} from 'next/router';
import {ReactElement, useEffect} from 'react';
import TransparentNavbar from "../general/nav/TransparentNavbar";
import GeneralLayout from './GeneralLayout';

const TransparentNavLayout = ({children}: any) => {
  const {loading, user} = useAuth();
  const router = useRouter();

  useEffect(() => { // used to check if there is a user for every settings
    if (!loading) {
      if (!user) {
        router.push('/auth/signin');
      }
    }
  }, [loading, router, user])
  return (
    <>
      <TransparentNavbar/>
      <main>
        {children}
      </main>
    </>
  );
}

TransparentNavLayout.getLayout = function getLayout(page: ReactElement) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default TransparentNavLayout;
