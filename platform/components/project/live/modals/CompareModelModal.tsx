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

import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useRouter} from "next/router";
import {processEpoch, processEpochDiffFromNow} from "@/utils/date";
import {classNames} from "@/utils/general";
import ProfileIcon from '@/components/general/profile/ProfileIcon';
import {getModelsOnce} from '@/services/models-store';
import LiveStatus from "@/components/project/general/LiveStatus";

export default function CompareModelModal(props: { open: boolean, close: any, current?: any }) {
  const closeModal = useCallback(() => {
    props.close();
    setError(false);
  }, [props]);
  const router = useRouter();

  const {projectId, modelId} = router.query;
  const [currentModelId, setCurrentModelId] = useState(modelId);

  const [error, setError] = useState(false);
  const [models, setModels] = useState<any>([]);
  const [idsChecked, setIDsChecked] = useState<any>([]);

  // allow addition of a current backtest.
  const current = props.current;
  useEffect(() => {
    if (current) {
      setIDsChecked(current)
    }
  }, [current])

  useEffect(() => {
    getModelsOnce(projectId as string).then((query) => {
      const data = query.docs.map((model) => {
        return {
          id: model.id,
          ...model.data()
        }
      });

      //@ts-ignore
      const filtered = data.filter((model) => model?.lifecycleStatus?.running)
      setModels(filtered);

      if (!currentModelId) {
        // set default selected model to the first model
        setCurrentModelId(data[0]?.id);
      }
    })
  }, [projectId])

  const handleCheck = useCallback((e: any, modelId: string) => {
    if (e.target.checked) {
      setIDsChecked((idsChecked: any) => [...idsChecked, `${modelId}`]);
    } else {
      setIDsChecked(idsChecked.filter((id: any) => id !== `${modelId}`));
    }
  }, [idsChecked])

  const checkRedirection = useCallback(() => {
    if (idsChecked.length > 1 && idsChecked.length <= 8) {
      sessionStorage.setItem('compareIds', idsChecked);
      router.push({
        pathname: `/${projectId}/livecompare`,
        // query: {ids: idsChecked}
      })

      setIDsChecked([])
      closeModal();
    } else {
      setError(true);
    }
  }, [idsChecked, modelId, projectId, router, closeModal]);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto" onClose={closeModal}>
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
          </Transition.Child>

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
              className="inline-block align-bottom bg-white rounded-lg pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:mt-8 sm:align-middle sm:max-w-5xl sm:w-full sm:pt-6">
              <div>
                <div>
                  <Dialog.Title as="h3" className="text-2xl leading-6 font-medium text-gray-900 w-full flex px-8">
                    <div>
                      Compare Live Models
                    </div>
                  </Dialog.Title>
                  <div className="overflow-y-auto mt-4 h-96 border-b border-gray-200">
                    <table className="min-w-full divide-gray-200 my-4">
                      <tbody className="bg-white divide-y divide-gray-200">
                      {models.map((model: any, index: number) => (
                        <tr key={model.id}>
                          <td className="pl-5 pr-3 py-4 whitespace-nowrap">
                            <input className="form-checkbox appearance-none h-4 w-4 border focus:ring-0 focus:shadow-none ring-offset-0 focus:ring-offset-0
                              border-gray-300 text-black rounded-sm bg-white checked:bg-black checked:outline-none mt-1
                              float-left mr-2 cursor-pointer" type="checkbox"
                                   defaultChecked={idsChecked.includes(`${model.id}`)}
                                   onChange={(e) => handleCheck(e, model.id)}
                            />
                            <div className="font-semibold text-sm text-gray-900 inline ml-2 mr-2">
                              {model?.name ? model.name.slice(0, 20) : model.id.slice(0, 20)}{model.id.length > 20 ? "..." : ""}
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            {model.description && model.description.length > 0 ?
                              (<div className="text-sm text-gray-900 max-w-sm">
                                {model.description.slice(0, 20)}{model.description.length > 20 ? "..." : ""}
                              </div>)
                              :
                              (<div className="text-sm italic text-gray-400 max-w-sm">
                                No Description
                              </div>)
                            }
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-900">
                              Deployed: {model.deployedAt ? processEpoch(model.deployedAt) : "N/A"}
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <LiveStatus
                              status={model?.lifecycleStatus?.message ? model.lifecycleStatus.message : "Unknown"}/>
                          </td>
                          <td className="px-3 pr-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex justify-end items-center">
                              <div className="text-sm text-gray-500 max-w-sm">
                                {processEpochDiffFromNow(model?.lifecycleStatus?.startAt)} ago by {model.user}
                              </div>
                              <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative  ml-2">
                                <ProfileIcon id={model?.runBy}/>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="py-3 px-8 bg-gray-100 flex items-center">
                <div className="w-2/3 text-md font-medium mt-1 flex">
                  {
                    idsChecked.length === 1 ?
                      <p>{idsChecked.length} Model Selected</p>
                      :
                      <p>{idsChecked.length} Models Selected</p>
                  }
                  <div
                    className={classNames("ml-auto mr-4 text-md font-medium inline text-red-400", error ? "" : "hidden")}>
                    Select at least 2 but no more than 8
                  </div>
                </div>
                <div className="w-1/3 text-right">
                  <button
                    className="border roboto text-sm shadow-sm rounded-md mr-2 px-4 py-2.5 bg-white focus:ring-2 focus:ring-gray-200 hover:border-gray-400 hover:bg-gray-100"
                    onClick={() => closeModal()}>Cancel
                  </button>
                  <button
                    className="border roboto shadow-sm text-sm rounded-md px-6 text-white py-2.5 bg-black focus:ring-2 focus:ring-gray-600 hover:bg-gray-800"
                    onClick={checkRedirection}>
                    Compare Models
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
