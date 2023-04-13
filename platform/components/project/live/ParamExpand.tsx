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

import {Disclosure, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/outline'
import Status from "@/components/project/general/Status";
import Image from "next/image";
import React from "react";
import {classNames} from '@/utils/general';

const profile = "https://source.unsplash.com/random";
const deployments = [
  {
    version: "a23-basdf234",
    status: "Deployed",
    description: "THIS IS A DESCRIPTION OF WHAT IS HAPPENING",
    time: "3h",
    user: "bfan1256",
  }
]

export default function ParamExpand() {
  return (
    <div className="mt-6 divide-gray-200 border overflow-hidden rounded-lg">
      <dl className="space-y-6 divide-y">
        <Disclosure as="div" className="">
          {({open}) => (
            <>
              <dt className="text-lg">
                <Disclosure.Button
                  className="text-left w-full flex justify-between transition-all items-start text-gray-400">
                  <table className="min-w-full divide-y px-4 divide-gray-200 ">
                    <tbody className="bg-white divide-y divide-gray-200">
                    {deployments?.map((deployment) => (
                      <tr key={deployment.version}>
                        <td className="pl-5 pr-3 py-4 whitespace-nowrap">
                          <div className="font-semibold text-sm text-gray-900 inline ml-2">
                            {deployment.version}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <Status status={deployment.status}/>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="text-sm text-gray-900 max-w-sm">
                            {deployment.description}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex justify-end items-center">
                            <div className="text-sm text-gray-500 max-w-sm">
                              {deployment.time} ago by {deployment.user}
                            </div>
                            <div className="w-5 h-5 rounded-full overflow-hidden object-cover relative ml-2">
                              <Image
                                layout="fill"
                                objectFit="cover"
                                src={profile}
                                alt="Profile Photo"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </Disclosure.Button>
              </dt>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Disclosure.Panel as="dd" className="pt-4 border-t">
                  <div className="px-8 w-full flex roboto text-md">
                    <div className="w-1/5">
                      <p>
                        Cash Allocation
                      </p>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        className="mt-2 focus:ring-gray-500 focus:border-gray-500 block w-1/2 px-7 sm:text-sm border-gray-300 rounded-md"
                        placeholder="80%"
                      />
                    </div>
                    <div className="w-1/5">
                      <p>
                        Big SMA Band
                      </p>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        className="mt-2 focus:ring-gray-500 focus:border-gray-500 block w-1/2 px-7 sm:text-sm border-gray-300 rounded-md"
                        placeholder="80%"
                      />
                    </div>
                    <div className="w-1/5">
                      <p>
                        Large SMA Band
                      </p>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        className="mt-2 focus:ring-gray-500 focus:border-gray-500 block w-1/2 px-7 sm:text-sm border-gray-300 rounded-md"
                        placeholder="80%"
                      />
                    </div>
                    <div className="w-1/5">
                      <p>
                        Small SMA Band
                      </p>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        className="mt-2 focus:ring-gray-500 focus:border-gray-500 block w-1/2 px-7 sm:text-sm border-gray-300 rounded-md"
                        placeholder="80%"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-100 mt-4 px-8 py-4 roboto text-sm flex items-center">
                    <p className="text-gray-400 mt-2.5">
                      Parameters are defined in your {" "}
                      <span className="text-gray-800 inconsolata">updates.json</span>

                      <span className="text-blue-700">
                        &emsp;&emsp;&emsp;&emsp;&emsp;
                        <button>
                        How do I add more parameters?
                        </button>
                      </span>
                    </p>
                    <button
                      className="ml-auto border rounded-md bg-blue-600 focus:ring-2 focus:ring-blue-700 hover:bg-blue-700 py-2.5 px-8 roboto text-sm text-white">
                      Deploy Parameter Updates
                    </button>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </dl>
    </div>
  )
}
