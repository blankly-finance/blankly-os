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
import {ReactElement, useEffect, useState} from "react";
import ModelLayout from "@/components/layouts/ModelNavLayout";
import BacktestTable from "@/components/project/backtest/tables/BacktestTable";
import {getModelSubscription} from "@/services/models-store";
import NotFinishedModal from "@/components/general/modals/NotFinishedModal";
import LastDeployed from "@/components/project/versions/LastDeployed";
import GraphManagement from "@/components/project/live/GraphManagement";
import {getTrades} from "@/services/trades-store";
import OutlineButton from "@/components/general/buttons/OutlineButton";
import BlackButton from "@/components/general/buttons/BlackButton";
import SignalsOverview from "@/components/project/screeners/SignalsOverview";
import MediumBlackButton from "@/components/general/buttons/MediumBlackButton";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/solid";
import ServicesOverview from "@/components/project/services/ServicesOverview";
import {usePerms} from "@/libs/perms";
import {useStarterModel} from "@/contexts/StarterModelContext";
import StarterModelsPrompt from "@/components/project/overview/StarterModelsPrompt";
import {useTeam} from "@/libs/team";

const BacktestHistory = () => {
  const router = useRouter();

  const [isCustomDataOpen, setCustomData] = useState(false);
  const [isMoreBacktestsDocsOpen, setMoreBacktestsDocs] = useState(false);

  const {projectId, modelId} = router.query;

  // TODO: this is never changed?
  const [hasBacktests, setBacktests] = useState(true);

  if (!hasBacktests) {
    return null;
  }

  return <div className="h-auto mb-36 p-5 md:px-0">
    <div className="max-w-6xl mx-auto mt-12">
      <div className="flex items-center">
        <div className="md:w-1/2">
          <h1 className="text-2xl font-semibold text-gray-900 roboto">
            Backtest History
          </h1>
          <p className="roboto text-sm text-gray-400 mt-2">
            Tests that have been deployed to the cloud.
            <br/>
            <button className="roboto text-left text-sm text-blue-500"
                    onClick={() => setMoreBacktestsDocs(true)}>
              Learn to make the most of your backtests
            </button>
          </p>
        </div>
        <div className="w-1/2 text-right hidden md:block">
          <OutlineButton click={() => router.push(`/${projectId}/${modelId}/backtests`)}>
            View All Backtests
          </OutlineButton>
        </div>
      </div>
      <div className="mt-6">
        <BacktestTable/>
      </div>
    </div>
    <NotFinishedModal open={isCustomDataOpen} type="feature"
                      close={() => setCustomData(false)} featureName="data-connectors"/>
    <NotFinishedModal open={isMoreBacktestsDocsOpen} type="documentation"
                      close={() => setMoreBacktestsDocs(false)} featureName="most-of-backtests"/>
  </div>;
}

const OverviewBody = ({model, trades}: { model: any, trades: any }) => {
  const router = useRouter();
  const {projectId, modelId} = router.query;

  if (model.type === 'screener') {
    return <SignalsOverview model={model}/>
  }

  if (model.type === 'service') {
    return <ServicesOverview model={model}/>
  }

  if (projectId === 'starters') {
    return <StarterModelsPrompt id={modelId as string}/>
  }

  if (!model.deployedVersion || !model.tickers || !model.exchanges) {
    return <div className="w-full h-auto bg-white pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="pt-10 flex items-center">
          <div className="w-1/2">
            <h1 className="text-2xl font-semibold text-gray-900 roboto">
              Live Strategy Deployment
            </h1>
            <p className="roboto text-sm text-gray-400 mt-2">
              Current Version
              Deployed: {model.deployedVersion ? model.deployedVersion : "None"}
            </p>
            <div className="w-max">
            </div>
          </div>
        </div>
      </div>
      {
        model.deployedVersion && model.lifecycleStatus.endAt && (model.tickers === null && model.exchanges === null) ?
          (
            <div
              className="max-w-7xl m-12 p-24 mx-auto h-fit flex flex-col justify-center items-center border border-gray-200 rounded-md">
              <h2 className="text-2xl font-medium my-2 text-red-500">Looks like your model ran
                into an error</h2>
              <p className="text-gray-500 my-2 mb-8">Check the logs to debug what happened
                with your setup and
                installation</p>
            </div>
          ) : (
            <>
              {
                model.deployedVersion && model.lifecycleStatus.message === 'Deploying' ? (
                  <div
                    className="max-w-7xl m-12 p-24 mx-auto h-fit flex flex-col justify-center items-center border border-gray-200 rounded-md">
                    <h2 className="text-2xl font-medium my-2">Your model is building and
                      being deployed as we speak</h2>
                    <p className="text-gray-500 my-2 mb-8">Check out the live logs to see
                      its current progress</p>
                  </div>
                ) : (
                  <div
                    className="max-w-7xl m-12 p-24 mx-auto h-fit flex flex-col justify-center items-center border border-gray-200 rounded-md">
                    <h2 className="text-2xl font-medium my-2">Looks like you haven&apos;t
                      deployed a model to live
                      yet</h2>
                    <p className="text-gray-500 my-2 mb-8">Run some backtest, and when
                      you&apos;re ready, easily deploy
                      your
                      first
                      model</p>
                    <BlackButton click={() => {
                      router.push(`/${projectId}/${modelId}/versions`);
                    }}>
                      Deploy A Model
                    </BlackButton>
                  </div>
                )
              }
            </>
          )
      }
    </div>;
  }

  return <div className="w-full h-auto bg-gray-50 p-5 pb-16 sm:px-0">
    <div className="max-w-6xl mx-auto">
      <div className="pt-10 flex md:flex-row flex-col items-center">
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-semibold text-gray-900 roboto">
            Live Strategy Deployment
          </h1>
          <LastDeployed id={projectId as string}
                        modelId={modelId as string}
                        deployedVersionId={model?.deployedVersion}/>
        </div>
        <div className="md:w-1/2 w-full md:text-right space-y-2 md:space-y-0 mt-5 md:mt-0 md:space-x-2">
        </div>
      </div>
    </div>
    <GraphManagement showTrades={true} trades={trades}/>
    <div
      className="-mt-2 max-w-7xl mx-auto hidden md:flex justify-between items-center py-4 px-8 bg-white shadow-md rounded-md h-auto text-gray-500">
      <p>
        Check out all the <button onClick={() => router.push(`/${projectId}/${modelId}/live/trades`)}
                                  className="inline text-blue-600 hover:text-blue-700">
        trades </button> and <button onClick={() => router.push(`/${projectId}/${modelId}/live/function-calls`)}
                                     className="inline text-blue-600 hover:text-blue-700">
        additional function output </button> from the live page
      </p>
      <MediumBlackButton click={() => router.push(`/${projectId}/${modelId}/live`)}>
        Go to Live Page
      </MediumBlackButton>
    </div>
  </div>;
}

const DeployButton = ({model}: { model: any }) => {
  const router = useRouter();
  const {projectId, modelId} = router.query;
  const isStarterModel = useStarterModel();
  const {level} = usePerms();

  // no perms to deploy
  if (level < 5) return null;

  // can't deploy starter models
  if (isStarterModel) return null;

  if (!model.deployedVersion) {
    return <BlackButton click={() => router.push(`/${projectId}/${modelId}/versions`)}>
      Deploy a Version
    </BlackButton>
  }
  return <></>
}

const ModelActionButtons = ({model}: { model: any }) => {
  const router = useRouter();
  const {projectId, modelId} = router.query;
  const {level} = usePerms();

  if (model.type === 'service') {
    return <div className="w-full  md:w-1/2 space-x-2 text-right">
      <OutlineButton click={() => router.push(`/${projectId}/${modelId}/logs`)}>
        View Function Logs
      </OutlineButton>
      <BlackButton>Query Function</BlackButton>
    </div>
  }

  return <>
    <div className="md:w-1/2 hidden md:block mt-5 md:mt-0 space-x-2 md:text-right">
      <OutlineButton click={() => router.push(`/${projectId}/${modelId}/backtests`)}>
        <div className="roboto text-sm">
          View Backtests
        </div>
      </OutlineButton>
      <DeployButton model={model}/>
    </div>
    <div className="block md:hidden w-full mt-5">
      <OutlineButton width="full" click={() => router.push(`/${projectId}/${modelId}/backtests`)}>
        <div className="roboto text-sm">
          View Backtests
        </div>
      </OutlineButton>
    </div>
  </>;
}

const ModelBackButton = () => {
  const router = useRouter();
  const {active} = useTeam()
  const {level} = usePerms();

  // this button goes back to "YOUR" models, so only show it if the model you're viewing is actually yours.
  // this will return null when you're viewing someone else's model, for example when viewing a shared model/backtest.
  // TODO this can maybe just be a different message, and keep the button there?
  if (level < 0) return null;

  return <button className="inline-block text-gray-500 mb-3" onClick={() => {
    router.push(`/${active.id}`)
  }}>
    <ArrowLeftIcon className=" w-4 h-4 inline align-middle"/>
    <p className=" roboto inline pl-2 align-middle">Back to Your Models</p>
  </button>;
}

const ModelSetupMessage = ({model}: { model: any }) => { // This isn't being used?
  const router = useRouter();
  const {projectId, modelId} = router.query;

  // only show setup message for models awaiting setup
  if (model.lifecycleStatus?.message !== 'Awaiting Setup') return null;

  return <p onClick={() => router.push(`/${projectId}/${modelId}/onboarding`)}
            className="text-blue-500 hover:text-blue-600 cursor-pointer mt-2 font-semibold flex items-center">
    Hey, the data is a little empty here. Let&apos;s Finish Setup <ArrowRightIcon className="w-4 h-4 ml-2"/>
  </p>;
}

const ModelHeader = ({model}: { model: any }) => {
  return <div className="max-w-6xl mx-auto py-8 flex flex-col p-5 sm:px-0 md:flex-row bg-white items-center">
    <div className="w-full md:w-1/2">
      <ModelBackButton/>
      <h1 className="text-3xl roboto font-bold">{model.name}</h1>
      <p className="roboto text-gray-400 mt-4"> {model.description}</p>
      <ModelSetupMessage model={model}/>
    </div>
    <ModelActionButtons model={model}/>
  </div>;
}

const Overview = () => {
  const {user, uid} = useAuth();
  const {level} = usePerms();
  const router = useRouter();
  const {projectId, modelId} = router.query;
  const [model, setModel] = useState<any>({});
  const [trades, setTrades] = useState<any>();

  useEffect(() => {
    const unsubscribe = getModelSubscription(projectId as string, modelId as string).onSnapshot(
      (query) => {
        const mod = {...query.data()};
        setModel(mod);
      }, (e: any) => {
        router.push('/dashboard')
      }
    );

    return () => unsubscribe();
  }, [projectId, modelId, router, model.type]);

  useEffect(() => {
    // catching one error for snapshot
    const unsubscribe = getTrades(projectId as string, modelId as string).onSnapshot((query) => {
      const allTrades: any = [];
      query?.docs?.forEach((doc) => {
        allTrades.push(...Object.values(doc?.data()?.trades))
      });
      const allTradesSorted = allTrades.sort((tradeA: any, tradeB: any) =>
        Number(tradeB.time) - Number(tradeA.time)
      );
      setTrades(allTradesSorted);
    }, (e: any) => {
      router.push('/dashboard');
    });

    return () => unsubscribe();

  }, [projectId, modelId, user, router]);

  return (
    <div className="h-auto mx-2">
      <ModelHeader model={model}/>
      <OverviewBody model={model} trades={trades}/>
      {
        model.type === 'strategy' ? (
          <BacktestHistory/>
        ) : null
      }
    </div>
  );
};

Overview.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};

export default Overview;
