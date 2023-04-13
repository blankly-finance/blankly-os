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

/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: true,
  env: {
    isProd: process.env.NODE_ENV === 'production',
  },
  async rewrites() {
    return [{ source: "/deploy", destination: "http://localhost:9082/" }];
  },
  images: {
    domains: ["firebasestorage.googleapis.com", "source.unsplash.com"],
  },
};

const env = process.env.NODE_ENV;
if (env == "production") {
  // const sentryWebpackPluginOptions = {
  //   // Additional config options for the Sentry Webpack plugin. Keep in mind that
  //   // the following options are set automatically, and overriding them is not
  //   // recommended:
  //   //   release, url, org, project, authToken, configFile, stripPrefix,
  //   //   urlPrefix, include, ignore
  //
  //   silent: true, // Suppresses all logs
  //   // For all available options, see:
  //   // https://github.com/getsentry/sentry-webpack-plugin#options.
  // };

  // Make sure adding Sentry options is the last code to run before exporting, to
  // ensure that your source maps include changes from all other Webpack plugins
  // module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
} else if (env == "development") {
  module.exports = moduleExports;
} else {
  module.exports = moduleExports;
}
