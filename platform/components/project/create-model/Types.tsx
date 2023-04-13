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

import {useCallback, useState} from 'react'
import {RadioGroup} from '@headlessui/react'
import {CheckCircleIcon} from '@heroicons/react/solid'
import {classNames} from '@/utils/general'

const types = [
    { id: 1, value: 'strategy', title: 'Strategy 💻', description: 'A strategy that trades on a set of assets'},
    { id: 2, value: 'screener', title: 'Screener 🗺️', description: 'A screener that analyzes a set of assets in batches'},
]

export default function Types(props: any) {
    const [selectType, setSelectType] = useState(types[0])
    const update = useCallback((value) => {
        setSelectType(value);
        props.update(value);
    }, [props])

    return (
        <RadioGroup value={selectType} onChange={update}>
            <div className="mt-6 space-y-4">
                {types.map((type) => (
                    <RadioGroup.Option
                        key={type.id}
                        value={type.value}
                        className={({ checked, active }) =>
                            classNames(
                                checked ? 'border-transparent' : 'border-gray-300',
                                'relative bg-white border rounded-lg p-4 flex cursor-pointer focus:outline-none'
                            )
                        }
                    >
                        {({ checked, active }) => (
                            <>
                                <div className="flex-1 flex">
                                    <div className="flex flex-col">
                                        <RadioGroup.Label as="span" className="block text-lg font-medium text-gray-900">
                                            {type.title}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                                            {type.description}
                                        </RadioGroup.Description>
                                    </div>
                                </div>
                                <CheckCircleIcon
                                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-blue-500')}
                                    aria-hidden="true"
                                />
                                <div
                                    className={classNames(
                                        active ? 'border-2' : 'border-2',
                                        checked ? 'border-blue-500' : 'border-transparent',
                                        'absolute -inset-px rounded-lg pointer-events-none'
                                    )}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
}
