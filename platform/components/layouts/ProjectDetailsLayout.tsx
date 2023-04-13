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
import {getProjectOnce} from '@/services/projects-store';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {ReactElement, useEffect, useState} from 'react';
import Footer from '../general/Footer';
import BlackNav from "../general/nav/BlackNav";
import ProjectDetailsNav from "../project/general/ProjectDetailsNav";
import GeneralLayout from './GeneralLayout';

const ProjectDetailsLayout = ({children}: any) => {
  const router = useRouter();
  const [showChildren, setShowChildren] = useState(false);
  const { user, loading } = useAuth();
  const [model, setModel] = useState<any>();
  // ModelLayout is only used for models
  const { projectId } = router.query;
  useEffect(() => {
    if (!loading) {
      setShowChildren(true);
      getProjectOnce(projectId as string).then((data) => {
        setModel(data.data());
      }).catch((e) => {
        if (user) {
          router.push('/dashboard');
        } else {
          router.push('/auth/signin');
        }
      });
    }
  }, [loading, projectId, router, user])
  return (
    <>
      <BlackNav border={false}/>
      <ProjectDetailsNav/>
      <Head>
        <title>{model?.name}</title>
      </Head>
      {
        showChildren ?
        (<main className="relative z-0 min-h-screen h-auto">{children}</main>) : null
      }
      <Footer />
    </>
  );
};

ProjectDetailsLayout.getLayout = function getLayout(page: ReactElement) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default ProjectDetailsLayout;
