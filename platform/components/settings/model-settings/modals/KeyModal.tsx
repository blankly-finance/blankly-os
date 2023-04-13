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

import {Fragment, useCallback, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useFormik} from 'formik';
import {useAuth} from '@/libs/auth';
import {useRouter} from 'next/router';
import {generateKey} from '@/services/deployment-api-store';


const validate = (values: { name: string }) => {
  const errors: any = {};

  if (!values.name) {
    errors.password = 'API Key Name is Required';
  }
  return errors;
};


const NotFinishedModal = (props: { open: boolean, close: any }) => {
  const closeModal = useCallback(() => {
    props.close();
  }, [props]);

  const [apiKey, setApiKey] = useState<any>();
  const [apiPass, setApiPass] = useState<any>();
  const { token } = useAuth();
  const router = useRouter();
  const [generating, setGenerating] = useState<any>(false);
  const { projectId } = router.query;

  const close = useCallback(() => {
    props.close();
    setApiKey(null);
    setApiPass(null);
  }, [props])

  const formik = useFormik(
    {
      initialValues: {
        name: '',
      },
      validateOnBlur: true,
      validate,
      onSubmit: (values) => {
        setGenerating(true);
        generateKey(token, projectId as string, values.name).then((response: any) => {
          setApiKey(response.apiKey);
          setGenerating(false);
          setApiPass(response.apiPass);
        })
      },
    }
  );

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-8 pt-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {/* <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <KeyIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                </div> */}
                <div className="mt-3 sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 text-center">
                    {!apiPass ? "Generate a New Blankly API Key" : "Save these keys, as the pass will only be shown once"}
                  </Dialog.Title>
                  <div className="mt-8">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="API Key Name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                  </div>
                  {
                    apiKey && apiPass && (
                      <>
                        <div className="pt-4">
                          <p className="text-sm text-gray-400">
                            API Key
                          </p>
                          <p className="bg-gray-200 p-2 px-4 mt-2 rounded-md inconsolata">
                            {apiKey}
                          </p>
                        </div>
                        <div className="pt-4">
                          <p className="text-sm text-gray-400">
                            API Pass
                          </p>
                          <p className="bg-gray-200 p-2 px-4 mt-2 rounded-md inconsolata">
                            {apiPass}
                          </p>
                        </div>
                      </>
                    )
                  }
                </div>
              </div>
              <div className="mt-8 ">
                {
                  !apiKey ? (
                    <button
                      type="submit"
                      onClick={() => formik.submitForm()}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm text-white bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      {
                        generating ? (
                          <svg className="animate-spin mt-1 h-5 w-5 text-white-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : "Generate New Key"
                      }
                    </button>
                  ) : (
                    <button
                      onClick={close}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm text-white bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Close
                    </button>
                  )
                }

              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default NotFinishedModal;
