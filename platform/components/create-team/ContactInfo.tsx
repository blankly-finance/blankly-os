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

import {useState} from "react";
import {isEmail, isPhone} from "@/utils/general";
import ErrorAlert from "@/components/general/alerts/ErrorAlert";

const ContactInfo = (props: { update: Function, isValid?: Function }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const [errors, setErrors] = useState<any>([])
  const checkInput = () => {
    let newErrors: any[] = []

    if (name == "") {
      newErrors.push("A name is required in this form")
    }

    if (email !== "" && !isEmail(email)) {
      newErrors.push(`${email} is not a valid email number`);
    }

    if (phoneNumber !== "" && !isPhone(phoneNumber)) {
      newErrors.push(`${phoneNumber} is not a valid phone number`);
    }

    if (newErrors.length == 0) {
      setErrors([])
      if (props.isValid && email !== "" && phoneNumber !== "") {
        props.isValid(true)
      }
    } else {
      setErrors(newErrors)
      if (props.isValid) {
        props.isValid(false)
      }
    }
  }

  const handleBlur = (key: string, e: any) => {
    if (e && e.target) {
      checkInput()
      props.update({[key]: e.target.value});
    }
  }

  return (
    <div className="container shadow-lg w-full h-auto bg-white rounded-lg py-8 px-10 pb10">
      <div className="">
        <h1 className="text-2xl font-semibold">Contact Information</h1>
        <p className="text-sm mt-2 text-gray-600">
          Please provide some contact information for the billable representative of the team
        </p>
        <div className="mt-10">
          <ErrorAlert errors={errors}/>
        </div>
        <div>
          <p className="roboto text-sm mt-4 text-gray-700">Contact Name</p>
          <input
            onBlur={(e) => handleBlur('name', e)}
            type="text"
            name="projName"
            placeholder={"John Doe"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="projName"
            className=" focus:ring-gray-700 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md mt-2"
            autoComplete="off"
          />
        </div>
        <div>
          <p className="roboto text-sm mt-4 text-gray-700">Email</p>
          <input
            onBlur={(e) => handleBlur('email', e)}
            type="text"
            name="projName"
            placeholder={"example@example.com"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="projName"
            className=" focus:ring-gray-700 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md mt-2"
            autoComplete="off"
          />
        </div>
        <div>
          <p className="roboto text-sm mt-4 text-gray-700">Phone Number</p>
          <input
            onBlur={(e) => handleBlur('phone', e)}
            type="text"
            name="projName"
            placeholder={"123-456-7890"}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            id="projName"
            className=" focus:ring-gray-700 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md mt-2"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
