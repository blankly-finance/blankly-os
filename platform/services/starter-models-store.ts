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

import {getCollection, getDoc, setDoc} from '@/libs/firestore';
import {StarterModel} from "@/types/model";

function createStarterModel(uid: string, name: string, description: string, backtestId: string, modelId: string, tags: Array<string>, url: string,) {
    const data = {
        userId: uid,
        name: name,
        url: url,
        description: description,
        backtestId: backtestId,
        modelId: modelId,
        tags: tags
    }
    return setDoc(`starterModels/${modelId}`, data).then(() => {
        return modelId;
    });
}

async function getStarterModels() {
    const modelsQuery = await getCollection('/projects/starters/models');
    let models = [];
    for (const modelQuery of modelsQuery.docs) {
        const model = modelQuery.data();
        const metricsQuery = await getDoc(`/projects/starters/models/${model.modelId}/backtests/${model.backtestId}/metrics/blankly`);
        const metricsData = metricsQuery.data();

        // TODO this is a patch fix
        if (metricsData === undefined) {
            continue
        }

        const sharpe = metricsData?.metrics.sharpe.value ? metricsData?.metrics.sharpe.value : 0;
        const sortino = metricsData?.metrics.sortino.value ? metricsData?.metrics.sortino.value : 0;
        const cagr = metricsData?.metrics.cagr.value ? metricsData?.metrics.cagr.value : 0;
        const starterModel: StarterModel = {
            id: model.starterModelId,
            backtestId: model.backtestId,
            modelId: model.modelId,
            creatorUid: model.creatorId,
            name: model.name,
            description: model.description,
            labels: model.labels,
            tickers: model.tickers,
            exchange: model.exchanges,
            stats: { sortino: sortino, sharpe: sharpe, cagr: cagr }
        }
        models.push(starterModel);
    }
    return models;
}

function getStarterModel(id: string) {
    return getDoc(`/starterModels/${id}`);
}

function getBlanklyMetrics(docId: string) {
    return getDoc(`starterModels/${docId}/metrics/blankly`)
}

function getBlanklyTimeseriesMetrics(docId: string) {
    return getDoc(`starterModels/${docId}/timeseriesMetrics/blankly`)
}

export {createStarterModel, getStarterModel, getStarterModels, getBlanklyMetrics, getBlanklyTimeseriesMetrics};
