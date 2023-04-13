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

import StarterModelCard from "@/components/project/details/StarterModelCard";
import React, {useCallback, useEffect, useState} from "react";
import Dropdown from "@/components/general/dropdowns/Dropdown";
import {getStarterModels} from "@/services/starter-models-store";
import {StarterModel} from "@/types/model";

// Dropdown options
const options = [
  {label: "Sort by CAGR", value: "cagr"},
  {label: "Sort by Sortino", value: "sortino"},
  {label: "Sort by Sharpe", value: "sharpe"},
]

function StarterModelsDetails() {
  const [models, setModels] = useState<any>([]);

  async function retrieveStarterModels() {
    const modelsTemp: Array<StarterModel> = await getStarterModels();
    modelsTemp.sort((model1: StarterModel, model2: StarterModel) => {
      return model2.stats.cagr - model1.stats.cagr;
    });
    setModels(modelsTemp);
  }

  useEffect(() => {
    retrieveStarterModels();
  }, []);

  const update = useCallback((e: any) => {
    switch (e.value) {
      case "cagr":
        setModels(JSON.parse(JSON.stringify(models.sort((model1: any, model2: any) => {
          return model2.stats.cagr - model1.stats.cagr;
        }))));
        break;
      case "sortino":
        setModels(JSON.parse(JSON.stringify(models.sort((model1: any, model2: any) => {
          return model2.stats.sortino - model1.stats.sortino;
        }))));
        break;
      case "sharpe":
        setModels(JSON.parse(JSON.stringify(models.sort((model1: any, model2: any) => {
          return model2.stats.sharpe - model1.stats.sharpe;
        }))));
        break;
      default:
        console.error("Something went wrong");
        break;
    }
  }, [models]);

  return (
    <div className="pb-12 min-h-screen w-full">
      <div className="flex justify-between items-center mt-12">
        <div>
          <h1 className="text-3xl font-semibold">Duplicate a Starter Model</h1>
          <p className="text-sm mt-2 text-gray-500">Easily duplicate these and add them to your portfolio</p>
        </div>
        <div className="w-46">
          <Dropdown options={options} default={0} update={update}/>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6 mt-8">
        {models?.map((model: any, index: number) => {
          return (
            <div
              className="cursor-pointer flex flex-col"
              key={index}
            >
              <div className="flex-1">
                <StarterModelCard model={model}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StarterModelsDetails;
