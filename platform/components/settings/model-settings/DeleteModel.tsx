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

import {useState} from "react";
import ConfirmDeleteModel from "./ConfirmDeleteModel";

const DeleteModel = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="flex flex-col w-full items-center justify-start mt-8">
      <div className="h-fit w-full relative bg-white rounded-lg border-2 border-red-300 mb-8">
        <div className="p-8 mb-16">
          <h1 className="mb-6 text-2xl font-semibold text-black">
            Delete Model
          </h1>
          <div className="mt-4">
            <p className="roboto text-medium">
              This will permanently delete this model and all associated data. This action is not reversible. If you are
              sure, please type the name of your model below
            </p>
          </div>
        </div>
        <div
          className="absolute w-full rounded-b-lg h-16 bottom-0 bg-gray-100 flex flex-row justify-between px-8 items-center">
          <button type="submit" onClick={() => setConfirmDelete(true)}
                  className="text-white absolute right-4 bg-red-500 hover:bg-red-700 rounded-md py-2 text-sm px-8">
            Delete Model
          </button>
        </div>
      </div>
      <ConfirmDeleteModel open={confirmDelete} close={() => setConfirmDelete(false)}/>
    </div>
  );
}

export default DeleteModel;
