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

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import type {NextPage} from 'next'
import {ReactElement, ReactNode, useEffect} from 'react'
import type {AppContext, AppProps} from 'next/app'
import {analytics} from '@/libs/firebase'
import {IntercomProvider} from 'react-use-intercom';
import {AuthProvider} from '@/libs/auth'
import {TeamProvider} from "@/libs/team";
import {NextRouter, useRouter} from 'next/router'
import {PermsProvider} from "@/libs/perms";
import Head from 'next/head'
import {OpengraphData} from "@/types/opengraph";
import OpengraphTags from "@/components/seo/Opengraph";
import fetchOpenGraphData from "@/utils/opengraph";
import isbot from "isbot";
import {IncomingMessage} from "http";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
} & { opengraphData?: OpengraphData }

function MyApp({ Component, pageProps, opengraphData }: AppPropsWithLayout) {
  const router = useRouter();

  useEffect(() => {
    const res = analytics();
    if (process.env.NODE_ENV === 'production') {
      const logEvent = (url: string) => {
        res.setCurrentScreen(url);
        res.logEvent('screen_view');
      };

      router.events.on('routeChangeComplete', logEvent);
      logEvent(window.location.pathname);

      return () => {
        router.events.off('routeChangeComplete', logEvent);
      };
    }
  }, [router]);

  const getLayout = Component.getLayout || ((page) => page)
  return (
    <IntercomProvider appId={"iau71r9e"} autoBoot={true}>
        <Head>
          {
            process.env.NODE_ENV === 'production' ?
              (
                <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0111/3090.js" async={true} />
              ) : null
          }
          { opengraphData ? <OpengraphTags data={opengraphData}/> : null }
        </Head>
        <AuthProvider>
          <TeamProvider>
            <PermsProvider>
              {getLayout(
                <Component {...pageProps} />
              )}
            </PermsProvider>
          </TeamProvider>
        </AuthProvider>
    </IntercomProvider>
  )
}

async function getOpengraphData(router: NextRouter, req?: IncomingMessage) {
  // check for bot user agent
  // we don't generate opengraph data unless we need to (the useragent is a bot)
  if (!isbot(req?.headers["user-agent"])) {
    return
  }

  try {
    return await fetchOpenGraphData(router);
  } catch (err) {
    // this can be fail for lots of reasons, including the model/backtest/whatever being private
    console.warn(err)
  }
}

MyApp.getInitialProps = async ({ Component, router, ctx }: AppContext) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    opengraphData: await getOpengraphData(router, ctx.req)
  }
}

export default MyApp
