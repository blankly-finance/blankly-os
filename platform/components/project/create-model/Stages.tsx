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

const stages = [
    { id: 1, value: 'just-getting-started', title: 'Just Starting ⭐', description: 'I\ don\'t have a trading idea implemented yet', users: '621 users' },
    { id: 2, value: 'backtesting', title: 'Actively Testing a Trading Idea 🧪', description: 'I have a trading idea and I\'m actively backtesting it', users: '1200 users' },
    { id: 3, value: 'deploying-your-model', title: 'Ready to Deploy my Trading Algorithm 🚀', description: 'I\'ve thoroughly backtested my algo and I want to deploy it', users: '2740 users' },
    { id: 4, value: 'actively-running-a-model', title: 'Already have a Trading Algorithm Running 💸', description: 'My trading algorithm is running and I want to integrate reporting', users: '2740 users' },
]

export default function Stages(props: any) {
    const [selectStage, setSelectedStage] = useState(stages[0])
    const update = useCallback((value) => {
        setSelectedStage(value);
        props.update(value);
    }, [props])

    return (
        <RadioGroup value={selectStage} onChange={update}>
            <div className="mt-6 space-y-4">
                {stages.map((stage) => (
                    <RadioGroup.Option
                        key={stage.id}
                        value={stage.value}
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
                                            {stage.title}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                                            {stage.description}
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
