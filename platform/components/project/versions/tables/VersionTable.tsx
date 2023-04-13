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
import {Version} from "@/types/versions";
import ProfileIcon from "@/components/general/profile/ProfileIcon";
import {processDateDiff, processEpochDateDiffFromNow, processEpochDiffFromNow} from "@/utils/date";
import MoreDots from "./MoreDots";
import {classNames} from "@/utils/general";
import {usePerms} from "@/libs/perms";
import VersionStatus from "../../general/VersionStatus";
import LiveStatus from "../../general/LiveStatus";

const VersionTable = (props: any) => {
    const { level } = usePerms();

    const filteredversions = props.versions?.filter((entry: Version) => entry);
    const isCurrentversion = props.isCurrentversion;
    const [showOverflow, setShowOverflow] = useState(false);
    const [runTime, setRunTime] = useState('0d 0h 0s');

    useEffect(() => {
        const value = setInterval(() => {
            if (isCurrentversion && props.status && props.status.running) { // TODO: Use lifecycle status
                if (filteredversions.length > 0) {
                    const first = filteredversions[0];
                    setRunTime(processEpochDateDiffFromNow(first.createdAt));
                }
            }
        }, 1000)
        return () => clearInterval(value);
    }, [filteredversions, isCurrentversion, props.status])

    const calculateFinishedTime = useCallback((date: string, endDate: string) => {
        if (date && endDate) {
            return processDateDiff(date, endDate);
        }
        return 'Unknown';
    }, [])

    return (
        <div className="pb-24" onClick={() => {
            setShowOverflow(false)
        }}>
            {
                filteredversions.length === 0 ? (
                    <div className="pt-12 pb-6 max-w-6xl mx-auto">
                        <div className="border border-gray-200 text-base text-gray-500 rounded p-6 text-center">
                            No versions were found to display
                        </div>
                    </div>
                ) : (
                    <>
                        <div
                            className={classNames(showOverflow ? "" : "overflow-hidden", "hidden md:block border border-gray-200 rounded-md h-auto")}
                        >
                            <table className="min-w-full table-fixed divide-y px-4 divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredversions.map((version: any, index: number) => (
                                        <tr key={version.id}>
                                            <td width="23%" className="pl-5 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-sm text-gray-900">
                                                    {version.id}
                                                </div>
                                            </td>
                                            <td width="15%" className="px-3 py-4 whitespace-nowrap">
                                                {
                                                    !isCurrentversion ?
                                                        // THIS IS VERY BROKEN ATM
                                                        (<VersionStatus
                                                            status={version?.status ? version.status : 'Uploaded'} />)
                                                        : (<LiveStatus
                                                            status={props.status?.message ? props.status.message : "Monitoring Active"}
                                                            time={runTime} showTime={true} />)
                                                }
                                            </td>
                                            <td width="50%"
                                                className="px-3 py-4 whitespace-nowrap text-sm text-left text-gray-500">
                                                {version.versionDescription && version.versionDescription.length > 0 ?
                                                    (<div className="text-sm text-gray-900 max-w-sm">
                                                        {version.versionDescription}
                                                    </div>)
                                                    :
                                                    (<div className="text-sm italic text-gray-400 max-w-sm">
                                                        No Description
                                                    </div>)
                                                }

                                            </td>
                                            <td width="10%" className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex justify-end">
                                                    <div className="text-sm text-gray-500 max-w-sm">
                                                        {processEpochDiffFromNow(version.createdAt)} by {version.user}
                                                    </div>
                                                    <div
                                                        className="w-5 h-5 rounded-full overflow-hidden object-cover relative  ml-2">
                                                        <ProfileIcon id={version.uploadedBy} />
                                                    </div>
                                                </div>
                                            </td>
                                            {
                                                level >= 5 ? <td width="2%"
                                                    className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <MoreDots id={version.id} description={version.description}
                                                        click={() => {
                                                            index == filteredversions.length - 1 ? setShowOverflow(true) : setShowOverflow(false)
                                                        }}
                                                        currentversion={props.currentversion} />
                                                </td> : <td>
                                                    <div className="w-4"></div>
                                                </td>
                                            }

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="md:hidden gap-4 flex flex-col">
                            {filteredversions.map((version: any, index: number) => (
                                <div key={index} className="border border-gray-200 divide-y space-y-4 p-4 rounded-md flex-col">
                                    <div>
                                        <p className="font-semibold text-sm text-black">{version.id}</p>
                                    </div>
                                    <div className="pt-4">
                                        {version.versionDescription && version.versionDescription.length > 0 ?
                                            (<div className="text-sm text-gray-900 max-w-sm">
                                                {version.versionDescription}
                                            </div>)
                                            :
                                            (<div className="text-sm italic text-gray-400 max-w-sm">
                                                No Description
                                            </div>)
                                        }

                                    </div>
                                    <div className="pt-4">
                                        {
                                            !isCurrentversion ?
                                                // THIS IS VERY BROKEN ATM
                                                (<VersionStatus
                                                    status={version?.status ? version.status : 'Uploaded'} />)
                                                : (<LiveStatus
                                                    status={props.status?.message ? props.status.message : "Monitoring Active"}
                                                    time={runTime} showTime={true} />)
                                        }
                                    </div>
                                    <div className="pt-4 flex items-center text-sm text-gray-500 max-w-sm">
                                        {processEpochDiffFromNow(version.createdAt)} by {version.user}
                                        <div
                                            className="w-5 h-5 rounded-full overflow-hidden object-cover relative  ml-2">
                                            <ProfileIcon id={version.uploadedBy} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default VersionTable
