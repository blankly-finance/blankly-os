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
import {Link} from 'react-scroll';
import {ArrowLeftIcon} from "@heroicons/react/solid";
import GeneralModelDetails from "@/components/project/create-model/GeneralModelDetails";
import ErrorAlert from '@/components/general/alerts/ErrorAlert';
import {classNames} from "@/utils/general";
import {useTeam} from "@/libs/team";
import CurrentStage from "@/components/project/create-model/CurrentStage";
import Framework from "@/components/project/create-model/Framework";
import GetStarted from "@/components/project/create-model/GetStarted";
import ProjectDetailsLayout from "@/components/layouts/ProjectDetailsLayout";
import {createModel} from "@/services/models-store";
import {Model, ModelType} from "@/types/model";
import {getProjectOnce} from "@/services/projects-store";
import StarterModelsDetails from "@/components/project/details/StarterModelsDetails";

const options = [
  {
    id: 1,
    content: "General Details",
    dot: "h-4 w-4 rounded-full flex items-center justify-center",
    stringID: "GD",
  },
  {
    id: 2,
    content: "Current Stage",
    dot: "h-4 w-4 rounded-full flex items-center justify-center",
    stringID: "DGS",
  },
  {
    id: 3,
    content: "Framework / Starter Project",
    dot: "h-4 w-4 rounded-full flex items-center justify-center",
    stringID: "F",
  },
  {
    id: 4,
    show: false,
    content: "Get Started",
    dot: "h-4 w-4 rounded-full flex items-center justify-center",
    stringID: "GS",
  },
];

function setUpdatedValues(values: any, state: any) {
  return {...state, ...values};
}

const starterModels = [
  {
    name: "Crypto MACD Bot",
    labels: ["Momentum"],
    description: "A basic arbitrage model that does stuff",
    exchanges: {coinbase_pro: "coinbase_pro"},
    tickers: {"BTC-USD": "BTC-USD", "ETH-USD": "ETH-USD"},
    creatorUid: "sogE54jRuvf0X7ZHx3yrbTFav9O2",
    stats: {sortino: 1.78, sharpe: 2.04, cagr: 26.5}
  },
  {
    name: "LSTM Neural Network",
    labels: ["AI"],
    description: "A basic AI model that does stuff",
    exchanges: {coinbase_pro: "coinbase_pro"},
    tickers: {"BTC-USD": "BTC-USD"},
    creatorUid: "sogE54jRuvf0X7ZHx3yrbTFav9O2",
    stats: {sortino: 2.13, sharpe: 1.99, cagr: 21.5}
  },
  {
    name: "EV / EBITDA Arbitrage",
    labels: ["Fundamental"],
    description: "A basic fundamental model that does stuff",
    exchanges: {alpaca: "alpaca"},
    tickers: {"AAPL": "AAPL", "MSFT": "MSFT", "LMT": "LMT"},
    creatorUid: "S68D29iMBmSS81XVgBK2lSBg4xr2",
    stats: {sortino: 2.15, sharpe: 3.15, cagr: 19.5}
  }
];

const CreateModel = () => {
  const {active} = useTeam();
  const [createMode, setCreateMode] = useState("create");
  const {user, uid, loading, token} = useAuth();

  const [currTab, setTab] = useState('GD');
  const [stage, setStage] = useState('starting');
  const [type, setModelType] = useState<ModelType>('strategy');
  const [framework, setFramework] = useState<string>('blankly');
  const [errors, setErrors]: any[] = useState([]);
  const [numModels, setNumModels] = useState(0);
  const [formValues, setValues] = useState({
    name: "",
    description: "",
  });

  const router = useRouter();

  const {projectId} = router.query;

  const {
    query: {name, description},
  } = router;

  const validateAndSubmit = useCallback(() => {
    setErrors([]);
    let newErrors: any[] = [];
    if (formValues.name.length == 0) {
      newErrors.push("Project Name is Required");
    }
    if (newErrors.length === 0 && user) {
      const model: Partial<Model> = {
        description: formValues.description,
        name: formValues.name,
        type,
        startStage: stage,
        lifecycleStatus: {
          running: false,
          message: "Awaiting Setup",
        },
        framework,
        //  UPDATE THIS WHEN MODIFYING VERSIONS
        version: 1.0
      }
      createModel(projectId as string, model).then((id) => {
        router.push(`/${projectId}/${id}/onboarding`);
      });

    } else {
      setErrors(newErrors);
    }

  }, [formValues.name, formValues.description, user, type, stage, framework, projectId, uid, router])

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin");
      }
    }
  });

  useEffect(() => {
    getProjectOnce(projectId as string).then((doc: any) => {
      const data = doc.data();
      if (data) {
        setNumModels(data.numModels)
      } else {
        setNumModels(0);
      }
    })
  }, [projectId])

  return (
    <div className="bg-white">
      <div>
        <div className="max-w-6xl mx-auto pt-12 pb-20 relative">
          {
            numModels > 0 ?
              <button className="inline-block h-10" onClick={() => router.push(`/${projectId}`)}>
                <ArrowLeftIcon className="w-4 h-4 inline align-middle"/>
                <p className="roboto inline pl-2 align-middle">Back to models</p>
              </button> : null
          }
          <div className="w-1/3">
            <button className="inline-block text-gray-500"
                    onClick={() => router.push(`/${projectId}`)}>
              <ArrowLeftIcon className=" w-4 h-4 inline align-middle"/>
              <p className=" roboto inline pl-2 align-middle">Back to All Models</p>
            </button>
            <h1 className="text-3xl font-bold mt-7">
              Create A New Model
            </h1>
            <p className="roboto text-gray-400 pt-3 w-3/4">
              Follow the steps so we can get you up and running in no time
            </p>
          </div>
          <div className="absolute right-2 top-24 flex items-center">
            <div
              className={classNames("px-3 py-2 mx-2 font-medium text-sm rounded-md cursor-pointer transition", createMode === "create" ? "bg-gray-100" : "hover:bg-gray-100")}
              onClick={() => setCreateMode("create")}
            >
              Create New Model
            </div>
            <div
              className={classNames("px-3 py-2 mx-2 font-medium text-sm text-blue-500 rounded-md transition cursor-pointer", createMode === "premade" ? "bg-gray-100" : "hover:bg-gray-100")}
              onClick={() => setCreateMode("premade")}
            >
              Choose From Existing Models
            </div>
          </div>
        </div>
        <div className="bg-gray-50">
          {
            createMode === "create" ?
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
                                  <div
                                    className="min-w-0 flex-1 flex justify-between space-x-4">
                                    <div
                                      className="text-sm text-gray-500 cursor-pointer -mt-1">
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
                <div className="w-2/3 inline z-20 -mt-28 pb-20">
                  <div className="pb-10">
                    <div id="GD">
                      <GeneralModelDetails update={(e: any) => {
                        setValues(setUpdatedValues(e, formValues))
                      }} name={name} desc={description}/>
                    </div>
                    <div id="DGS" className="mt-10">
                      <CurrentStage update={(e: any) => {
                        setStage(e);
                      }}/>
                      <ErrorAlert errors={errors}/>
                    </div>
                    {
                      stage === 'starting' ?
                        null : (
                          <div id="F" className="mt-10">
                            <Framework update={(e: any) => {
                              setFramework(e);
                            }}
                                       live={stage === 'actively-running-a-model' || stage === 'deploying-your-model'}/>
                            <ErrorAlert errors={errors}/>
                          </div>
                        )
                    }
                    <div className="mt-10" id="GS">
                      <GetStarted clicked={validateAndSubmit}/>
                    </div>
                  </div>
                </div>
              </div>
              :
              <div className="max-w-6xl h-auto mx-auto z-10 flex">
                <StarterModelsDetails/>
              </div>
          }
        </div>
      </div>
    </div>

  )

};

CreateModel.getLayout = function getLayout(page: ReactElement) {
  return <ProjectDetailsLayout>{page}</ProjectDetailsLayout>;
};

export default CreateModel;
