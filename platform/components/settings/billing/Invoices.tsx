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
import {ExternalLinkIcon} from '@heroicons/react/solid';
import {retrieveCustomerInvoices} from "@/services/stripe-store";
import {useAuth} from "@/libs/auth";
import {processEpoch} from "@/utils/date";
import PaymentStatusIcon from "@/components/settings/billing/PaymentStatusIcon";

function Invoices(props: { cid: string }) {
  const {token} = useAuth();
  const [invoices, setInvoices]: Array<any> = useState([]);
  const cid = props.cid;

  function numberIsInt(num: number) {
    var result = (num - Math.floor(num)) !== 0;

    if (result)
      return false;
    else
      return true;
  }

  useEffect(() => {
    if (cid && token) {
      let fetchInvoices = new Promise((resolve, reject) => {
        retrieveCustomerInvoices(token, cid)
          .then((result: any) => {
            let invoicesTemp: Array<any> = []
            let invoiceCount = 0;
            result.data.data.forEach((invoiceData: any) => {
              invoiceCount += 1;
              let amountDue: string;
              const totalDue = invoiceData.total / 100;
              if (numberIsInt(totalDue)) {
                amountDue = `${totalDue.toString()}.00`;
              } else {
                amountDue = `${totalDue}`
              }
              const invoice = {
                start: processEpoch(invoiceData.period_start),
                end: processEpoch(invoiceData.period_end),
                id: invoiceData.id,
                amount: amountDue,
                status: invoiceData.status,
                hostedUrl: invoiceData.hosted_invoice_url,
                // This may become a problem if we have multiple line items
                // as of right now, how our business is setup, I don't think,
                // we can. But I'm not 100% sure.
                plan: invoiceData.lines.data[0].plan.nickname
              }
              invoicesTemp.push(invoice);

              function compareInvoices(in1: any, in2: any) {
                if (in1.start < in2.start) return 1;
                else {
                  return -1;
                }
              }

              if (invoiceCount === result.data.data.length) {
                invoicesTemp.sort(compareInvoices);
                resolve(invoicesTemp);
              }
            });
          });
      });

      fetchInvoices.then((invoices) => {
        setInvoices(invoices);
      })

    }
  }, [cid, token]);

  return (
    <div className="my-2 pb-16">
      <h2 className="font-medium my-2 text-lg">INVOICE HISTORY</h2>
      <hr className="my-2"/>
      {invoices.map((invoice: any, index: number) => (
        <div key={index} className="grid auto-cols-fr grid-flow-col py-1">
          <div>
            <PaymentStatusIcon status="paid" additionalClasses=""/>
          </div>
          <div className="roboto text-md col-span-2">
            {invoice.start}
          </div>
          <p className="roboto text-md col-span-1 justify-self-start">
            ${invoice.amount}
          </p>
          <p className=" roboto text-md col-span-2">
            {invoice.plan}
          </p>
          <a className=" justify-self-end" target=" _blank" rel=" noopener noreferrer" href={invoice.hostedUrl}>
            <ExternalLinkIcon className=" h-6 w-6 text-gray-600"/>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Invoices;
