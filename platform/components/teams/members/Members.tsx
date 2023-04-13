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

import MoreDots from "./MoreDots"
import {splitAndCapitalize} from "@/utils/general"

/* This example requires Tailwind CSS v2.0+ */
const people = [
    {
        name: 'Calvin Hawkins',
        email: 'calvin.hawkins@example.com',
        role: 'owner',
        image:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Kristen Ramos',
        email: 'kristen.ramos@example.com',
        role: 'member',
        image:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Ted Fox',
        email: 'ted.fox@example.com',
        role: 'manager',
        image:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]

export default function Members() {
    return (
        <ul role="list" className="divide-y divide-gray-200">
            {people.map((person) => (
                <li key={person.email} className="py-4 flex px-8 items-center justify-between">
                    <div className="flex items-center">
                        <img className="h-8 w-8 rounded-full" src={person.image} alt="" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{person.name}</p>
                            <p className="text-sm text-gray-500">{person.email}</p>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                        <p className="mr-5">{splitAndCapitalize(person.role, ' ')}</p>
                        <MoreDots />
                    </div>
                </li>
            ))}
        </ul>
    )
}
