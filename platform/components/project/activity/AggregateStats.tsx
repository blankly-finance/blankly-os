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

import {useEffect, useState} from "react";
import {useAuth} from "@/libs/auth";
import {ArrowSmDownIcon, ArrowSmUpIcon, CashIcon, ChartSquareBarIcon, CloudUploadIcon} from '@heroicons/react/solid';
import {getActivityDoc} from "@/services/activity-store";
import {classNames} from '@/utils/general';

export default function AggregateStats() {
  const {uid} = useAuth();
  const [stats, setStats] = useState<any>([]);

  async function retrieveActivity() {
    if (uid) {
      const activityDoc = await getActivityDoc(uid);
      const activityData = activityDoc.data();

      // Calculate increase/decrease
      const deploymentChange = (activityData?.thisWeekStats.deployments - activityData?.lastWeekStats.deployments) /
        (activityData?.lastWeekStats.deployments === 0 ? 1 : activityData?.lastWeekStats.deployments) * 100;
      const backtestChange = (activityData?.thisWeekStats.backtests - activityData?.lastWeekStats.backtests) /
        (activityData?.lastWeekStats.backtests === 0 ? 1 : activityData?.lastWeekStats.backtests) * 100;
      const tradeChange = (activityData?.thisWeekStats.trades - activityData?.lastWeekStats.trades) /
        (activityData?.lastWeekStats.trades === 0 ? 1 : activityData?.lastWeekStats.trades) * 100;

      const statsTemp = [
        {
          name: 'Total Deployments',
          stat: activityData?.thisWeekStats.deployments,
          changeType: deploymentChange < 0 ? 'decrease' : 'increase',
          change: isNaN(Math.round(deploymentChange) / 10) ? 0 : Math.round(deploymentChange) / 10,
          icon: CloudUploadIcon
        },
        {
          name: 'Total Backtests',
          stat: activityData?.thisWeekStats.backtests,
          changeType: backtestChange < 0 ? 'decrease' : 'increase',
          change: isNaN(Math.round(backtestChange) / 10) ? 0 : Math.round(backtestChange) / 10,
          icon: ChartSquareBarIcon
        },
        {
          name: 'Total Trades',
          stat: activityData?.thisWeekStats.trades,
          changeType: tradeChange < 0 ? 'decrease' : 'increase',
          change: isNaN(Math.round(tradeChange) / 10) ? 0 : Math.round(tradeChange) / 10,
          icon: CashIcon
        }
      ];
      setStats(statsTemp);
    }
  }

  useEffect(() => {
    retrieveActivity()
  }, [uid]);

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item: any, index: number) => (
          <div
            key={index}
            className="relative bg-white pt-5 px-4 pb-5 sm:pt-6 sm:px-6 border border-gray-200 rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-gray-900 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true"/>
              </div>
              <p className="ml-16 text-sm font-medium text-gray-700 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true"/>
                ) : (
                  <ArrowSmDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true"/>
                )}

                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {item.change}% from last week
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
