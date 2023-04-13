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
import {useState} from "react";
import MediumOutlineButton from "@/components/general/buttons/MediumOutlineButton";
import MediumBlackButton from "@/components/general/buttons/MediumBlackButton";
import {isEmail} from "@/utils/general";
import ErrorAlert from "@/components/general/alerts/ErrorAlert";
import {createTeamInvite} from "@/services/team-store";
import {useAuth} from "@/libs/auth";


const dropdownOptions = [
  {id: 0, label: "Member"},
  {id: 5, label: "Manager"},
  {id: 10, label: "Admin"},
];

const InviteNewMembersCard = (props: { teamId: string }) => {
  const teamId = props.teamId
  const {user} = useAuth()

  const [invites, setInvites] = useState([{email: "", role: 0},
    {email: "", role: 0},]);

  const handleBlurInput = (e: any, index: number) => {
    if (e && e.target) {
      const updateInvites = [...invites];
      updateInvites[index].email = e.target.value;
      setInvites([...updateInvites]);
    }
  }

  const handleDropdownInput = (e: any, index: number) => {
    invites[index].role = e.id;
    setInvites(invites);
  }

  const addMoreInvites = () => {
    setInvites([...invites, {email: "", role: 0},
      {email: "", role: 0},]);
  }

  const [errors, setErrors]: any[] = useState([]);
  const sendInvites = () => {
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

      invites.map((invite: any) => {
        if (invite.email != '') {
          createTeamInvite(teamId, {
            email: invite.email,
            level: parseInt(invite.role),
            status: 'invited',
            inviterName: user.firstName + " " + user.lastName,
            time: Date.now() / 1000,
          })
        }
      })

      setInvites([{email: "", role: 0},
        {email: "", role: 0},])
    } else {
      setErrors(newErrors);
    }
  }

  return (
    <div className="container shadow-lg w-full h-auto bg-white rounded-lg py-8 px-10 pb10">
      <h1 className="text-2xl font-semibold">Team Invites</h1>
      <div id="DGS" className="mt-10">
        <ErrorAlert errors={errors}/>
      </div>

      {invites.map((value, index) => {
        return (
          <div className="flex mt-3" key={index}>
            <div className="w-4/5 mr-2">
              <input
                onChange={(e) => handleBlurInput(e, index)}
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
                options={dropdownOptions}
              />
            </div>
          </div>
        );
      })}
      <div className="my-6">
        <MediumOutlineButton click={addMoreInvites}>Add More Invites</MediumOutlineButton>
      </div>
      <MediumBlackButton width="full" click={() => sendInvites()}>
        Send New Invite(s)
      </MediumBlackButton>
    </div>
  )
}

export default InviteNewMembersCard
