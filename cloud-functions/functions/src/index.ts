import * as functions from "firebase-functions";
import axios from 'axios';

import { Request, Response } from 'express';
import { generateOpengraphData, OpengraphData } from "./opengraph";

export const addToSubstack = functions.firestore.document('waitlist/{email}').onCreate(async (change, context) => {
    const newSubscriber = change.data();
    const email = newSubscriber.email;
    functions.logger.info(`Adding ${email} to Substack List`);
    const body = {
        first_url: 'https://blankly.substack.com/embed',
        first_referrer: 'https://blankly.finance',
        current_url: 'https://blankly.substack.com/embed',
        current_referrer: 'https://blankly.finance',
        referral_code: '',
        source: 'embed',
        email,
    }
    const response = await axios.post('https://blankly.substack.com/api/v1/free', body, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    functions.logger.info(`Response from Substack: ${response.status}, ${response.statusText}`);
    return;
});

const DEFAULT_OPENGRAPH: OpengraphData = {
    title: 'Blankly Finance',
    description: 'Build in minutes. Deploy in seconds. Quant workflow reimagined. Algotrading without the headache 🚀',
    image: 'https://storage.googleapis.com/blankly-6ada5.appspot.com/default-preview.png'
}

export const getOpengraphData = functions.https.onRequest((req: Request, res: Response) => {
    const html = req.query.html === '1'
    return generateOpengraphData(req, html).then((data) => {
        if (html) {
            res.status(200).send(data)
        } else {
            res.json(data).end()
        }
    }).catch((err) => {
        console.log(err);
        if (html) {
            res.status(200).send('<h1>404</h1>')
        } else {
            res.json(DEFAULT_OPENGRAPH).end()
        }
    });
});

export * from './activity';
export * from './usage';
export * from './email'
export * from './crud';
export * from './pnl';
export * from './team';
export * from './starter-models';
export * from './trade';