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

import axios from 'axios';
import axiosRetry from 'axios-retry';
import {loadStripe} from "@stripe/stripe-js";
import {
  CreateSubscriptionObject,
  CreateTeamObject,
  CustomerObject,
  DeleteTeamObject,
  UpdateSubscriptionObject
} from "@/types/stripe";
import {deleteDoc} from "@/libs/firestore";

export const stripePromise = loadStripe('pk_live_51K8UHeCZfwK6KMUPDl91F6DQMLFAzTLYnp35P6xTmhWssuZvSeHlS36Tv1AI2xyIzvw9xaLjjImNTxexVMc4b77V003p8MONZB');

export function createBillingAPIClient(token: string) {
  const instance = axios.create({
    baseURL: process.env.NODE_ENV === "production"
      ? 'https://billing.blankly.finance'
      : `${process.env.NEXT_PUBLIC_URL_BILLING_API}`,
    headers: {
      token: token,
    },
  });

  axiosRetry(instance, {retryDelay: axiosRetry.exponentialDelay});
  return instance;
}

// CUSTOMER INFO
export function createCustomer(token: string, customerValues: Partial<CustomerObject>) {
  const req = createBillingAPIClient(token);
  return req.post('/create-customer', customerValues)
}

export function updateBillingInfo(token: string, customerValues: Partial<CustomerObject>) {
  const req = createBillingAPIClient(token);
  return req.post("update-billing-info", customerValues)
}

export function retrieveCustomer(token: string, cid: string) {
  const req = createBillingAPIClient(token);
  return req.post('/get-customer', {cid: cid})
}

export function retrieveCustomerSubscription(token: string, cid: string) {
  const req = createBillingAPIClient(token)
  return req.post('/query-subscription', {cid: cid})
}

export function retrieveCustomerInvoices(token: string, cid: string) {
  const req = createBillingAPIClient(token);
  return req.post('/retrieve-customer-invoices', {cid: cid})
}

// PRODUCT INFO
export function retrieveProduct(token: string, productId: string) {
  const req = createBillingAPIClient(token);
  return req.post('/get-product', {"productId": productId})
}

export function getFreeProductId(token: string) {
  const req = createBillingAPIClient(token);
  return req.get('/get-free-planId')
}

export function queryProductsByType(token: string, query: string) {
  const req = createBillingAPIClient(token)
  return req.post('/query-product-types', {query: query})
}

export function queryProductsByName(token: string, query: string) {
  const req = createBillingAPIClient(token)
  return req.post('/query-product-names', {query: query})
}

// SUBSCRIPTIONS INFO
export function getSubscription(token: string, subId: string) {
  const req = createBillingAPIClient(token);
  return req.post('/get-subscription', {params: {"subscriptionId": subId}})
}

export function querySubscription(token: string, cid: string) {
  const req = createBillingAPIClient(token)
  return req.post('/query-subscription', {cid: cid})
}

export function createSubscription(token: string, createValues: CreateSubscriptionObject) {
  const req = createBillingAPIClient(token);
  return req.post('/create-subscription', createValues)
}

export function createFreeSubscription(token: string, cid: string) {
  const req = createBillingAPIClient(token);
  return req.post('/create-free-subscription', {cid: cid})
}

export function updateSubscription(token: string, updateValues: Partial<UpdateSubscriptionObject>) {
  const req = createBillingAPIClient(token);
  return req.post('/update-subscription', updateValues)
}

export function cancelSubscription(token: string, subscriptionId: string, uid: string) {
  const req = createBillingAPIClient(token);
  return req.post('/cancel-subscription', {
    subscriptionId: subscriptionId,
    uid: uid
  })
}

// PAYMENT INFO
export function createSetupIntent(token: string, cid: string) {
  const req = createBillingAPIClient(token);
  return req.post("/create-setup-intent", {cid: cid})
}

export function getPaymentMethods(token: string, cid: string) {
  const req = createBillingAPIClient(token);
  return req.post('/get-payment-methods', {cid: cid})
}

export function getDefaultMethod(token: string, cid: string) {
  const req = createBillingAPIClient(token);
  return req.post('/get-default-method', {cid: cid})
}

export function updateDefaultMethod(token: string, cid: string, methodId: string) {
  const req = createBillingAPIClient(token);
  return req.post('/update-default-method', {methodId: methodId, cid: cid})
}

export function detachCard(token: string, methodId: string) {
  const req = createBillingAPIClient(token);
  return req.post('/detach-payment-method', {id: methodId})
}

export async function mustEnterPayment(token: string, userCredits: number, customerId: string) {
  const req = createBillingAPIClient(token);
  return new Promise<boolean>(async (resolve, reject) => {
    const paymentMethods = await req.get('/get-payment-methods', {params: {"customerId": customerId}})
    if (!paymentMethods || paymentMethods.status === 204) {
      resolve(userCredits === 0);
    } else {
      resolve(paymentMethods.data.data.length === 0 && userCredits === 0)
    }
  })
}

// TEAM INFO
export function createTeam(token: string, data: CreateTeamObject) {
  const req = createBillingAPIClient(token)
  return req.post("/create-team", data)
}

export function joinTeam(token: string, teamId: string) {
  const req = createBillingAPIClient(token)
  return req.post("/join-team", {teamId: teamId})
}

export function deleteTeamMember(token: string, type: string, data: DeleteTeamObject) {
  if (type == "user") {
    const req = createBillingAPIClient(token)
    return req.post("/remove-from-team", data)
  }
  return deleteDoc(`teams/${data.teamId}/invites/${data.memberId}`);
}
