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
import {useRouter} from "next/router";
import {ReactElement, useCallback, useEffect, useState} from "react";
import {Project} from '@/types/project';
import {Link} from 'react-scroll';
import {ArrowLeftIcon} from "@heroicons/react/solid";
import BlackNavLayout from "@/components/layouts/BlackNavLayout";
import GeneralDetails from "@/components/create-project/GeneralDetails";
import GeneralModelDetails from "@/components/project/create-model/GeneralModelDetails";
import ErrorAlert from '@/components/general/alerts/ErrorAlert';
import {classNames} from "@/utils/general";
import {createProject, createProjectUnderTeam, getProjectsOnce, getTeamProjectsOnce} from "@/services/projects-store";
import {useTeam} from "@/libs/team";
import CurrentStage from "@/components/project/create-model/CurrentStage";
import Framework from "@/components/project/create-model/Framework";
import GetStarted from "@/components/project/create-model/GetStarted";
import {Model, ModelType} from "@/types/model";
import {createModel} from "@/services/models-store";

const options = [
  {
    id: 1,
    content: "Project Details",
    dot: "h-4 w-4 rounded-full flex items-center justify-center",
    stringID: "GD",
  },
  {
    id: 2,
    content: "Create Your First Model",
    stringID: "FM",
    dot: "h-4 w-4 rounded-full flex items-center justify-center",
  },
  {
    id: 3,
    content: "Current Stage",
    dot: "h-4 w-4 rounded-full flex items-center justify-center",
    stringID: "DGS",
  },
  {
    id: 4,
    content: "Framework / Starter Project",
    dot: "h-4 w-4 rounded-full flex items-center justify-center",
    stringID: "F",
  },
  {
    id: 5,
    show: false,
    content: "Get Started",
    dot: "h-4 w-4 rounded-full flex items-center justify-center",
    stringID: "GS",
  },
];

function setUpdatedValues(values: any, state: any) {
  return {...state, ...values};
}

const CreateProject = () => {
  const {active} = useTeam();
  const {user, loading} = useAuth();
  const [currTab, setTab] = useState('GD');
  const [canGoBack, setCanGoBack] = useState(true);
  const [stage, setStage] = useState('just-getting-started');
  const [message, setMessage] = useState("Let's build something awesome.");
  const [type, setModelType] = useState<ModelType>('strategy');
  const [framework, setFramework] = useState<string>('blankly');
  const [errors, setErrors]: any[] = useState([]);

  const router = useRouter();
  const {uid} = useAuth();

  // temp fix
  useEffect(() => {
    if (active.id) {
      router.push(`/${active.id}/create`)
    }
  }, [active.id, router])

  const [formValues, setValues] = useState({
    name: "",
    description: "",
  });

  const [modelValues, setModelValues] = useState({
    name: "",
    description: "",
  });

  const {
    query: {name, description},
  } = router;

  useEffect(() => {
    if (active.type === 'user') {
      getProjectsOnce(uid).then((val) => {
        if (val.docs.length === 0) {
          setMessage("Let's create your first project")
          setCanGoBack(false);
        }
      })
    } else if (active.type === 'team') {
      getTeamProjectsOnce(active.id).then((val) => {
        if (val.docs.length === 0) {
          setMessage("Let's create your team's first project")
          setCanGoBack(false);
        }
      })
    }
  }, [active.id, active.type, uid])

  const validateAndSubmit = useCallback(() => {
    setErrors([]);
    let newErrors: any[] = [];
    if (formValues.name.length == 0) {
      newErrors.push("Project Name is Required");
    }
    if (modelValues.name.length == 0) {
      newErrors.push("Model Name is Required");
    }
    if (newErrors.length === 0 && user) {
      if (active.type === 'user') {
        const project: Partial<Project> = {
          createdAt: Date.now() / 1000,
          lastAccessed: Date.now() / 1000,
          creator: user.uid,
          creatorType: 'user',
          description: formValues.description,
          name: formValues.name,
          numModels: 0
        }
        createProject(project, user.uid).then((id) => {
          const model: Partial<Model> = {
            description: modelValues.description,
            name: modelValues.name,
            type,
            lifecycleStatus: {
              running: false,
              message: "Awaiting Setup",
            },
            startStage: stage,
            framework,
          }
          // createModel(id as string, model);
          router.push(`/${id}`);
        });
      } else {
        const project: Partial<Project> = {
          createdAt: Date.now() / 1000,
          lastAccessed: Date.now() / 1000,
          creator: active.id,
          creatorType: 'team',
          description: formValues.description,
          name: formValues.name,
          numModels: 0
        }
        createProjectUnderTeam(project, uid, active.id).then((id) => {
          const model: Partial<Model> = {
            description: modelValues.description,
            name: modelValues.name,
            type,
            startStage: stage,
            lifecycleStatus: {
              running: false,
              message: "Awaiting Setup",
            },
            framework,
          }
          createModel(id as string, model);
          router.push(`/${id}`);
        });
      }

    } else {
      setErrors(newErrors);
    }

  }, [formValues, modelValues, user, active.type, active.id, type, stage, framework, router, uid])

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin");
      }
    }
  });

  return (
    <div className="bg-white">
      <div>
        <div className="max-w-6xl mx-auto pt-32 pb-20 z-10">
          {
            canGoBack ? (
              <button className="inline-block h-10" onClick={() => router.push('/dashboard')}>
                <ArrowLeftIcon className="w-4 h-4 inline align-middle"/>
                <p className="roboto inline pl-2 align-middle">Back to projects</p>
              </button>
            ) : null
          }
          <div className="w-1/3">
            <h1 className="text-4xl font-semibold mt-7">
              {message}
            </h1>
            <a href="https://blankly.finance/links/pNZXjBH6cAREZGsc9" target="_blank" rel="noreferrer"
               className="text-blue-500 block my-2">See a Demo Model <span aria-hidden="true">&rarr;</span></a>
            <p className="roboto text-gray-400 pt-3 w-3/4">
              Follow the steps so we can get you up and running in no time
            </p>
          </div>
        </div>
        <div className="bg-gray-50">
          <div className="max-w-6xl h-auto mx-auto z-10 flex">
            <div className="pt-32 w-1/3 inline">
              {/* SIDEBAR NAV */}
              <div className="flow-root">
                <ul role="list" className="-mb-8">
                  {options.map((event, eventIdx) => (
                    <div key={event.id}>
                      <Link to={event.stringID} smooth={true}>
                        <li onClick={() => setTab(event.stringID)}>
                          <div className="relative pb-8">
                            {/* Creates the line */}
                            {eventIdx !== options.length - 1 ? (
                              <span
                                className="absolute top-2 left-2 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"/>
                            ) : null}
                            <div className="relative flex space-x-4">
                              <div>
                                <span
                                  className={classNames(event.dot, currTab === event.stringID ? 'bg-gray-900' : 'bg-gray-300')}></span>
                              </div>
                              <div className="min-w-0 flex-1 flex justify-between space-x-4">
                                <div className="text-md text-gray-500 cursor-pointer inconsolata -mt-1">
                                  {event.content}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </Link>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-2/3 inline -mt-28 pb-20">
              <div className="pb-10">
                <div id="GD">
                  <GeneralDetails update={(e: any) => {
                    setValues(setUpdatedValues(e, formValues))
                  }} name={name as string} desc={description as string}/>
                </div>
                <hr className="my-10"/>
                <div className="pb-10 mt-10">
                  <div id="FM">
                    <GeneralModelDetails first={true} update={(e: any) => {
                      setModelValues(setUpdatedValues(e, modelValues))
                    }} name={name} desc={description}/>
                  </div>
                  {/* <div id="T" className="mt-10">
                    <ModelTypeSelect update={(e: any) => {
                      setModelType(e);
                    }} />
                  </div> */}
                  <div id="DGS" className="mt-10">
                    <CurrentStage update={(e: any) => {
                      setStage(e);
                    }}/>
                  </div>
                  {
                    stage === 'starting' ?
                      null : (
                        <div id="F" className="mt-10">
                          <Framework update={(e: any) => {
                            setFramework(e);
                          }} live={stage === 'actively-running-a-model' || stage === 'deploying-your-model'}/>
                        </div>
                      )
                  }
                  <hr className="my-10"/>
                  <div className="mt-10" id="GS">
                    <div className="mb-5">
                      <ErrorAlert errors={errors}/>
                    </div>
                    <GetStarted clicked={validateAndSubmit}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

};

CreateProject.getLayout = function getLayout(page: ReactElement) {
  return <BlackNavLayout>{page}</BlackNavLayout>;
};

export default CreateProject;
