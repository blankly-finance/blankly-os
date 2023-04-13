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

import {classNames} from "@/utils/general";
import React, {useEffect, useState} from "react";
import LastDeployed from "@/components/project/versions/LastDeployed";
import {useRouter} from "next/router";
import {getModelOnce, getModelSubscription} from "@/services/models-store";
import Image from "next/image";
import BlanklyBlack from "@/public/blankly-black.svg";
import {LiveGraph} from "@/components/graph/GraphManager";
import {useIntercom} from "react-use-intercom";
import Title from "@/components/embed/live/Title";
import Metrics from "@/components/embed/live/Metrics";

const Live = () => {
  // test url: http://localhost:3000/embed/live?id=sogE54jRuvf0X7ZHx3yrbTFav9O2&modelId=cCrXy5IhXzcyVzlxVgMT&option=1
  // 4Q1gtPZUUeyryGcRweTY
  // R2peltxyEX9RvkufQveV
  const router = useRouter()
  const intercom = useIntercom()

  useEffect(() => {
    intercom.shutdown();
  }, [intercom])
  const {id, modelId, modelIds, option} = router.query

  // handle option type to modify display
  const [type, setType] = useState<number>()
  useEffect(() => {
    // @ts-ignore
    let choice = option && !isNaN(option) ? parseInt(option) : 1;
    if (choice > 3) {
      choice = 3
    }
    setType(choice)
  }, [option])

  // used to swtich between different models
  const [tabIndex, setTabIndex] = useState(0)
  const [tabs, setTabs] = useState<any>()
  useEffect(() => {
    if (modelIds) {
      let models: Array<string> = []

      if (typeof modelIds === 'string') {
        models = (modelIds as string).split(',').map(id => id.trim())
      } else {
        models = modelIds
      }

      let newTabs: any = []

      const promises = models.map((mId) => {
        return getModelOnce(id as string, mId).then((doc) => {
          return {...doc.data(), id: doc.id};
        }, (e) => {
          setInvalid("perm")
        })
      })

      Promise.all(promises).then((mds) => {
        mds.map((m: any, index) => {
          newTabs.push({label: m.name, id: m.id, type: index})
        })

        setTabs(newTabs)
      })

    } else if (modelId) {
      getModelOnce(id as string, modelId as string).then((doc) => {
        const data: any = doc.data()

        if (data) {
          setTabs([{label: data.name, id: modelId as string, type: 0}])
          setTabIndex(0)
        } else {
          setInvalid("cred")
        }
      }, (e) => {
        setInvalid("perm")
      })

    }
  }, [id, modelId, modelIds])

  const [activeId, setActiveId] = useState("")
  useEffect(() => {
    if (tabs && tabIndex !== undefined) {
      setActiveId(tabs[tabIndex].id)
    }
  }, [tabIndex, tabs])

  // get model data
  const [invalid, setInvalid] = useState("none")
  const [model, setModel] = useState<any>()
  useEffect(() => {
    if (id && tabs) {
      const unsubscribe = getModelSubscription(id as string, tabs[tabIndex].id).onSnapshot((snapsnot) => {
        const data = snapsnot.data()
        if (!data) {
          setInvalid("cred")
        }
        setModel(data)
      }, (e) => {
        setInvalid("perm")
      })
      return () => unsubscribe();
    }
  }, [id, modelId, tabIndex, tabs])

  return (
    <div>
      <div className={classNames(invalid != "none" ? "hidden" : "")}>
        <div className="max-w-6xl mx-auto my-4 bg-white px-8 pb-5 pt-8 border rounded-lg">
          <div className="w-full">
            <div>
              <Title activeModel={model} tabs={tabs} activeIndex={tabIndex} setActive={setTabIndex}/>
              <LastDeployed id={id as string} modelId={activeId} deployedVersionId={model?.deployedVersion}
                            hideRanBy={true}/>
            </div>
            {
              type == 1 || type == 3 ?
                <LiveGraph id={id as string} modelId={activeId} model={model}/> : null
            }

            {
              type == 2 || type == 3 ? <Metrics id={id as string} modelId={activeId}/> : null
            }

            <div className="mt-8 text-right roboto flex">
              {/*<span className="ml-auto mt-1 mr-1 text-gray-700 font-semibold text-md">Powered by</span>*/}
              <a target="_blank"
                 rel="noreferrer"
                 href="https://blankly.finance"
                 className="ml-auto flex items-center text-gray-400 text-xs">
                <span className="mr-1">Powered by</span>
                <Image
                  width={90}
                  height={25}
                  src={BlanklyBlack}
                  alt="Blankly Black SVG"/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames(invalid == "cred" ? "" : "hidden")}>
        Invalid Credentials (invalid id/modelId/backtestId)
      </div>
      <div className={classNames(invalid == "perm" ? "" : "hidden")}>
        Invalid Share Permissions
      </div>
    </div>
  )
}

export default Live
