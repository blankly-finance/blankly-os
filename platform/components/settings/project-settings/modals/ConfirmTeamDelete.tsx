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

import {Fragment, useCallback, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ExclamationIcon} from '@heroicons/react/outline'
import {useRouter} from "next/router";
import {getProjectInfoOnce} from "@/services/projects-store";
import {classNames} from "@/utils/general";
import {useAuth} from "@/libs/auth";
import {deleteDoc, getCollection} from "@/libs/firestore";

const ConfirmTeamDelete = (props: { close: any, open: boolean }) => {
    const router = useRouter()
    const { projectId } = router.query;

    const { token } = useAuth()

    const [deleting, setDeleting] = useState(false)
    const [confirm, setConfirm] = useState("")
    const [teamName, setTeamName] = useState("")

    useEffect(() => {
        getProjectInfoOnce(projectId as string).then((doc: any) => {
            setTeamName(doc.data()?.name || 'Delete');
        })
    }, [projectId]);

    const closeModal = useCallback(() => {
        if (deleting) {
            return
        }
        props.close();
    }, [deleting, props]);

    const deleteTeam = useCallback(() => {
        setDeleting(true)
        getCollection(`/team/${projectId}/members`).then((query) => {
            query.docs.map((doc) => {
                deleteDoc(`users/${doc.id}/teams/${projectId}`)
            })
            deleteDoc(`teams/${projectId}`)
        })
    }, [projectId])

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => closeModal()}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        {deleting ? "Deleting Team" : "Delete Team"}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        {deleting ? <p className="text-gray-600 w-4/5 mx-auto">
                                            Deleting this team. Please do not leave this page.
                                        </p> : <p className="text-gray-600 w-4/5 mx-auto">
                                            Are you sure you want to delete this team? This will delete any records, details, or logs you have
                                            of your models in this team.
                                        </p>}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <input
                                    className="focus:ring-gray-700 text-center focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md mt-5 mx-auto w-96"
                                    type="text"
                                    placeholder={teamName}
                                    onChange={(e) => {
                                        setConfirm(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="mt-8 flex-col flex space-y-2 px-10">
                                <button
                                    disabled={confirm !== teamName && !deleting}
                                    type="button"
                                    className={classNames("w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white", confirm == teamName && !deleting ? "bg-red-600 hover:bg-red-700" : "cursor-not-allowed bg-red-300")}
                                    onClick={() => deleteTeam()}
                                >
                                    {
                                        deleting ? (
                                            <svg className="animate-spin mt-1 h-5 w-5 text-white-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : "Delete Team"
                                    }
                                </button>
                                {
                                    !deleting ? (
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                            onClick={() => closeModal()}
                                        >
                                            Cancel
                                        </button>
                                    ) : null
                                }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ConfirmTeamDelete
