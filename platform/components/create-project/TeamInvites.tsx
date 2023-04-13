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

import {Dropdown} from "@/components/general/dropdowns/Dropdown";
import {useCallback, useState} from "react";

const dropdownOptions = [
  {id: 1, label: "Admin"},
  {id: 2, label: "Manager"},
  {id: 3, label: "Member"},
];

export default function TeamInvites(props: { update: any }) {
  const [invites, setInvites] = useState([
    {email: "", role: 2},
    {email: "", role: 3},
    {email: "", role: 3},
  ]);

  const handleBlurInput = useCallback((e: any, index: number) => {
    if (e && e.target) {
      // calls update from property
      invites[index].email = e.target.value;
      setInvites([...invites]);
      props.update(invites);
    }
  }, [props, invites]);

  const handleDropdownInput = useCallback((e: any, index: number) => {
    invites[index].role = e.label;
    setInvites(invites);
    props.update(invites);
  }, [invites, props]);

  return (
    <div className="container shadow-lg w-full h-auto bg-white rounded-lg py-8 px-10 pb-16">
      <h1 className="inconsolata text-2xl font-semibold">Team Invites</h1>
      {invites.map((value, index) => {
        return (
          <div className="flex mt-3" key={index}>
            <div className="w-4/5 mr-2">
              <input
                onChange={(e) => handleBlurInput(e, index)}
                type="text"
                name="email"
                value={value.email}
                id="teamInv1"
                className="focus:ring-gray-700 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md mt-1"
                placeholder="Enter team email address"
                autoComplete="off"
              />
            </div>
            <div className="w-1/5">
              <Dropdown
                default={value.role}
                update={(e: any) => handleDropdownInput(e, index)}
                options={dropdownOptions}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export {TeamInvites};
