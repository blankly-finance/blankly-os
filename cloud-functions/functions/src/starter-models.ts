import * as functions from "firebase-functions";
import { getDoc, setDoc } from "./firebase";

async function copyDoc(dataPath: string, starterModelPath: string) {
    const docData = await getDoc(dataPath);
    delete docData['exists'];
    delete docData['id'];
    setDoc(starterModelPath, docData);
}

export const updateStarterModel = functions.firestore
    .document('/starterModels/{docId}')
    .onCreate(async (snapshot, context) => {
        const docId = context.params.docId;
        const uid = snapshot.data().userId;
        const modelId = snapshot.data().modelId;
        const backtestId = snapshot.data().backtestId;
        const labels = snapshot.data().tags;
        const name = snapshot.data().name;
        const description = snapshot.data().description;

        // Copy model doc
        await copyDoc(`/projects/${uid}/models/${modelId}`, `/projects/starters/models/${modelId}`);

        // Copy over for frontend purposes
        await setDoc(`/projects/starters/models/${modelId}`, {
            starterModelId: docId,
            modelId: modelId,
            creatorId: uid,
            backtestId: backtestId,
            name: name,
            description: description,
            labels: labels
        });

        // Copy over backtest doc
        await copyDoc(`/projects/${uid}/models/${modelId}/backtests/${backtestId}`, `/projects/starters/models/${modelId}/backtests/${backtestId}`);

        // Copy over metrics
        const blankly = copyDoc(`/projects/${uid}/models/${modelId}/backtests/${backtestId}/metrics/blankly`, `/projects/starters/models/${modelId}/backtests/${backtestId}/metrics/blankly`);
        const custom = copyDoc(`/projects/${uid}/models/${modelId}/backtests/${backtestId}/metrics/custom`, `/projects/starters/models/${modelId}/backtests/${backtestId}/metrics/custom`);

        // Copy over time series metrics doc
        const timeseries = copyDoc(`/projects/${uid}/models/${modelId}/backtests/${backtestId}/timeseriesMetrics/blankly`, `/projects/starters/models/${modelId}/backtests/${backtestId}/timeseriesMetrics/blankly`);

        // Copy over account values doc
        const av = copyDoc(`/projects/${uid}/models/${modelId}/backtests/${backtestId}/accountValues/accountValues`, `/projects/starters/models/${modelId}/backtests/${backtestId}/accountValues/accountValues`)

        // Copy over indicators doc
        const indicators = copyDoc(`/projects/${uid}/models/${modelId}/backtests/${backtestId}/indicators/custom`, `/projects/starters/models/${modelId}/backtests/${backtestId}/indicators/custom`);

        // Copy over trades doc
        const trades = copyDoc(`/projects/${uid}/models/${modelId}/backtests/${backtestId}/trades/trades`, `/projects/starters/models/${modelId}/backtests/${backtestId}/trades/trades`);

        return Promise.all([blankly, custom, timeseries, av, indicators, trades])
    });
