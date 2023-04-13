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

import MediumBlackButton from "@/components/general/buttons/MediumBlackButton";
import PersonalSettingsLayout from "@/components/layouts/PersonalSettingsLayout";
import TeamCard from "@/components/settings/personal-settings/TeamCard";
import {useAuth} from "@/libs/auth";
import {getUserTeamsOnce} from "@/services/user-store";
import {useRouter} from "next/router";
import {ReactElement, useCallback, useEffect, useState} from "react";

const Teams = () => {
    const [teams, setTeams] = useState<any>([]);
    const { uid } = useAuth();
    const router = useRouter();

    const newTeam = useCallback(() => {
        router.push('/teams/create');
    }, [router])
    useEffect(() => {
        getUserTeamsOnce(uid).then((query) => {
            const data = query.docs.map((res) => {
                return {
                    id: res.id,
                    ...res.data(),
                }
            })
            setTeams(data);
        })
    }, [uid]);
    return (
        <div className="mt-10">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-medium">Teams</h1>
                <div>
                    <MediumBlackButton click={newTeam}>
                        Create a Team
                    </MediumBlackButton>
                </div>
            </div>
            {
                teams.length === 0 ?
                    (
                        <div className="border bg-white border-gray-200 mt-8 text-center p-12 rounded-md">
                            <p className="text-black text-md mb-5">You don&apos;t have any teams right now</p>
                            <MediumBlackButton click={newTeam}>
                                Create Your First Team
                            </MediumBlackButton>
                        </div>
                    ) : null
            }
            <div className="space-y-4 mt-10">
                {
                    teams.map((team: any) => (
                        <TeamCard key={team.id} id={team.id} level={team.level} />
                    ))
                }
            </div>
        </div>
    );
}


Teams.getLayout = function getLayout(page: ReactElement) {
    return <PersonalSettingsLayout>{page}</PersonalSettingsLayout>;
};

export default Teams;

function getUserTeams(uid: any) {
    throw new Error("Function not implemented.");
}
