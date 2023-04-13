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

import MediumBlackButton from "@/components/general/buttons/MediumBlackButton";
import {Dropdown} from "@/components/general/dropdowns/Dropdown";
import {useCallback, useState} from "react";
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";

const dropdownOptions = [
  {id: 1, label: "Admin"},
  {id: 2, label: "Manager"},
  {id: 3, label: "Member"},
];

const emptyInvites = [
  {email: "", role: 1},
  {email: "", role: 2},
  {email: "", role: 2},
];

export default function AddNewMembersCard(props: any) {
  const [invites, setInvites] = useState(emptyInvites);

  const handleBlurInput = useCallback((e: any, index: number) => {
    if (e && e.target) {
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

  const addMoreInvites = useCallback(() => {
    setInvites([...invites, ...emptyInvites]);
  }, [invites]);

  return (
    <div className="relative container border border-gray-200 w-full h-auto bg-white rounded-md py-6 pb-16">
      <div className="flex justify-between px-8 items-center">
        <h1 className="text-xl font-medium">Add New Members</h1>
        <MediumOutlineButton>Invite Link</MediumOutlineButton>
      </div>
      <hr className="my-6"></hr>
      <div className="px-8 mt-8 pb-12">
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
                ></Dropdown>
              </div>
            </div>
          );
        })}
        <div className="mt-6">
          <MediumOutlineButton click={addMoreInvites}>Add More Invites</MediumOutlineButton>
        </div>
      </div>
      <div
        className="absolute w-full rounded-b-md h-16 left-0 bottom-0 bg-gray-100 flex flex-row justify-between px-8 items-center">
        <p className="text-gray-400 text-sm">Learn more about <a className="text-blue-600 hover:text-blue-700">Team
          Members</a></p>
        <MediumBlackButton>Invite Members</MediumBlackButton>
      </div>
    </div>
  );
}

export {AddNewMembersCard};
