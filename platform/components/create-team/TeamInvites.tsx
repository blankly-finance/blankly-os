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
import {useCallback, useEffect, useState} from "react";
import MediumOutlineButton from "../general/buttons/MediumOutlineButton";
import ErrorAlert from "@/components/general/alerts/ErrorAlert";
import {isEmail} from "@/utils/general";
import {usePerms} from "@/libs/perms";

const dropdownOptions = [
  {id: 0, label: "Member"},
  {id: 5, label: "Manager"},
  {id: 10, label: "Admin"},
];

export default function TeamInvites(props: { update: Function, isValid?: Function }) {
  const { level } = usePerms();
  const [dropdown, setDropdown] = useState<any>([]);
  const [invites, setInvites] = useState([{email: "", role: 0},
    {email: "", role: 0},]);

  const [errors, setErrors]: any[] = useState([]);

  const handleBlurInput = useCallback((e: any, index: number) => {
    if (e && e.target) {
      // setting invites
      const updateInvites = [...invites];
      updateInvites[index].email = e.target.value;
      setInvites([...updateInvites]);
    }
  }, [invites]);

  useEffect(() => {
    setDropdown(dropdownOptions);
  }, [level])

  const checkInput = () => {
    // error validation
    let newErrors: any[] = []
    let emails: any = new Set<string>();

    invites.forEach((value: any) => {
      if (value.email.length > 0) {
        if (!(isEmail(value.email))) {
          newErrors.push(`${value.email} is not an Email`);
        } else if (emails.has(value.email)) {
          newErrors.push(`Don't invite the same member twice`);
        }
        emails.add(value.email);
      }
    })

    if (newErrors.length == 0) {
      setErrors([])
      props.update([...invites])
      if (props.isValid) {
        props.isValid(true)
      }
    } else {
      setErrors(newErrors)
      if (props.isValid) {
        props.isValid(false)
      }
    }
  }

  const handleDropdownInput = (e: any, index: number) => {
    invites[index].role = e.id;
    setInvites(invites);
    props.update(invites);
  }

  const addMoreInvites = useCallback(() => {
    setInvites([...invites, {email: "", role: 0}]);
  }, [invites]);

  return (
    <div className="container shadow-lg w-full h-auto bg-white rounded-lg py-8 px-10 pb10">
      <h1 className="text-2xl font-semibold">Team Invites</h1>
      <p className="text-sm mt-2 text-gray-600">
        Send out invites to people in your community to join you in your next state-of-the-art algorithms
      </p>
      <div className="mt-10">
        <ErrorAlert errors={errors}/>
      </div>
      {invites.map((value, index) => {
        return (
          <div className="flex mt-3" key={index}>
            <div className="w-4/5 mr-2">
              <input
                onChange={(e) => handleBlurInput(e, index)}
                onBlur={() => checkInput()}
                type="text"
                name="email"
                id={`${index}`}
                value={value.email}
                className="focus:ring-gray-700 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md mt-1"
                placeholder="Enter team email address"
                autoComplete="off"
              />
            </div>
            <div className="w-1/5">
              <Dropdown
                default={0}
                update={(e: any) => handleDropdownInput(e, index)}
                options={dropdown}
              ></Dropdown>
            </div>
          </div>
        );
      })}
      <div className="mt-6">
        <MediumOutlineButton click={addMoreInvites} width="full">
          Invite Another Member
        </MediumOutlineButton>
      </div>
    </div>
  );
}

export {TeamInvites};
