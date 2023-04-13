import { getDoc, setDoc } from "./firebase";
import * as functions from "firebase-functions";

export const updateTickers = functions.firestore.document('/projects/{projectId}/models/{modelId}/trades/{tradeId}').onCreate(async (change, context) => {
    const projectId: string = context.params.projectId
    const modelId: string = context.params.modelId
    const trade: any = change.data()

    // get current tickers object
    const doc = await getDoc(`/projects/${projectId}/models/${modelId}`)
    const tickers = doc.tickers;

    const newTicker = trade.symbol;
    if (!(newTicker in tickers)) {
        // add ticker to tickers array
        tickers[newTicker] = newTicker
    }

    setDoc(`/projects/${projectId}/models/${modelId}`, {
        tickers: tickers
    })
});