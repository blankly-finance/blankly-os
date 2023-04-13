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

import {useAuth} from "@/libs/auth";
import React, {ReactElement, useState} from "react";
import GeneralDetails from "@/components/create-team/GeneralDetails";
import {TeamInvites} from "@/components/create-team/TeamInvites";
import TeamCreateLayout from "@/components/layouts/TeamCreateLayout";
import ContactInfo from "@/components/create-team/ContactInfo";
import MediumBlackButton from "@/components/general/buttons/MediumBlackButton";
import ErrorAlert from "@/components/general/alerts/ErrorAlert";
import {useRouter} from "next/router";
import {updateUser} from "@/services/user-store";
import {addDoc, setDoc} from "@/libs/firestore";

function setUpdatedValues(values: any, state: any) {
  return {...state, ...values};
}

const CreateProject = () => {
  const {user, uid} = useAuth()

  // used for new team creation
  const [cid, setCid] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [formValues, setValues] = useState({
    teamName: "",
    name: "",
    email: "",
    phone: "",
    description: "",
    plan: "",
    invites: [{email: "", role: ""}, {email: "", role: ""}, {email: "", role: ""}],
  });

  // used to validate if all parts are completed
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<any>([])
  const [valid, setValid] = useState({
    general: false,
    invites: true,
    contact: false,
    plan: false,
    payment: false,
  })

  // used for creation
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const validateAndCreate = () => {
    let newErrors: any[] = []

    if (!valid.general) {
      newErrors.push("Ensure that your team has a name")
    }

    if (!valid.invites) {
      newErrors.push("Ensure that all invited members have a valid email address")
    }

    if (!valid.contact) {
      newErrors.push("Ensure that you provide all the required contact information in the required format")
    }

    if (newErrors.length == 0) {
      setErrors([])
      setCreating(true)
      addDoc("teams", {
        name: formValues.teamName,
        description: formValues.description,
        createdAt: Date.now() / 1000,
        currPlan: "Pro",
      }).then((doc: any) => {
        const teamId = doc.id
        updateUser(uid, {activeId: teamId})
        setDoc(`projects/${teamId}`, {id: teamId})
        setDoc(`teams/${teamId}/members/${uid}`, {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          joinedAt: Date.now() / 1000,
          level: 15,
        })
        setDoc(`users/${uid}/teams/${teamId}`, {
          level: 15,
        })
        const invitePromises: any = formValues.invites?.map(async (invite: any) => {
          if (invite.email != "") {
            return addDoc(`teams/${teamId}/invites`, {
              email: invite.email,
              inviterName: user.firstName + " " + user.lastName,
              inviterId: uid,
              level: Number(invite.role),
              time: Date.now() / 1000,
            })
          }
        })
        Promise.all(invitePromises).then(() => {
          router.push(router.basePath + `/${teamId}`)
        })
      })
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <>
          <div>
            <div id="GD">
              <GeneralDetails update={(e: any) => {
                setValues(setUpdatedValues(e, formValues))
              }} isValid={(e: boolean) => {
                let status = valid;
                status.general = e;
                setValid(status)
              }}
              />
            </div>
            <div id="TI" className="mt-10">
              <TeamInvites update={(e: any) => {
                formValues.invites = e;
                setValues(formValues)
              }} isValid={(e: boolean) => {
                let status = valid;
                status.invites = e;
                setValid(status)
              }}/>
            </div>
            <div id="CI" className="mt-10">
              <ContactInfo update={(e: any) => {
                const key = Object.keys(e)[0];
                // @ts-ignore
                formValues[key] = e[key]
                setValues(formValues)
              }} isValid={(e: boolean) => {
                let status = valid;
                status.contact = e;
                setValid(status)
              }}
              />
            </div>
            <div id="DGS" className="mt-10">
              <ErrorAlert errors={errors}/>
            </div>
            <div className="mt-10">
              <MediumBlackButton click={() => validateAndCreate()} width="full" disabled={creating}>
                {creating ? "Creating your team..." : "Create Team"}
              </MediumBlackButton>
            </div>
          </div>
    </>
  )
};


CreateProject.getLayout = function getLayout(page: ReactElement) {
  return <TeamCreateLayout>{page}</TeamCreateLayout>;
}
;

export default CreateProject;
