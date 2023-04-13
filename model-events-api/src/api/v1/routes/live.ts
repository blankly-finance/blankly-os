import { Request, Response, Router } from 'express';
import {checkArgs, writeFirebase} from '../versionUtils'
import mixpanel from 'mixpanel';
import { setData } from "../../../utility/firebase";
import { internalError } from "../versionUtils";
import axios from "axios";

const router = Router();

router.post('/event', async (req: Request, res: Response) => {
    const data = req.body
    if (!checkArgs(data, ['args', 'response', 'type'], res)) { return }

    writeFirebase(res.locals.blankly, `/events/${data.type}/event`,{
        args: data.args,
        response: data.response,
        type: data.type,
        annotation: data.annotation,
        time: res.locals.blankly.time
    }, "add", res).catch(function (message) {internalError(message)}).then(function () {
        writeFirebase(res.locals.blankly, `/events/${data.type}`, {
            desc: 'event'
        }, 'set').catch(function (message) {internalError(message)})
    })
})

router.post('/spot-market', async (req: Request, res: Response) => {
    const data = req.body
    if (!checkArgs(data, ['symbol', ['size', 'funds'], 'id', 'side', 'exchange'], res)) { return }

    writeFirebase(res.locals.blankly, `/trades/${data.id}`, {
        symbol: data.symbol,
        size: data.size,
        funds: data.funds,
        id: data.id,
        side: data.side,
        annotation: data.annotation,
        time: res.locals.blankly.time,
        exchange: data.exchange,
        type: 'spot-market'
    }, 'set', res).catch(function (message) {internalError(message)})
    const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');
    init.track('Spot Order', {
        distinct_id: res.locals.blankly.projectId,
        type: 'spot-market',
        funds: data.funds, // since this is the user,
        side: data.side,
        symbol: data.symbol,
        size: data.size,
    })
})

router.post('/spot-limit', async (req: Request, res: Response) => {
    const data = req.body
    if (!checkArgs(data, ['symbol', ['size', 'funds'], 'id', 'side', 'price', 'exchange', ['executed_time', 'canceled_time', 'status']], res)) { return }

    writeFirebase(res.locals.blankly, `/trades/${data.id}`, {
        symbol: data.symbol,
        size: data.size,
        funds: data.funds,
        id: data.id,
        side: data.side,
        price: data.price,
        annotation: data.annotation,
        time: res.locals.blankly.time,
        exchange: data.exchange,
        type: 'spot-limit',
        executed_time: data.executed_time,
        canceled_time: data.canceled_time,
        status: data.status
    }, 'set', res).catch(function (message) {internalError(message)})
    const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');
    init.track('Spot Order', {
        distinct_id: res.locals.blankly.projectId,
        type: 'spot-limit',
        funds: data.funds, // since this is the user,
        side: data.side,
        symbol: data.symbol,
        size: data.size,
    })
})

router.post('/spot-stop', async (req: Request, res: Response) => {
    const data = req.body
    if (!checkArgs(data, ['symbol', ['size', 'funds'], 'id', 'side', 'price', 'activate', 'exchange'], res)) { return }

    writeFirebase(res.locals.blankly, `/trades/${data.id}`, {
        symbol: data.symbol,
        size: data.size,
        funds: data.funds,
        id: data.id,
        side: data.side,
        price: data.price,
        activate: data.activate,
        annotation: data.annotation,
        time: res.locals.blankly.time,
        exchange: data.exchange,
        type: 'spot-stop'
    }, 'set', res).catch(function (message) {internalError(message)})
    const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');
    init.track('init Order', {
        distinct_id: res.locals.blankly.projectId,
        type: 'spot-stop',
        funds: data.funds, // since this is the user,
        side: data.side,
        symbol: data.symbol,
        size: data.size,
    })
})

router.post('/update-trade', async (req: Request, res: Response) => {
    const data = req.body
    if (!checkArgs(data, ['id'], res)) { return }

    writeFirebase(res.locals.blankly, `/trades/${data.id}`, data, 'set', res).catch(function (message) {internalError(message)})
})

router.post('/update-annotation', async (req: Request, res: Response) => {
    const data = req.body
    if (!checkArgs(data, ['id', 'annotation'], res)) { return }

    writeFirebase(res.locals.blankly, `/trades/${data.id}`, {
        annotation: data.annotation
    }, 'set', res).catch(function (message) {internalError(message)})
})


router.post('/auto-pnl', async (req: Request, res: Response) => {
    const data = req.body;
    if (!checkArgs(data, ['enabled'], res)) { return }

    writeFirebase(res.locals.blankly, ``, {
        enablePNL: data.enabled
    }, 'set', res).catch(function (message) {internalError(message)})
})

router.post('/set-pnl', async (req: Request, res: Response) => {
    const data= req.body;
    if (!checkArgs(data, ['values'], res)) { return }

    const values = JSON.parse(data.values)

    axios.post(`${process.env.URL_METRICS_SERVICE_API}/get-metrics`, {
        accountValues: values
    }).then(async function (response: any) {
        const metricsAndIndicators = response.data
        writeFirebase(res.locals.blankly, `/metrics/blankly`, {metrics: metricsAndIndicators.metrics}, `set`).catch(function(message) {internalError(message)})
        writeFirebase(res.locals.blankly, `/timeseriesMetrics/blankly`, {timeseriesMetrics: metricsAndIndicators.timeseriesMetrics}, `set`).catch(function(message) {internalError(message)})
    })

    writeFirebase(res.locals.blankly, `/PNL/PNLValue`, {
        PNLValue: values
    }, 'set', res).catch(function (message) {internalError(message)})
})

router.post('/screener-result', async (req: Request, res: Response) => {
    const data = req.body
    if (!checkArgs(data, ['result'], res)) { return }

    writeFirebase(res.locals.blankly, `/screeners`, {
        result: data.result,
        time: res.locals.blankly.time
    }, 'add', res).catch(function (message) {internalError(message)})
    const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');
    init.track('Screener Result', {
        distinct_id: res.locals.blankly.projectId,
    })
})

router.post(`/set-custom-metric`, async (req: Request, res: Response) => {
    const body = req.body
    if (!checkArgs(body, ['metrics'], res)) { return }

    writeFirebase(res.locals.blankly, `/metrics/custom`, {
        metrics: body.metrics ? JSON.parse(body.metrics) : {}
    }, `set`, res).catch(function (message) {internalError(message)})
})

router.post('/log', async (req: Request, res: Response) => {
    const body = req.body;
    const locals = res.locals.blankly
    if (!checkArgs(body, ['line', 'type'], res)) { return }

    const time = Math.floor(locals.time)

    const path = `projects/${locals.projectId}/models/${locals.modelId}/live/out/${time}`;
    setData(path, {
        line: body.line,
        type: body.type
    });
    return res.status(200).send()
})

export default router