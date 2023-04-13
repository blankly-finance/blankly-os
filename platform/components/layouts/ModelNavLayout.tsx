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
import {getModelSubscription} from '@/services/models-store';
import {useRouter} from 'next/router';
import {ReactElement, useEffect, useState} from 'react';
import BlackNav from "../general/nav/BlackNav";
import ModelNav from "../project/general/ModelNav";
import GeneralLayout from './GeneralLayout';
import BorderedNavbar from "@/components/general/nav/BorderedNavbar";
import Footer from '../general/Footer';
import Head from 'next/head';
import {splitAndCapitalize} from '@/utils/general';
import StarterModelProvider from "@/contexts/StarterModelContext";

const ModelLayout = ({children}: any) => {
  const router = useRouter();
  const {loading, user} = useAuth();
  // ModelLayout  is only used for models
  const {projectId, modelId} = router.query;
  const [model, setModel] = useState<any>();
  const [end, setEnd] = useState<any>("");
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShowChildren(true);
      getModelSubscription(projectId as string, modelId as string)
        .onSnapshot((value) => {
          const data = value.data()
          setModel(data);
        }, (e) => {
          if (user) {
            router.push('/dashboard');
          } else {
            router.push('/auth/signin');
          }
        })
    }
  }, [loading, modelId, projectId, router, user])

  useEffect(() => {
    const url = router.asPath.split('/').pop()
    setEnd(splitAndCapitalize(url as string, " "));
  }, [router]);

  return (
    <StarterModelProvider>
      {
        user ? <div className="pb-20">
          <BlackNav border={false}/>
        </div> : <BorderedNavbar/>
      }
      <Head>
        <title>{model?.name} / {end}</title>
      </Head>
      <ModelNav/>
      {
        showChildren ?
          (<main className="relative z-0 min-h-screen">{children}</main>) : null
      }
      <Footer/>
    </StarterModelProvider>
  );
};

ModelLayout.getLayout = function getLayout(page: ReactElement) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default ModelLayout;
