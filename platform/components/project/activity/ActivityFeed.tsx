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

import {useCallback, useEffect, useState} from "react";
import {getActivityLogs} from "@/services/activity-store";
import {useAuth} from "@/libs/auth";
import {processEpoch} from "@/utils/date";
import RoundedProfileIcon from "@/components/general/profile/RoundedProfileIcon";
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";

export default function ActivityFeed() {
  const {uid, user} = useAuth();
  const [activityItems, setActivityItems] = useState<any>([]);
  const [username, setUsername] = useState("");
  const [limitedActivityItems, setLimitedActivityItems] = useState<any>([]);
  const [limit, setLimit] = useState<number>(5);

  const retrieveLogs = useCallback(async () => {
    if (!uid) return;
    getActivityLogs(uid).then((query) => {
      let activityLogsTemp: any = [];
      query.docs.map((doc) => {
        const item = doc.data();
        activityLogsTemp.push({
          message: item?.message,
          time: item?.time
        });
      });
      activityLogsTemp.sort((item1: { message: string, time: any }, item2: { message: string, time: any }) => parseInt(item2.time) - parseInt(item1.time));
      activityLogsTemp.map((item: { message: string, time: any }) => item.time = processEpoch(item.time))
      setActivityItems(activityLogsTemp);
    });
  }, [uid])

  const retrieveUserInfo = useCallback(() => {
    if (user) {
      setUsername(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);

  useEffect(() => {
    retrieveUserInfo()
    retrieveLogs();
  }, [uid]);

  useEffect(() => {
    setLimitedActivityItems(activityItems.slice(0, limit));
  }, [activityItems, limit]);

  return (
    <div>
      {
        limitedActivityItems.length === 0 ?
          <div className="flex justify-center items-center">
            <h1 className="font-medium text-gray-400 text-xl mt-10">No Logs Available</h1>
          </div>
          :
          <div>
            <div className="sm:border sm:border-gray-200 rounded-md">
              <ul role="list" className="sm:divide-y sm:divide-gray-200">
                {limitedActivityItems.map((activityItem: any, index: number) => (
                  <li key={index}
                      className="py-4 my-4 sm:my-0 border border-gray-200 rounded-md sm:rounded-none sm:border-0">
                    <div
                      className="flex flex-col sm:flex-row space-x-3 px-4 sm:px-8 sm:items-center justify-between divide-y divide-gray-200 sm:divide-y-0">
                      <div className="flex items-center space-x-4 pb-4 sm:pb-0">
                        <div className="w-8 h-8 min-w-max">
                          <RoundedProfileIcon id={uid} team={false}/>
                        </div>
                        <h3 className="text-sm">{username}</h3>
                      </div>
                      <div className="flex justify-start sm:w-6/12 py-4 sm:py-0">
                        <p className="text-sm text-gray-500">
                          {activityItem.message.replace("for undefined", "")}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 pt-4 sm:pt-0">{activityItem.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {
              activityItems.length > limit &&
              <div className="mt-5">
                <MediumOutlineButton width={"full"} click={() => setLimit(limit + 10)}>
                  Load More
                </MediumOutlineButton>
              </div>
            }
          </div>
      }
    </div>
  )
}
