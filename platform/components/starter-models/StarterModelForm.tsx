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

import {useFormik} from 'formik';
import {useRouter} from 'next/router';
import ErrorAlert from '../general/alerts/ErrorAlert';
import {createStarterModel} from "@/services/starter-models-store";
import {useAuth} from "@/libs/auth";


const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
        errors.name = 'Name is Required';
    }
    if (!values.url) {
        errors.name = 'Github URL is Required';
    }
    if (!values.description) {
        errors.description = 'Description is Required';
    }
    if (!values.modelId) {
        errors.modelId = 'Model ID is Required';
    }
    if (!values.backtestId) {
        errors.backtestId = 'Backtest ID is Required'
    }
    if (!values.tags) {
        errors.tags = 'Tags are Required'
    }

    return errors;
};


const StarterModelForm = (props: any) => {
    const {uid} = useAuth();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            tags: '',
            backtestId: '',
            modelId: '',
            url: ''
        },
        validate,
        onSubmit: async (values) => {
            const tags = values.tags.split(",");
            createStarterModel(uid, values.name, values.description, values.backtestId, values.modelId, tags, values.url);
            router.push('/');
        }
    });

    return (
        <div>
            {formik.errors && formik.touched.name && formik.touched.description && formik.touched.modelId && formik.touched.tags && formik.touched.backtestId ?
                <ErrorAlert
                    errors={[formik.errors.name, formik.errors.description, formik.errors.modelId, formik.errors.tags, formik.errors.backtestId]}/> : null}
            <form className="space-y-6 mt-4" onSubmit={formik.handleSubmit}>
                <div>
                    <h1 className="font-semibold text-xl mb-6">Model Information</h1>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        New Model Name
                    </label>
                    <div className="mt-1">
                        <input
                            id="name"
                            name="name"
                            placeholder='The Awesome Model'
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}

                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm :opacity-50"
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
                            placeholder='This is an awesome model'
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                    </div>
                </div>
                <hr className='my-12 block'/>
                <h1 className="font-semibold text-xl text-blue-500">Model Data</h1>
                <div>
                    <label
                        htmlFor="url"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Github URL
                    </label>
                    <div className="mt-1">
                        <input
                            id="url"
                            name="url"
                            type="text"
                            placeholder='https://github.com/blankly-finance/examples/tree/main/leveraged-SPY'
                            onChange={formik.handleChange}
                            value={formik.values.url}

                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm :opacity-50"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="url"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Model ID
                    </label>
                    <div className="mt-1">
                        <input
                            id="modelId"
                            name="modelId"
                            type="text"
                            placeholder='wa2r4KyQwtFZxBSrehsS'
                            onChange={formik.handleChange}
                            value={formik.values.modelId}

                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm :opacity-50"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="backtest"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Backtest ID
                    </label>
                    <div className="mt-1">
                        <input
                            id="backtestId"
                            name="backtestId"
                            placeholder='a3d6500d-c797-4565-a3d0-2e52af562be6'
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.backtestId}

                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm :opacity-50"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Model Tags (Separated by Commas Without Spaces In Between)
                    </label>
                    <div className="mt-1">
                        <input
                            id="tags"
                            name="tags"
                            type="text"
                            placeholder='momentum,neural network'
                            onChange={formik.handleChange}
                            value={formik.values.tags}

                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm :opacity-50"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md  text-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Submit Starter Model
                </button>
            </form>
        </div>
    );
}

StarterModelForm.defaultProps = {
    redirect: '/'
};

export default StarterModelForm;
