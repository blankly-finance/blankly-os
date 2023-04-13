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

import {Fragment, useCallback, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {LightningBoltIcon, TrashIcon} from '@heroicons/react/outline'
import MediumBlackButton from '@/components/general/buttons/MediumBlackButton'
import {getPrimaryColor} from "@/utils/general";

export default function BenchmarkAdder({open, benchmarks, close, del, update}: any) {
  const [benchmark, setBenchmark] = useState("");
  const [adding, setAdding] = useState(false);

  const addBenchmark = useCallback(() => {
    setAdding(true);
    update(benchmark.toUpperCase());
    setTimeout(() => {
      close();
      setBenchmark("")
      setAdding(false);
    }, 1500)
  }, [benchmark, close, update])
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={close}>
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
              className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <LightningBoltIcon className="h-6 w-6 text-gray-600" aria-hidden="true"/>
                </div>
                <div className="mt-3 text-left sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Add a Benchmark
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      id="benchmark"
                      onBlur={(e) => setBenchmark(e.target.value)}
                      name="benchmark"
                      type="text"
                      value={benchmark}
                      onChange={(e) => setBenchmark(e.target.value)}
                      autoComplete="benchmark"
                      placeholder="e.g. AAPL, SPY, ETH-USD"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <MediumBlackButton width="full" click={addBenchmark}>
                  <div className="flex justify-center w-full">
                    {
                      adding ? (
                        <svg className="animate-spin mt-1 h-5 w-5 text-white-500" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-50" cx="12" cy="12" r="10" stroke="currentColor"
                                  strokeWidth="4"></circle>
                          <path className="opacity-100" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : "Add Benchmark"
                    }
                  </div>
                </MediumBlackButton>
              </div>
              {
                benchmarks.length > 0 ? (
                  <>
                    <hr className='border-gray-200 border-b py-3'/>
                    <div className="mt-6">
                      <h1 className="text-xs text-gray-400 mb-3">Current Benchmarks</h1>
                      <div className="space-y-2">
                        {
                          benchmarks.map((benchmark: any, index: any) => (
                            <div key={index}
                                 className='w-full flex justify-between rounded-md border border-gray-200 px-4 py-3'>
                              <div className="flex">
                                {benchmark}
                                <div className="w-4 h-4 rounded-3xl border mt-1 ml-2"
                                     style={{background: getPrimaryColor(index)}}>

                                </div>
                              </div>
                              <div>
                                <TrashIcon onClick={() => del(benchmark)}
                                           className="w-5 h-5 text-gray-400 transition cursor-pointer hover:text-red-500"/>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </>
                ) : null
              }
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
