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

import {useRouter} from "next/router";
import React, {ReactElement, useEffect, useState} from "react";
import ModelLayout from "@/components/layouts/ModelNavLayout";
import {useFormik} from "formik";
import BacktestArgsForm from "@/components/project/backtest/BacktestArgsForm";
import ErrorAlert from "@/components/general/alerts/ErrorAlert";
import {isGreaterThanToday} from "@/utils/date";
import NotFinishedModal from "@/components/general/modals/NotFinishedModal";

import axios from 'axios';
import moment from "moment";
import {useAuth} from "@/libs/auth";
import {getModelOnce} from "@/services/models-store";

const validate = (values: any) => {
    const errors: any = {};

    if (!values.description) {
        errors.description = 'A Backtest Description is Required';
    }

    return errors;
};

function NewBacktest() {
    const router = useRouter();
    const {projectId, modelId} = router.query;
    const [goodBacktestModal, setGoodBacktestModal] = useState(false);
    const [errors, setErrors] = useState<any>([]);
    const [args, setArgs] = useState<any>({});
    const {token, loading} = useAuth();
    const [deployedVersion, setDeployedVersion] = useState("");

    const formik = useFormik({
        initialValues: {
            label: '',
            description: '',
        },
        validate,
        onSubmit: (values) => {
            let foundErrors: string[] = [];
            if (args) {
                if (args['initial_values']) {
                    const usd = args['initial_values']['USD'];
                    const usdt = args['initial_values']['USDT'];
                    if (usd || usdt) {
                        if (!args.start_date) {
                            foundErrors = [...foundErrors, 'Backtest Start Date is Required']
                        }
                        if (!args.end_date) {
                            foundErrors = [...foundErrors, 'Backtest End Date is Required']
                        } else if (isGreaterThanToday(args.end_date)) {
                            foundErrors = [...foundErrors, 'End Date Can\'t be Greater than Today']
                        }

                        if (args.start_date === args.end_date) {
                            foundErrors = [...foundErrors, 'Start Date and End Date Shouldn\'t Be the Same']
                        }
                    } else {
                        foundErrors = [...foundErrors, 'USD or USDT is Required']
                    }
                } else {
                    foundErrors = [...foundErrors, 'Some Initial Value is Required']
                }
            } else {
                foundErrors = [...foundErrors, 'Backtest Arguments are Required']
            }
            if (foundErrors.length === 0) {
                // @ts-ignore
                let dataReq = {
                    modelId: modelId,
                    projectId: projectId,
                    versionId: deployedVersion,
                    plan: 'slow',
                    backtestArgs: JSON.stringify({
                        initial_values: args['initial_values']['USD'] ? args['initial_values']['USD'] : args['initial_values']['USDT'],
                        start_date: moment(args.start_date).valueOf() / 1000,
                        end_date: moment(args.end_date).valueOf() / 1000,
                    }),
                    backtestDescription: formik.values.description,
                }
                axios({
                    method: 'post',
                    url: `${process.env.NEXT_PUBLIC_URL_DEPLOYMENT_API}/model/backtest-uploaded-model`,
                    headers: {token: token},
                    data: dataReq,
                })
                router.push(`/${projectId}/${modelId}/backtests`)
            }
            setErrors(foundErrors);
        },
    });

    useEffect(() => {
        if (!loading) {
            getModelOnce(projectId as string, modelId as string).then((doc) => {
                const model: any = doc.data();
                setDeployedVersion(model.deployedVersion);
            })
        }
    }, [loading, modelId, projectId]);

    return (
        <div className="max-w-4xl mx-auto my-12 mb-36 roboto">
            <div>
                <p className="text-gray-400 text-sm mb-1">
                    <button onClick={() => router.push(`/${projectId}/${modelId}/backtests`)}
                            className="inline text-blue-600 mr-1">Backtests
                    </button>
                    / Create New Backtest
                </p>
                <h1 className="text-3xl font-semibold mt-4">
                    Run a New Backtest
                </h1>
                <p className="text-gray-400 text-md mt-1">
                    Run a backtest for your recent models in the cloud
                </p>
                <button className="text-blue-600 text-sm mt-1">
                    How do I make a good backtest?
                </button>
                <NotFinishedModal open={goodBacktestModal} close={() => setGoodBacktestModal(false)}
                                  type={"documentation"}
                                  featureName={"good-backtests"}/>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="mt-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-md font-medium text-black"
                        >
                            Backtest Label
                        </label>
                        <div className="mt-1">
                            <input
                                id="label"
                                name="label"
                                type="text"
                                placeholder="My Awesome Label"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.label}
                                className="appearance-none block w-2/5 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-700 focus:border sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label
                            htmlFor="description"
                            className="block text-md font-medium text-black"
                        >
                            Backtest Description
                        </label>
                        <div className="mt-1">
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter a backtesting commit messsage of what you're testing..."
                                rows={5}
                                required
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                className="appearance-none block w-full p-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-700 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto flex items-center justify-between my-8 ">
                    <p className="roboto font-medium text-black text-2xl">
                        Backtest Arguments
                    </p>
                </div>
                <div className="mb-8">
                    <ErrorAlert errors={[...errors, formik.errors.label, formik.errors.description]}/>
                </div>
                <div>
                    <BacktestArgsForm update={(result: any) => setArgs(result)}/>
                </div>
                <div className="mt-8">
                    <button type="submit"
                            className="w-full rounded-md py-2.5 px-6 text-sm border bg-black hover:bg-gray-800 focus:ring-2 focus:ring-gray-800 text-white">
                        Run Backtest
                    </button>
                </div>
            </form>
        </div>
    )
}

NewBacktest.getLayout = function getLayout(page: ReactElement) {
    return <ModelLayout>{page}</ModelLayout>;
};


export default NewBacktest
