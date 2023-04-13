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

import { processEpoch } from "@/utils/date";
import ExchangeIcons from "../general/ExchangeIcons";
import { useEffect, useState } from "react";
import { getProjectOnce } from "@/services/projects-store";
import { getModels } from "@/services/models-store"

const ProjectCard = (props: {
  date: number,
  numDeployed: number,
  numTotal: number,
  name: string,
  id: string,
  description: string
}) => {
  const id = props.id;
  const [proj, setProj] = useState<any>({});
  const [symbols, setSymbols] = useState<any>([]);
  const [exchanges, setExchanges] = useState<any>([]);
  const [numModels, setNumModels] = useState(0);
  useEffect(() => {
    getProjectOnce(id).then((proj) => {
      const projectData = proj.data() as any;
      setProj(proj.data());
      if (projectData?.hasOwnProperty('symbols')) {
        const symbols = Object.values(projectData.symbols).flat();
        const uniqueSymbols = new Set(symbols);
        const unique = [...Array.from(uniqueSymbols)];
        setSymbols(unique);
      }
      if (projectData?.hasOwnProperty('exchanges')) {
        const exchanges = Object.values(projectData.exchanges)
        const uniqueExchanges = new Set(exchanges);
        setExchanges([...Array.from(uniqueExchanges)]);
      }

      const unsubscribe = getModels(id).onSnapshot((query) => {
        const models = query.docs.map((doc) => {
          return { id: doc.id }
        });
        setNumModels(models.length);
      });
      return () => unsubscribe();
    })
  }, [id])

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md cursor-pointer flex-1 flex flex-col">
      <div className="bg-white py-6 shadow hover:shadow-lg transition duration-200 ease-in-out rounded-lg flex-1 px-6">
        <p className="text-gray-400 text-sm">Last Accessed: {processEpoch(props.date)}</p>
        <p className="text-gray-400">Models deployed: {numModels}</p>
        <h1 className="font-bold text-2xl max-w-sm mt-4">{props.name.slice(0, 150)}{props.name.length > 150 ? "..." : ""}</h1>
        <p className="text-gray-500 mt-3 max-w-xs flex-1">{props.description.slice(0, 250)}{props.description.length > 250 ? "..." : ""}</p>
        <div className="font-bold mt-4 flex items-center">
          <span className="mr-2">Exchanges:</span>
          <ExchangeIcons exchanges={exchanges} />
          <span className="text-sm roboto text-gray-500 font-semibold">
            {
              exchanges.length === 0 ? "No Exchanges" : null
            }
          </span>
        </div>
        <p className="font-bold mt-4">Symbols: <span className="font-medium ">
          {" "}
          {symbols?.map((ticker: string) => (
            <span key={ticker}>{ticker} </span>
          ))}
          {
            symbols.length === 0 ? <span className="text-gray-500 font-semibold text-sm ml-2">No Tickers</span> : null
          }
        </span></p>
      </div>
    </div>
  )
}

export default ProjectCard;
