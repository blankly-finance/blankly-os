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
import {useRouter} from "next/router";
import {processDateDiff, processEpochDiffFromNow} from "@/utils/date";
import {getVersions} from '@/services/version-store';
import ProfileIcon from '@/components/general/profile/ProfileIcon';
import VersionStatus from '../../general/VersionStatus';


export default function NewBacktestModal(props: { open: boolean, close: any }) {
  const router = useRouter();
  const { projectId, modelId } = router.query;

  const [versions, setVersions] = useState<any>([]);
  const [numChecks, setNumChecks] = useState(0);
  const [versionsId, setVersionsId] = useState<any>([]);

  const closeModal = useCallback(() => {
    props.close();
  }, [props]);

  function handleCheck(e: any, versionId: string) {
    if (e.target.checked) {
      setNumChecks(numChecks + 1);
      setVersionsId((versionsId: any) => [...versionsId, versionId]);
    } else {
      setNumChecks(numChecks - 1);
      setVersionsId(versionsId.filter((id: any) => id !== versionId));
    }
  }

  useEffect(() => {
    if (projectId && modelId) {
      const unsubscribe = getVersions(projectId as string, modelId as string).onSnapshot((query) => {
        const bts = query.docs.map((val) => {
          return {
            id: val.id,
            ...val.data()
          }
        });
        setVersions(bts);
      }, (e: any) => {
        router.push('/dashboard')
      });
      return () => unsubscribe();
    }
  }, [projectId, modelId])

  const calculateFinishedTime = useCallback((date: string, endDate: string) => {
    if (date && endDate) {
      return processDateDiff(date, endDate);
    }
    return 'Unknown';
  }, [])
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={closeModal}>
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
              className="inline-block max-w-5xl align-bottom bg-white rounded-lg shadow-xl transform transition-all my-8 sm:align-middle w-4/5">
              <div className="flex flex-col items-start">
                <div
                  className="bg-white py-5 w-full rounded-t-lg border-b flex items-center justify-between">
                  <Dialog.Title as="h3" className="text-xl ml-8 font-semibold roboto">
                    Pick a Version to Run a New Backtest
                  </Dialog.Title>
                </div>
              </div>

              <table className="min-w-full divide-y divide-gray-200 my-6">
                <tbody className="bg-white divide-y divide-gray-200">
                  {versions.map((version: any) => (
                    <tr key={version.id}>
                      <td className="pl-6 pr-3 flex py-4 whitespace-nowrap">

                        <div className="form-check">
                          <input className="form-radio appearance-none h-4 w-4 border focus:ring-0 focus:shadow-none ring-offset-0 focus:ring-offset-0
                                                        border-gray-300 text-black rounded-sm bg-white checked:bg-black checked:outline-none mt-1
                                                        float-left mr-2 cursor-pointer" type="radio" value=""
                            onChange={(e) => handleCheck(e, version.id)}
                          />
                          <label className="form-check-label text-sm font-medium ml-8 inline-block">
                            {version.id}
                          </label>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <VersionStatus status={version?.status ? version.status : 'Uploaded'} />
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-left text-sm text-gray-500">
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex justify-end items-center">
                          <div className="flex justify-end">
                            <div className="text-sm text-gray-500 max-w-sm">
                              {processEpochDiffFromNow(version.createdAt)} by {version.user}
                            </div>
                            <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative  ml-2">
                              <ProfileIcon id={version.uploadedBy} />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-gray-100 flex flex-row justify-between rounded-b-lg px-8">
                <div className="w-3/5 flex flex-start my-6">
                  Please Pick Only One Version
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <button onClick={closeModal}
                    className="px-8 border py-2.5 text-sm rounded-md bg-white text-black hover:border-gray-400 focus:ring-2 focus:ring-gray-400">
                    Cancel
                  </button>

                  <button
                    className="px-8 border py-2.5 rounded-md text-sm bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-600"
                    onClick={() => router.push({
                      pathname: `/${projectId}/${modelId}/new-backtest`,
                      query: { ids: versionsId[0] }
                    })
                    }>
                    Configure New Backtest
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
