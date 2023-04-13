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

import React, {ReactElement, useEffect, useState} from "react";
import {useRouter} from "next/router";
import ModelLayout from "@/components/layouts/ModelNavLayout";
import LastDeployed from "@/components/project/versions/LastDeployed";
import {useAuth} from "@/libs/auth";
import {getModelOnce} from "@/services/models-store";
import {getStrategies} from "@/services/strategy-log-store";
import FunctionCallsModal from "@/components/project/live/modals/FunctionCallsModal";
import {classNames} from "@/utils/general";

const functionCallsData = [
  {
    "id": "cancel_order",
    "data": {
      "event": [
        {
          "name": "a234234-jasdf-bfan125-asdf23",
          "args": {
            "order_id": "7743d4asdfasd",
            "symbol": "GME"
          },
          "response": {
            "order_id": "7743d4asdfasd"
          },
          "date": "December 25th, 2021"
        }
      ]
    }
  },
  {
    "id": "limit_order",
    "data": {
      "event": [
        {
          "name": "a234234-jasdf-bfan125-asdf23",
          "args": {
            "order_id": "7743d4asdfasd",
            "symbol": "GME"
          },
          "response": {
            "order_id": "7743d4asdfasd"
          },
          "date": "December 25th, 2021"
        }
      ]
    }
  },
  {
    "id": "get_open_orders",
    "data": {
      "event": [
        {
          "name": "a234234-jasdf-bfan125-asdf23",
          "args": {
            "order_id": "7743d4asdfasd",
            "symbol": "GME"
          },
          "response": {
            "order_id": "7743d4asdfasd"
          },
          "date": "December 25th, 2021"
        }
      ]
    }
  },
  {
    "id": "market_order",
    "data": {
      "event": [
        {
          "name": "a234234-jasdf-bfan125-asdf23",
          "args": {
            "order_id": "7743d4asdfasd",
            "symbol": "GME"
          },
          "date": "December 25th, 2021"
        },
        {
          "name": "a234234-jasdf-bfan125-asdf23",
          "args": {
            "order_id": "7743d4asdfasd",
            "symbol": "GME"
          },
          "response": {
            "order_id": "7743d4asdfasd"
          },
          "date": "December 25th, 2021"
        }
      ]
    }
  }
];

function FunctionCalls() {
  const router = useRouter();
  const [model, setModel] = useState<any>();
  const {user, uid, loading, signout} = useAuth();
  //const {projectId, modelId} = router.query;
  // DELETE LATER
  let projectId = "eXZ0WXDHcgY9Hif31FH4";
  let modelId = "baa133f1-88f6-45f6-b7a3-f97890cc8146";
  const [isModalOpen, setModalOpen] = useState(false);
  const [eventSelected, setEventSelected] = useState<any>({});
  const [nameSelected, setNameSelected] = useState("");

  function openModal(name: any, event: any) {
    setEventSelected(event);
    setNameSelected(name);
    setModalOpen(true);
  }

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin");
      }
    }
  });
  useEffect(() => {
    getModelOnce(projectId as string, modelId as string).then(
      (query) => {
        const mod = {...query.data()};
        setModel(mod);
      }
    );

    const unsubscribe = getStrategies(projectId as string, modelId as string).onSnapshot((query) => {
      const strategies = query.docs.map((doc) => {
        return {id: doc.id, ...doc.data()}
      }, (e: any) => {
        router.push('/dashboard')
      });
    })

    return () => unsubscribe();
  }, [projectId, modelId]);

  return (
    <div className="h-auto">
      <div className="h-auto bg-white py-8">
        <div className="pt-4 flex max-w-6xl mx-auto">
          <div className="w-2/3">
            <p className="text-gray-400 mb-2 text-sm">
              <button onClick={() => router.push(`/${projectId}/${modelId}/live`)}
                      className="inline text-blue-600 hover:text-blue-800 mr-1">Live
              </button>
              / <button onClick={() => router.push(`/${projectId}/${modelId}/live/log`)}
                        className="inline text-blue-600 hover:text-blue-800">Live Deployment Logs
            </button> / Strategy Function Calls
            </p>
            <div className="flex items-center">
              <h1 className="text-3xl font-semibold text-gray-900 roboto">
                Strategy Function Calls
              </h1>
            </div>
            <LastDeployed id={projectId as string} modelId={modelId as string}
                          deployedVersionId={model?.deployedVersion}/>
          </div>
        </div>
      </div>
      <div className="h-fit max-w-6xl mx-auto pb-24">
        {
          functionCallsData.map((strategy, index) => {
            return (
              <div className="flex flex-col my-4" key={index}>
                <div className="my-4">
                  <h2 className="text-lg font-semibold inconsolata text-blue-600">{strategy.id}()</h2>
                </div>
                <div className="border rounded-lg">
                  {
                    strategy.data.event.map((event: any, inner) => {
                      return (
                        <div onClick={() => openModal(strategy.id, event)}
                             className={classNames('flex cursor-pointer justify-between items-center py-5 px-8', inner !== strategy.data.event.length - 1 ? 'border-b' : '')}
                             key={inner}>
                          <p className="font-semibold text-sm">{event.name}</p>
                          {
                            Object.keys(event.args).length === 1 ?
                              <p className="text-sm">Ran with 1 argument on {event.date}</p>
                              :
                              <p className="text-sm">Ran with {Object.keys(event.args).length} arguments
                                on {event.date}</p>
                          }
                          <button onClick={() => openModal(strategy.id, event)}
                                  className="text-blue-600 text-sm hover:text-blue-800">
                            <p>View Function Call Results</p>
                          </button>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      <FunctionCallsModal open={isModalOpen} close={() => setModalOpen(false)} event={eventSelected}
                          name={nameSelected}/>
    </div>
  )
}

FunctionCalls.getLayout = function getLayout(page: ReactElement) {
  return <ModelLayout>{page}</ModelLayout>;
};

export default FunctionCalls;
