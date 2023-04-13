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
import {createViewOnlyCollaborator} from "@/services/projects-store";
import {useRouter} from "next/router";

const emptyInvites = [
  {email: ""},
  {email: ""},
  {email: ""},
];

export default function AddNewCollaboratorsCard(props: any) {
  const router = useRouter();
  const {projectId} = router.query;

  const [invites, setInvites] = useState([
    {email: ""},
    {email: ""},
    {email: ""},
  ]);

  const handleBlurInput = useCallback((e: any, index: number) => {
    if (e && e.target) {
      invites[index].email = e.target.value;
      setInvites([...invites]);
    }
  }, [invites]);

  const addMoreInvites = useCallback(() => {
    setInvites([...invites, ...emptyInvites]);
  }, [invites]);

  function sendInvites() {
    invites.map((invite) => {
      if (invite.email != '') {
        createViewOnlyCollaborator(projectId as string, {
          email: invite.email,
          status: 'invited',
          time: Date.now(),
        })
      }
    })
    setInvites(emptyInvites)
  }

  return (
    <div className="relative container border border-gray-200 w-full h-auto bg-white rounded-md py-6 pb-16">
      <div className="flex justify-between px-8 items-center">
        <h1 className="text-xl font-medium">Add New View-Only Collaborators</h1>
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
                  placeholder="Enter email address"
                  autoComplete="off"
                />
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
        <p className="text-gray-400 text-sm">Learn more about <a className="text-blue-600 hover:text-blue-700">Project
          View-Only Collaborators</a></p>
        <MediumBlackButton click={() => sendInvites()}>Invite Collaboraators</MediumBlackButton>
      </div>
    </div>
  );
}
