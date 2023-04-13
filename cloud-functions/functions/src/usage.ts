import * as functions from "firebase-functions";
// import * as admin from 'firebase-admin';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("");

//@ts-ignore
import {getCollection, getDoc, setDoc} from "./firebase";
import axios from "axios";

const stripe = require('stripe')('');

export const reportUsage = functions.pubsub
    .schedule('0 */6 * * *')
    .onRun(async () => {
        await runUsage()
    });

export async function runUsage() {
    console.log('running usage...');

    const usageApiClient = axios.create({
        baseURL: process.env.NODE_ENV === "production"
            ? "https://model-usage-api-67jfnx2vvq-uc.a.run.app"
            : "http://localhost:8090"
    });

    const users = await getCollection('users');
    const teams = await getCollection('teams');

    // @ts-ignore
    const results = await Promise.allSettled(teams.concat(users)
        .map(client => runUsageForClient(client, usageApiClient)));
    for (const result of results.filter(r => r.status !== 'fulfilled')) {
        // @ts-ignore
        console.log(result.reason);
    }
}

async function getClientCreditUsage(usageApiClient: any, options: any): Promise<number> {
    return await usageApiClient.get('/usage', {
        params: options
        // @ts-ignore
    }).then(res => res.data.credits) ?? 0;
}

async function checkStripelessUsage(client: any, usageApiClient: any) {
    // check last month for usage
    const now = Date.now() / 1000;
    const credits = await getClientCreditUsage(usageApiClient, {
        startTime: now - 60 * 60 * 24 * 30,
        endTime: now,
        id: client.id
    });
    if (0 < credits) {
        console.log(`${client.id} owes ${credits} credits`)
        await notifyCreditsOwed(client, credits)
    }
}

async function runUsageForClient(client: any, usageApiClient: any) {
    console.log(`running usage for id ${client.id}`)
    if (!client.cid) {
        console.log(`${client.id} has no stripe id`)
        return checkStripelessUsage(client, usageApiClient)
    }

    const subs = await stripe.subscriptions.list({
        customer: client.cid
    });

    const plan = subs?.items?.data?.[0];
    const creditPlan = subs?.items?.data?.[1];

    if (!plan || !creditPlan) {
        console.log(`${client.id} does not have valid stripe subscriptions`)
        return checkStripelessUsage(client, usageApiClient)
    }

    const product = await stripe.products.retrieve(plan.plan.product);
    const planCreditAllowance = (product.metadata.credit ?? 0) * plan.quantity;

    const credits = await getClientCreditUsage(usageApiClient, {
        startTime: creditPlan.current_period_start,
        endTime: creditPlan.current_period_end,
        id: client.id
        // @ts-ignore
    });

    // apply user credits
    const billableCredits = Math.max(credits - planCreditAllowance, 0);

    console.log(`${client.id} has ${billableCredits} billable credits, sending data to stripe!`);
    await stripe.subscriptionItems.createUsageRecord(creditPlan.id, {quantity: billableCredits, action: 'set',});
}

//
// async function findId(customerId: string) {
//     const users = await admin
//         .firestore()
//         .collection('users')
//         .where('cid', '==', customerId)
//         .get();
//
//     if (!users.empty) return users.docs[0].id
//
//     const teams = await admin
//         .firestore()
//         .collection('teams')
//         .where('cid', '==', customerId)
//         .get();
//
//     if (!teams.empty) return teams.docs[0].id
//
//     return null;
// }

// const USER_TEMPLATE = 'd-01879c3e3b8e4eaa9eda639a1a917b64';
// const ADMIN_TEMPLATE = 'd-15dfe9a6aefc474fab57bbb241ce6a88';
// const SEND_USER_EMAilS = false;

async function notifyCreditsOwed(client: any, credits: any) {
    // const templateData = {
    //     user: client, id: client.id, credits: credits
    // }

    // sgMail
    //     .send({
    //         to: 'blankly@blankly.finance',
    //         from: 'monitor@blankly.finance',
    //         templateId: ADMIN_TEMPLATE,
    //         dynamicTemplateData: templateData,
    //     }).catch((error: any) => {
    //     console.error(error.response.body.errors)
    // })

    // const userEmail = (await getDoc(`/users/${client.id}`)).email;

    // if (!userEmail || !SEND_USER_EMAilS) return;

    // sgMail
    //     .send({
    //         to: userEmail,
    //         from: 'monitor@blankly.finance',
    //         templateId: USER_TEMPLATE,
    //         dynamicTemplateData: templateData,
    //     }).catch((error: any) => {
    //     console.error(error.response.body.errors)
    // })
}