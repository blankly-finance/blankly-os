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

import React from 'react';
import Link from "next/link";
import {useFormik} from 'formik';

const validate = (values: any) => {
    const errors: any = {};

    if (!values.name) {
        errors.name = 'First Name is Required';
    }

    if (!values.description) {
        errors.description = 'Last Name is Required';
    }

    return errors;
};

function StartNewProjectModal() {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validate,
        onSubmit: async (values) => {
            // TODO
        },
    });

    return (
        <div
            className="h-full bg-white flex flex-col  items-center justify-center relative z-10 rounded-md shadow-xl px-10 py-8">
            <div className="flex flex-row items-center justify-between w-full">
                <h3 className="max-w-2xl text-2xl inconsolata font-bold text-black">
                    Start a New Project
                </h3>
            </div>
            <div className="my-1 mt-4">
                <p className="my-2">Get up and running in minutes, easily set up a project so you can start building
                    models.</p>
                <a href="blankly-platform-open-source-main/components/dashboard" className="my-2"><p className="text-blue-600">What even are projects?</p></a>
                <div className="mt-8">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Project Name
                    </label>
                    <div className="mt-1">
                        <input
                            id="name"
                            name="name"
                            type="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Project Description
                    </label>
                    <div className="mt-1">
                                <textarea
                                    id="description"
                                    name="description"
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                    </div>
                </div>
            </div>
            <Link href={{
                pathname: "/create",
                query: {name: formik.values.name, description: formik.values.description,}
            }}>
                <a
                    className="block my-2 border w-full rounded-md bg-black text-center text-white py-3 text-sm mt-5 hover:border-gray-800 hover:bg-gray-800">
                    Continue Project Creation
                </a>
            </Link>
        </div>
    )
}

export default StartNewProjectModal
