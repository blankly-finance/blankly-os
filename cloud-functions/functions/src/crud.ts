import * as functions from "firebase-functions";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore"
import { updateCollectionCounter } from "./firebase"

export const onCreateTrade = functions.firestore
    .document('projects/{projectId}/models/{modelId}/trades/{tradeId}')
    .onCreate(async (_: QueryDocumentSnapshot, context: functions.EventContext) => {
        const path = `projects/${context.params.projectId}/models/${context.params.modelId}`
        await updateCollectionCounter(path, 'trades', `${path}/trades`, 1)
    })

export const onDeleteTrade = functions.firestore
    .document('projects/{projectId}/models/{modelId}/trades/{tradeId}')
    .onDelete(async (_: QueryDocumentSnapshot, context: functions.EventContext) => {
        const path = `projects/${context.params.projectId}/models/${context.params.modelId}`
        await updateCollectionCounter(path, 'trades', `${path}/trades`, -1)
    })

export const onCreateBacktest = functions.firestore
    .document('projects/{projectId}/models/{modelId}/backtests/{backtestId}')
    .onCreate(async (_: QueryDocumentSnapshot, context: functions.EventContext) => {
        const path = `projects/${context.params.projectId}/models/${context.params.modelId}`
        await updateCollectionCounter(path, 'backtests', `${path}/backtests`, 1)
    })

export const onDeleteBacktest = functions.firestore
    .document('projects/{projectId}/models/{modelId}/backtests/{backtestId}')
    .onDelete(async (_: QueryDocumentSnapshot, context: functions.EventContext) => {
        const path = `projects/${context.params.projectId}/models/${context.params.modelId}`
        await updateCollectionCounter(path, 'backtests', `${path}/backtests`, -1)
    })