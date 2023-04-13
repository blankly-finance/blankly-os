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

import {Fragment, useEffect, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import {classNames} from "@/utils/general";

export default function Dropdown(props: { options: Array<any>, default: number, update: any }) {
  const [selected, setSelected] = useState<any>();

  useEffect(() => {
    if (props.options) {
      setSelected(props.options[props.default]);
    }
  }, [props.options, props.default]);

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={(e) => {
        props.update(e);
        setSelected(e)
      }}>
        <div className="mt-1 relative">
          <Listbox.Button
            className="bg-white relative w-full border border-gray-300 rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
            <span className="block truncate">{selected?.label}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-gray-700 ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {props.options?.map((option: any, index: number) => (
                <Listbox.Option
                  key={index}
                  className={({active}) =>
                    classNames(
                      active ? "text-black bg-gray-100" : "text-gray-900",
                      "cursor-pointer select-none relative py-2 pl-3 pr-9"
                    )
                  }
                  value={option}
                >
                  {({selected, active}) => (
                    <>
                      <span
                        className={classNames(
                          selected ? "font-semibold" : "font-normal",
                          "block truncate"
                        )}
                      >
                        {option.label}
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? "text-black" : "text-gray-600",
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export {Dropdown};
