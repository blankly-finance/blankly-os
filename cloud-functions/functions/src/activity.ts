import * as functions from "firebase-functions";
import {getDoc, setDoc, addDoc, getCollection} from "./firebase";

export const updateTradeActivity = functions.firestore
    .document(`/projects/{userId}/models/{modelId}/trades/{tradeId}`)
    .onCreate(async (change, context) => {
            const userId = context.params.userId;
            const modelId = context.params.modelId;
            const tradeId = context.params.tradeId;

            // Get and update previous activity trades count
            const activityDoc = await getDoc(`/users/${userId}/activity/${userId}/`);
            const priorActivity = activityDoc.thisWeekStats
            setDoc(`/users/${userId}/activity/${userId}`, {
                thisWeekStats: {
                    backtests: priorActivity.backtests,
                    trades: priorActivity.trades + 1,
                    deployments: priorActivity.deployments
                }
            });

            // Add a trades log to activity log collection.
            const modelData = await getDoc(`/projects/${userId}/models/${modelId}`);
            const tradeData = await getDoc(`/projects/${userId}/models/${modelId}/trades/${tradeId}`);
            const side = tradeData.side === "buy" ? "bought" : "sold";
            const newDocData = {
                message: `Model, ${modelData.name}, ${side} ${tradeData.size} ${tradeData.symbol} for ${tradeData.price}`,
                time: tradeData.time
            }
            await addDoc(`/users/${userId}/activity/${userId}/logs`, newDocData);
        }
    );

export const updateBacktestActivity = functions.firestore
    .document(`/projects/{userId}/models/{modelId}/backtests/{backtestId}`)
    .onCreate(async (change, context) => {
            const userId = context.params.userId;
            const modelId = context.params.modelId;
            const backtestId = context.params.backtestId;

            // Get and update previous activity backtest count
            const activityDoc = await getDoc(`/users/${userId}/activity/${userId}/`);
            const priorActivity = activityDoc.thisWeekStats;
            setDoc(`/users/${userId}/activity/${userId}`, {
                thisWeekStats: {
                    backtests: priorActivity.backtests + 1,
                    deployments: priorActivity.deployments,
                    trades: priorActivity.trades
                }
            });

            // Add a backtest log to activity log collection.
            const modelData = await getDoc(`/projects/${userId}/models/${modelId}`);
            const backtestData = await getDoc(`/projects/${userId}/models/${modelId}/backtests/${backtestId}`);
            const newDocData = {
                message: `Model, ${modelData.name}, uploaded a new backtest with id ${backtestId}`,
                time: backtestData.time
            }
            await addDoc(`/users/${userId}/activity/${userId}/logs`, newDocData);
        }
    );

export const updateDeploymentActivity = functions.firestore
    .document(`/projects/{userId}/models/{modelId}`)
    .onCreate(async (change, context) => {
            const userId = context.params.userId;
            const modelId = context.params.modelId;

            // Get and update previous activity deployment count
            const activityDoc = await getDoc(`/users/${userId}/activity/${userId}/`);
            const priorActivity = activityDoc.thisWeekStats;
            setDoc(`/users/${userId}/activity/${userId}`, {
                thisWeekStats: {
                    backtests: priorActivity.backtests,
                    deployments: priorActivity.deployments + 1,
                    trades: priorActivity.trades
                }
            });

            // Add a deployment log to activity log collection.
            const modelData = await getDoc(`/projects/${userId}/models/${modelId}`);
            const newDocData = {
                message: `New model, ${modelData.name}, deployed with status "${modelData.lifecycleStatus.message}" `,
                time: modelData.deployedAt
            }
            await addDoc(`/users/${userId}/activity/${userId}/logs`, newDocData);
        }
    );

export const updateStats = functions.pubsub
    .schedule("0 0 * * MON")
    .onRun(async () => {
        const users = await getCollection('/users');
        const uids = users.map(user => user.id);
        for (const uid of uids) {
            const activityData = await getDoc(`/users/${uid}/activity/${uid}`);
            setDoc(`/users/${uid}/activity/${uid}`, {
                lastWeekStats: activityData?.thisWeekStats
            })
        }
    });