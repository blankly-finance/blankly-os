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

import BlanklyActivelyRunning from "@/components/create-model/BlanklyActivelyRunning";
import BlanklyBacktesting from "@/components/create-model/BlanklyBacktesting";
import BlanklyDeploy from "@/components/create-model/BlanklyDeploy";
import BlanklyGettingStarted from "@/components/create-model/BlanklyGettingStarted";
import SlateActivelyRunning from "@/components/create-model/SlateActivelyRunning";
import SlateBacktesting from "@/components/create-model/SlateBacktesting";
import SlateDeployment from "@/components/create-model/SlateDeployment";
import SlateGettingStarted from "@/components/create-model/SlateGettingStarted";
import Dropdown from "@/components/general/dropdowns/Dropdown";
import BlackNavLayout from "@/components/layouts/BlackNavLayout";
import {getModelOnce} from "@/services/models-store";
import {getProjectOnce} from "@/services/projects-store";
import {Model} from "@/types/model";
import {ArrowLeftIcon} from "@heroicons/react/solid";
import {useRouter} from "next/router";
import {ReactElement, useEffect, useState} from "react";


const dropdown = [
    { label: "Just Getting Started", value: 0 },
    { label: "Backtesting", value: 1 },
    { label: "Deploying Your Model", value: 2 },
    { label: "Actively Running a Model", value: 3 }
]

const frameworks = [
    { value: 0, live: true, id: 'blankly', label: 'Blankly', logo: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/logos%2Fblankly-black.svg?alt=media&token=4caaee5a-0efe-47d8-a14f-3e0c6d3a26f0', description: 'Setup Time: ~30 seconds', users: '621 users' },
    { value: 1, live: false, id: 'backtesting-py', label: 'Backtesting.py', logo: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/logos%2Fbacktestingpy.png?alt=media&token=4d36d389-8a1d-4ab1-88e0-d1fa2eca84a9', description: 'Setup Time: ~2 minutes', users: '1200 users' },
    { value: 2, live: false, id: 'bt', label: 'bt', logo: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/logos%2Fbt.png?alt=media&token=1b8a454a-8c36-4d07-adde-bb90da9c6513', description: 'Setup Time: ~2 minutes', users: '2740 users' },
    { value: 3, live: false, id: 'jesse', label: 'Jesse', logo: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/logos%2Fjesse-bot.svg?alt=media&token=9df5ccb7-fc75-45f1-96b0-7b82962016ee', description: 'Setup Time: ~2 Minutes', users: '2740 users' },
    { value: 4, live: true, id: 'custom', label: 'Another / Custom Framework', logo: '', description: 'Setup Time: ~5-10 Minutes', users: '2740 users' },
]

const liveFrameworks = [
    { value: 0, live: true, id: 'blankly', label: 'Blankly', logo: 'https://firebasestorage.googleapis.com/v0/b/blankly-6ada5.appspot.com/o/logos%2Fblankly-black.svg?alt=media&token=4caaee5a-0efe-47d8-a14f-3e0c6d3a26f0', description: 'Setup Time: ~30 seconds', users: '621 users' },
    { value: 1, live: true, id: 'custom', label: 'Another / Custom Framework', logo: '', description: 'Setup Time: ~5-10 minutes ', users: '2740 users' },
]

const fixLabel = (label: string) => {
    if (label === 'Another / Custom Framework') {
        return 'custom';
    }
    const data = label.toLowerCase().split(' ').join('-').replace('.', '-');
    return data;
}

const findDropdownLabel = (label: string) => {
    const data = dropdown.map((value) => {
        return fixLabel(value.label);
    });

    const index = data.indexOf(label);
    if (index > -1) {
        return index;
    }
    return 0;
}

const findFrameworkLabel = (framework: string) => {
    const data = frameworks.map((value) => {
        return fixLabel(value.id);
    });

    const index = data.indexOf(framework);
    if (index > -1) {
        return index;
    }
    return 0;
}

const findLiveFrameworkLabel = (framework: string) => {
    const data = liveFrameworks.map((value) => {
        return fixLabel(value.id);
    });

    const index = data.indexOf(framework);
    if (index > -1) {
        return index;
    }
    return 0;
}



const Details = ({ modelName, projectName, stage, framework }: { modelName: string, projectName: string, stage: string, framework: string }) => {
    const combinations: any = {
        'just-getting-started-blankly': (
            <BlanklyGettingStarted modelName={modelName} projectName={projectName} />
        ),
        'backtesting-blankly': (
            <BlanklyBacktesting modelName={modelName} projectName={projectName} />
        ),
        'deploying-your-model-blankly': (
            <BlanklyDeploy modelName={modelName} projectName={projectName} />
        ),
        'actively-running-a-model-blankly': (
            <BlanklyActivelyRunning modelName={modelName} projectName={projectName} />
        ),
        'just-getting-started-custom': (
            <SlateGettingStarted modelName={modelName} projectName={projectName} />
        ),
        'backtesting-custom': (
            <SlateBacktesting modelName={modelName} projectName={projectName} />
        ),
        'deploying-your-model-custom': (
            <SlateDeployment modelName={modelName} projectName={projectName} />
        ),
        'actively-running-a-model-custom': (
            <SlateActivelyRunning modelName={modelName} projectName={projectName} />
        )
    }
    if (stage == 'just-getting-started' && framework !== 'blankly') {
        return (<SlateGettingStarted modelName={modelName} projectName={projectName} />)
    }
    if (stage == 'backtesting' && framework !== 'blankly') {
        return (<SlateBacktesting modelName={modelName} projectName={projectName} />)
    }
    const lookup: string = `${stage}-${framework}`
    if (combinations[lookup]) {
        return combinations[lookup]
    }
    return null
}

const Onboarding = () => {
    const router = useRouter();
    const { projectId, modelId } = router.query;
    const [project, setProject] = useState<any>();
    const [stage, setStage] = useState<any>('just-getting-started');
    const [labelStage, setLabelStage] = useState('Getting Started');
    const [framework, setFramework] = useState<any>('blankly');
    const [model, setModel] = useState<any>();

    useEffect(() => {
        getProjectOnce(projectId as string).then((val) => {
            const data = val.data();
            setProject(data);
        })
    }, [projectId]);
    useEffect(() => {
        getModelOnce(projectId as string, modelId as string).then((val) => {
            const data = val.data() as Model;
            if (data) {
                setModel(data);
                setStage(data.startStage);
                if (data.startStage === 'just-getting-started' && data.framework !== 'blankly') {
                    setFramework('custom')
                } else {
                    setFramework(data.framework);
                }
            }
        })
    }, [modelId, projectId]);
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-32">
            <button
                onClick={() => router.push(`/${projectId}`)}
                className="inline-block h-10 mb-3 text-gray-500"
            >
                <ArrowLeftIcon className="w-4 h-4 inline align-middle" />
                <p className="roboto inline pl-2 align-middle">Back to models</p>
            </button>
            <h1 className="text-3xl font-semibold">Alright, let&apos;s set up {model?.name}</h1>
            <div className="mt-6">
                <h2 className="roboto mt-3 mb-5 text-md w-4/5 text-gray-500">
                    Awesome! Now let&#39;s get started. Simply go through the setup steps
                    below in your working directory, and you&#39;ll be up and running in no
                    time.
                </h2>
                <div className="flex flex-col">
                    <div className="w-2/5">
                        <span className="text-xs text-gray-500">Current Stage</span>
                        <Dropdown update={(e: any) => { setStage(fixLabel(e.label)); setLabelStage(e.label); setFramework('blankly') }} options={dropdown} default={findDropdownLabel(stage)} />
                    </div>
                    {
                        stage == 'backtesting' ? (
                            <div className="w-2/5 mt-2">
                                <span className="text-xs text-gray-500">Current Framework</span>
                                <Dropdown update={(e: any) => setFramework(fixLabel(e.label))} options={frameworks} default={findFrameworkLabel(framework)} />
                            </div>
                        ) : (
                            <div className="w-2/5 mt-2">
                                <span className="text-xs text-gray-500">Current Framework</span>
                                <Dropdown update={(e: any) => setFramework(fixLabel(e.label))} options={liveFrameworks} default={findLiveFrameworkLabel(framework)} />
                            </div>
                        )
                    }

                </div>
                <h2 className="mt-10 text-2xl font-medium">Set Up Details for {labelStage}</h2>
                <p onClick={() => router.push(`/${projectId}/${modelId}/overview`)} className="text-sm cursor-pointer text-blue-500 hover:text-blue-600 mt-2">Actually, I&apos;ll just skip set up for now</p>
                <Details modelName={model?.name} projectName={project?.name} stage={stage} framework={framework} />
            </div>
        </div>
    );
}

Onboarding.getLayout = function getLayout(page: ReactElement) {
    return <BlackNavLayout border={true}>{page}</BlackNavLayout>;
};

export default Onboarding;
