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

import {ChevronDownIcon} from "@heroicons/react/solid";
import React, {useState} from "react";
import Dropdown from "@/components/general/dropdowns/Dropdown";
import {classNames} from "@/utils/general";

const Title = (props: { activeModel: any, tabs: any, activeIndex: number, setActive: any }) => {
  const [clicked, setClicked] = useState(false)

  return (
    <div>
      <h1
        className={classNames(clicked ? "hidden" : "text-2xl font-semibold text-gray-900 roboto flex cursor-pointer")}>
        <div onClick={() => setClicked(!clicked)}>
          {props.activeModel?.name} {props.activeModel?.lifecycleStatus?.running ? "Live" : "Past"} Deployment
        </div>
        {
          props.tabs?.length > 1 ? <button onClick={() => setClicked(!clicked)}>
            <ChevronDownIcon className="ml-3 mt-1 h-7 w-7"/>
          </button> : null
        }
      </h1>
      {
        clicked && props.tabs ? <Dropdown update={(e: any) => {
          props.setActive(e.type)
          setClicked(!clicked)
        }} options={props.tabs} default={props.activeIndex}/> : null
      }


    </div>
  )
}

export default Title;
