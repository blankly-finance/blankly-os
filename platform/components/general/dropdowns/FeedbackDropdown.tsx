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

import {Fragment, useCallback, useEffect, useState} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {useAuth} from "@/libs/auth";
import {postFeedback} from "@/services/feedback-store";
import {generateId} from '@/libs/firestore';
import {uploadFileString} from '@/libs/storage';
import {toPng} from 'html-to-image';

export default function FeedbackDropDown() {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Feedback")
  const {user} = useAuth()

  function handleUserInput(event: any) {
    setFeedback(event.target.value)
  }

  const capture = useCallback(() => {
    const id = generateId();
    toPng(document.body).then((url) => {
      uploadFileString(`/screenshots/${id}`, url)
    })
  }, [])

  function submitFeedback() {
    const id = generateId();
    toPng(document.body).then((url) => {
      return uploadFileString(`/screenshots/${id}`, url).then((data) => {
        return data.ref.getDownloadURL();
      })
    }).then((url) => {
      return postFeedback(email, feedback, url);
    }).then(() => {
      setMessage("Sent!");
    })
  }

  useEffect(() => {
    if (user) {
      setEmail(user.email)
    }
  }, [user])

  return (
    <Menu as="div" className="relative z-10 inline-block mx-auto">
      <div>
        <Menu.Button className="relative z-10 h-9 w-16 relative rounded-full overflow-hidden object-cover">
          {message}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items static
                    className="origin-top-right absolute z-24 -right-16 mt-2 w-72 py-4 rounded-md shadow-xl border border-gray-100 bg-white focus:outline-none">
          <div className="py-1 z-10 flex flex-col items-center justify-center">
            <span
              className='text-md text-gray-900 px-4 py-2 block flex font-semibold'>Send an Issue, Idea, or Feedback</span>
            <div className='text-gray-900 block text-xs w-5/6 mb-3 flex items-center'>
                            <textarea
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                              value={feedback}
                              placeholder="I noticed that..."
                              onChange={handleUserInput}
                              onKeyDown={(e) => {
                                if (e.code === "Space") {
                                  e.stopPropagation();
                                }
                              }}
                            />
            </div>
          </div>
          <div className="flex w-full justify-center space-x-2">
            <Menu.Item>
              <button onClick={submitFeedback}
                      className='text-gray-700 bg-gray-100 hover:bg-gray-200 font-semibold block rounded-md w-5/6 py-1.5'>
                Send Feedback
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
