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

import {Fragment, useCallback} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {updateModel} from '@/services/models-store';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';


const validate = (values: any) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = 'Model Name is Required';
  }
  if (!values.description) {
    errors.description = 'Model Description is Required';
  }
  return errors;
};

export default function NoModelNameModal(props: { projectId: string, id: string, open: boolean, close: any }) {
  const id = props.id;
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validate,
    onSubmit: (values) => {
      if (props.projectId && id) {
        updateModel(props.projectId, id, {...values}).then(
          () => {
            router.push(`/${props.projectId}/${id}/overview`);
            closeModal();
          }
        )
      }

    },
  });
  const closeModal = useCallback(() => {
    props.close();
  }, [props]);

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
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
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
              className="inline-block align-bottom bg-white rounded-lg px-8 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-8">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Your Model {id} Doesn&apos;t Have a Name Yet
                  </Dialog.Title>
                  <div className="mt-8">
                    <p className="text-sm text-gray-500">
                      Add a name and description so you can easily identify this in the future
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <form className="space-y-6 mt-4" onSubmit={formik.handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Model Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        autoComplete="name"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:ring-1 focus:border-gray-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:ring-1 focus:border-gray-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Update Model Details
                  </button>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
