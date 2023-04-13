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

import TeamDropdown from "@/components/general/dropdowns/TeamDropdown";
import {classNames} from "@/utils/general";
import {useEffect, useState} from "react";
import {useTeam} from "@/libs/team";
import {useAuth} from "@/libs/auth";
import {getTeamOnce, getTeamSubscription, getUserTeams} from "@/services/team-store";
import RoundedProfileIconWithUrl from "./profile/RoundedProfileIconWithUrl";

const TeamManager = ({light = false}: { light: boolean }) => {

  const {active} = useTeam();
  const {user, uid} = useAuth();

  const [personal, setPersonal] = useState<any>();
  const [activeInfo, setActiveInfo] = useState<any>({})
  const [options, setOptions] = useState<any>([]);
  const [displayReady, setDisplayReady] = useState<boolean>(false);

  // fetch active user / team information
  useEffect(() => {
    if (active) {
      if (active.type == 'user' && user) {
        setActiveInfo({
          name: user.firstName + " " + user.lastName,
          plan: user.currPlan ? user.currPlan : "Free",
          profileUrl: user.profileUrl,
        })
        setDisplayReady(true)
      } else {
        const unsubscribe = getTeamSubscription(active.id).onSnapshot((snapshot) => {
          const data = snapshot.data();
          if (data) {
            setActiveInfo({
              name: data.name,
              plan: data.currPlan ? data.currPlan : "",
              profileUrl: data.profileUrl,
            })
            data.name && setDisplayReady(true);
          }
        })
        return () => unsubscribe();
      }
    }
  }, [active, user])

  useEffect(() => {
    let teams: any[] = [];
    if (user) {
      setPersonal({
        name: user.firstName + " " + user.lastName,
        id: uid,
        plan: user.plan,
        profileUrl: user.profileUrl,
        type: 'uid'
      })

      const unsubscribe = getUserTeams(uid).onSnapshot((snapshot) => {
        const allTeams = snapshot?.docs?.map((doc) => {
          return doc.id
        });

        let promises: any[] = []
        allTeams?.forEach((teamId: string) => {
          promises.push(getTeamOnce(teamId))
        })

        Promise.all(promises).then((res: any) => {
          res.map((doc: any) => {
            const data = doc.data();
            if (data) {
              teams.push({name: data.name, id: doc.id, plan: data.plan ? data.plan : "", type: 'team'})
            }
          })
          setOptions(teams);
        })
      })
      return () => unsubscribe()
    }
  }, [uid, user])

  return (
    <div className="md:ml-5 ml-2 flex items-center">
      <svg width="14" height="34" viewBox="0 0 14 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="13.4786" y1="0.144695" x2="0.478607" y2="43.1447" stroke="#C2C2C2"/>
      </svg>
      <div className="flex items-center md:ml-5 ml-2 -mt-1">
        {/*Made this dynamic to the context of activeId*/}
        <div className="relative w-7 h-7">
          <RoundedProfileIconWithUrl team={active.type !== 'user'} profileUrl={activeInfo.profileUrl}/>
        </div>
        {
          displayReady &&
          <>
            <p className={classNames("sm:ml-3 ml-2 text-sm", light ? "text-white" : "text-black")}>{activeInfo.name}</p>
            <span
              className={classNames("sm:ml-3 ml-2 inline-flex items-center px-2.5 mt-0.5 py-0.5 rounded-full text-xs font-medium text-white", light ? "bg-gray-600" : "bg-black")}>
              {activeInfo.plan ? activeInfo.plan : activeInfo.type === "user" ? "Hobby" : "Team"}
            </span>
          </>
        }
      </div>
      <div
        className={classNames('flex justify-center items-center rounded ml-2 cursor-pointer', light ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}>
        <TeamDropdown light={light} personal={personal} options={options}/>
      </div>
    </div>
  )
}

export default TeamManager
