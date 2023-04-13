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

const frameworks = [
    { id: 1, live: true, value: 'blankly', title: 'Blankly', logo: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/logos%2Fblankly-black.svg?alt=media&token=4caaee5a-0efe-47d8-a14f-3e0c6d3a26f0', description: 'Setup Time: ~30 seconds', users: '621 users' },
    { id: 2, live: false, value: 'backtesting-py', title: 'Backtesting.py', logo: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/logos%2Fbacktestingpy.png?alt=media&token=4d36d389-8a1d-4ab1-88e0-d1fa2eca84a9', description: 'Setup Time: ~2 minutes', users: '1200 users' },
    { id: 3, live: false, value: 'bt',title: 'bt', logo: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/logos%2Fbt.png?alt=media&token=1b8a454a-8c36-4d07-adde-bb90da9c6513', description: 'Setup Time: ~2 minutes', users: '2740 users' },
    { id: 4, live: false, value: 'jesse',title: 'Jesse', logo: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/logos%2Fjesse-bot.svg?alt=media&token=9df5ccb7-fc75-45f1-96b0-7b82962016ee', description: 'Setup Time: ~2 Minutes', users: '2740 users' },
    { id: 5, live: true, value: 'custom', title: 'Another / Custom Framework', logo: '', description: 'Setup Time: ~5-10 Minutes', users: '2740 users' },
]

const liveFrameworks = [
    { id: 1, live: true, value: 'blankly', title: 'Blankly', logo: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/logos%2Fblankly-black.svg?alt=media&token=4caaee5a-0efe-47d8-a14f-3e0c6d3a26f0', description: 'Setup Time: ~30 seconds', users: '621 users' },
    { id: 2, live: true, value: 'custom', title: 'Another / Custom Framework', logo: '', description: 'Setup Time: ~5-10 minutes ', users: '2740 users' },
]

const BacktestingFrameworks = () => {
    return (<>
        {frameworks.map((framework) => (
            <RadioGroup.Option
                key={framework.id}
                value={framework}
                className={({ checked, active }) =>
                    classNames(
                        checked ? 'border-transparent' : 'border-gray-300',
                        'relative bg-white border rounded-lg p-4 flex cursor-pointer focus:outline-none'
                    )
                }
            >
                {({ checked, active }) => (
                    <>
                        <div className="flex-1 flex items-center justify-between">
                            <div className="flex flex-col">
                                <RadioGroup.Label as="span" className="block text-lg font-medium text-gray-900">
                                    {framework.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm italic text-gray-500">
                                    {framework.description}
                                </RadioGroup.Description>
                            </div>
                            <div className='flex items-center'>
                                {framework.logo.length > 0 && framework.title !== 'Blankly' ?
                                    (
                                        <img width="50" height="100" className='object-fit-cover' src={framework.logo} alt="" />
                                    ) : null
                                }
                                {
                                    framework.title === 'Blankly' ?
                                        (
                                            <img width="100" height="100" className='object-fit-cover' src={framework.logo} alt="" />
                                        ) : null
                                }

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
    </>)
}

const LiveFrameworks = () => {
    return (<>
        {liveFrameworks.map((framework) => (
            <RadioGroup.Option
                key={framework.id}
                value={framework}
                className={({ checked, active }) =>
                    classNames(
                        checked ? 'border-transparent' : 'border-gray-300',
                        'relative bg-white border rounded-lg p-4 flex cursor-pointer focus:outline-none'
                    )
                }
            >
                {({ checked, active }) => (
                    <>
                        <div className="flex-1 flex justify-between items-center">
                            <div className="flex flex-col">
                                <RadioGroup.Label as="span" className="block text-lg font-medium text-gray-900">
                                    {framework.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                                    {framework.description}
                                </RadioGroup.Description>
                            </div>
                            <div className='flex items-center'>
                                {framework.logo.length > 0 && framework.title !== 'Blankly' ?
                                    (
                                        <img width="50" height="100" className='object-fit-cover' src={framework.logo} alt="" />
                                    ) : null
                                }
                                {
                                    framework.title === 'Blankly' ?
                                        (
                                            <img width="100" height="100" className='object-fit-cover' src={framework.logo} alt="" />
                                        ) : null
                                }

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
    </>)
}

export default function Frameworks(props: any) {
    const [selectFramework, setSelectedFramework] = useState(frameworks[0])
    const update = useCallback((value) => {
        setSelectedFramework(value);
        props.update(value.value);
    }, [props])
    return (
        <RadioGroup value={selectFramework} onChange={update}>
            <div className="mt-6 space-y-4">
                {
                    props.live ? (<LiveFrameworks />) : <BacktestingFrameworks />
                }
            </div>
        </RadioGroup>
    )
}
