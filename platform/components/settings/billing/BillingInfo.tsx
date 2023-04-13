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

import React, {useEffect, useState} from 'react';
import {retrieveCustomer} from "@/services/stripe-store";
import {PencilIcon} from '@heroicons/react/solid';
import {useAuth} from "@/libs/auth";
import UpdateInfoModal from './modals/UpdateInfoModal';

export default function BillingInfo(props: { cid: string }) {
  const {user, token} = useAuth();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const cid = props.cid;
  const [openModal, setUpdateInfo] = useState<any>(false);

  useEffect(() => {
    if (cid) {
      retrieveCustomer(token, cid)
        .then((resp: any) => {
          setEmail(resp.data.email);
          setPhone(resp.data.phone);
        });
    }
  }, [cid, token])

  return (
    <div className="my-2 mb-12">
      <div className="flex">
        <h2 className="font-medium my-2 text-lg">BILLING INFORMATION</h2>
        <div className="flex items-center cursor-pointer my-2 ml-auto" onClick={() => setUpdateInfo(true)}>
          <PencilIcon className="h-4 w-4 text-gray-600"/>
          <p className="text-gray-600 mx-2">Update Information</p>
        </div>
      </div>
      <hr className="my-2"/>
      <div className="flex flex-col w-5/6">
        <div className="flex justify-between my-1">
          <p className="text-gray-500">Email</p>
          <div className="w-3/6">
            {
              email ?
                <p className="text-gray-900">{email}</p>
                :
                <p className="text-gray-600">We don&apos;t have this information from you 😔</p>
            }
          </div>
        </div>
        <div className="flex justify-between my-1">
          <p className="text-gray-500">Phone number</p>
          <div className="w-3/6">
            {
              phone ?
                <p className="text-gray-900">{phone}</p>
                :
                <p className="text-gray-600">We don&apos;t have this information from you 😔</p>
            }
          </div>
        </div>
      </div>
      <UpdateInfoModal open={openModal} close={() => setUpdateInfo(false)} setPhone={setPhone}/>
    </div>
  );
}
