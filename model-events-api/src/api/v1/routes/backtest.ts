import {setData} from "../../../utility/firebase";
import {Request, Response, Router} from "express";
import {checkArgs, internalError, writeFirebase} from "../versionUtils";
import axios from "axios";
import multer from "multer"
import FormData from "form-data"
import * as moment from 'moment';
import fs from "fs"
import mixpanel from "mixpanel";
import path from "path";
const { v4: uuidv4 } = require("uuid");


const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let random_hash = uuidv4()
        // TODO: check for collision
        fs.mkdirSync(path.resolve(`backtest_files/${random_hash}`), { recursive: true })
        cb(null, path.resolve(`backtest_files/${random_hash}`))
    },
    filename: function (req, file, cb) {
        cb(null, 'large_post.json')
    }
})


const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 1024 * 5,
    }
});

/*
 * These are backtest specific functions
 */
router.post('/result', upload.any (), async (req: Request, res: Response) => {
    const pathStore: any = {}
    if (req.files !== undefined) {
        for (let i = 0; i<req.files.length; i++) {
            // @ts-ignore
            const file_description: any = req.files[i]
            const contents = JSON.parse(fs.readFileSync(file_description.path).toString())
            const value = Object.keys(contents)[0];

            // Add this into the headers to deal with normally
            req.body[value] = contents[value]

            // Store the path for later
            pathStore[value] = file_description.path
        }
    }
    const data = req.body

    if (!checkArgs(data, ['symbols', 'quote_asset', 'start_time', 'stop_time', 'backtest_id', 'account_values', 'trades', 'metrics', 'indicators'], res)) { return }

    const segmentedAccountValues = data.account_values.length > 10000

    if (!Array.isArray(data.symbols)) {
        req.body.symbols = [data.symbols]
    }

    const start = moment.unix(data.start_time).format('MM/DD/YY')
    const finish = moment.unix(data.stop_time).format('MM/DD/YY')
    const description = `Ran on ${data.symbols.join(', ')} from ${start} to ${finish}`
    
    writeFirebase(res.locals.blankly, `/backtests/${data.backtest_id}`, {
        result: {
            symbols: data.symbols,
            quoteAsset: data.quote_asset,
            startTime: data.start_time,
            stopTime: data.stop_time,
            exchange: data.exchange,
            backtestId: data.backtest_id,
            time: res.locals.blankly.time,
            segmentedAccountValues: segmentedAccountValues
        },
        description,
        time: res.locals.blankly.time,
        runBy: res.locals.blankly.apiKey
    }, `set`, res).catch(function (message) {internalError(message)})

    writeFirebase(res.locals.blankly, `/backtests/${data.backtest_id}/trades/trades`, {
        trades: data.trades
    }, `set`).catch(function (message) {internalError(message)})
    if (!segmentedAccountValues) {
        writeFirebase(res.locals.blankly, `/backtests/${data.backtest_id}/accountValues/accountValues`, {
            accountValues: data.account_values
        }, `set`).catch(function (message) {internalError(message)})
    } else {
        let values =  []
        let postCount = 0
        for (let i = 0; i<data.account_values.length; i++) {
            values.push(data.account_values[i])
            // Push them in batches of 10k
            if (values.length === 10000) {
                writeFirebase(res.locals.blankly, `/backtests/${data.backtest_id}/accountValues/${postCount}`, {
                    accountValues: values,
                    index: postCount
                }, `set`).catch(function (message) {internalError(message)})
                values = []
                postCount = postCount + 1
            }
        }
    }

    let axiosPost: any;

    if (!segmentedAccountValues) {
        axiosPost = axios({
            method: 'post',
            url: `${process.env.URL_METRICS_SERVICE_API}/get-metrics`,
            data: {
                accountValues: data.account_values
            }
        })
    } else {
        const formData = new FormData()
        formData.append('file', fs.createReadStream(pathStore.account_values))
        axiosPost = axios({
            method: 'post',
            url: `${process.env.URL_METRICS_SERVICE_API}/get-metrics`,
            headers: {...formData.getHeaders()},
            data: formData
        })
    }
    // Get quantstats and write them to firebase
    axiosPost.then(async function (response: any) {
        const metricsAndIndicators = response.data
        writeFirebase(res.locals.blankly, `/backtests/${data.backtest_id}/metrics/blankly`, {metrics: metricsAndIndicators.metrics}, `set`).catch(function(message) {internalError(message)})
        writeFirebase(res.locals.blankly, `/backtests/${data.backtest_id}/timeseriesMetrics/blankly`, {timeseriesMetrics: metricsAndIndicators.timeseriesMetrics}, `set`).catch(function(message) {internalError(message)})
    })

    // Custom metrics
    writeFirebase(res.locals.blankly, `/backtests/${data.backtest_id}/metrics/custom`, {
        metrics: data.metrics ? data.metrics : {}
    }, `set`).catch(function (message) {internalError(message)})
    // Custom indicators
    writeFirebase(res.locals.blankly, `/backtests/${data.backtest_id}/indicators/custom`, {
        indicators: data.indicators ? data.indicators : {}
    }, `set`).catch(function (message) {internalError(message)})
    init.track('Uploaded Backtest Result', {
        distinct_id: res.locals.blankly.projectId, // since this is the user,
        startTime: data.startTime,
        endTime: data.endTime,
        numTrades: data.trades.length,
        numSymbols: data.symbols.length,
        hasIndicators: data.indicators !== null
    })
});

router.post('/status', async (req: Request, res: Response) => {
    const data = req.body

    if (!checkArgs(data, ['successful', 'status_summary', 'status_details', 'time_elapsed', 'backtest_id'], res)) { return }

    const postBody: any = {
        status: {
            successful: data.successful,
            statusSummary: data.status_summary,
            statusDetails: data.status_details,
            timeElapsed: data.time_elapsed,
            backtestId: data.backtest_id,
            time: res.locals.blankly.time
        }
    }
    if (data.description !== undefined) {
        postBody.description = data.description
    }
    if (data.label !== undefined) {
        postBody.label = data.label
    }
    writeFirebase(res.locals.blankly, `/backtests/${data.backtest_id}`, postBody, `set`, res).catch(function (message) {internalError(message)})
    const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674')
    init.track('Checked Backtest Status', {
        distinct_id: res.locals.blankly.projectId, // since this is the user,
        statusSummary: data.status_summary
    })
});


router.post('/log', async (req: Request, res: Response) => {
    const body = req.body;
    const locals = res.locals.blankly
    if (!checkArgs(body, ['line', 'type', 'backtest_id'], res)) { return }

    const time = Math.floor(locals.time)

    const path = `projects/${locals.projectId}/models/${locals.modelId}/backtests/${body.backtest_id}/out/${time}`;
    setData(path, {
        line: body.line,
        type: body.type
    });
    return res.status(200).send()
})

// TODO add a backtest-specific lifecycle route for viewing the status of backtests in realtime

export default router
