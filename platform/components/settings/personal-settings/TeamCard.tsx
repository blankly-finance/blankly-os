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

import RoundedProfileIcon from "@/components/general/profile/RoundedProfileIcon";
import {getTeamOnce} from "@/services/team-store";
import {useEffect, useState} from "react";

const TeamCard = ({ id, level }: { id: string, level: number }) => {
    const [team, setTeam] = useState<any>();
    useEffect(() => {
        getTeamOnce(id).then((res) => {
            setTeam(res.data());
        })
    }, [id])
    return (
        <div className="bg-white border rounded-md border-gray-200 px-6 py-4 ">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-6 h-6 mr-3">
                        <RoundedProfileIcon team={true} profileUrl={team?.profileUrl} />
                    </div>
                    <div>
                        <p>{team?.name}</p>
                        <p>{level}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamCard;
