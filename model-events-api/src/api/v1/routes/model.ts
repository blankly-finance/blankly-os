import {Request, Response} from "express";
import {internalError, writeFirebase} from "../versionUtils";
import router from "./live";

router.post('/lifecycle', async (req: Request, res: Response) => {
    const data = req.body

    writeFirebase(res.locals.blankly, ``,{
        lifecycleStatus: {
            message: data.message,
            startAt: data.start_at,
            endAt: data.end_at,
            running: data.running
        },
    }, "set", res).catch(function (message) {internalError(message)})
})

router.post('/used-symbol', async (req: Request, res: Response) => {
    const data = req.body;

    const symbol = data.symbol
    const postData: any = {}
    postData['tickers'] = {}
    postData['tickers'][symbol] = symbol

    writeFirebase(res.locals.blankly, ``, postData, 'set', res).catch(function (message) {internalError(message)})
});

router.post('/used-exchange', async (req: Request, res: Response) => {
    const data = req.body;

    const exchange = data.exchange
    const postData: any = {}
    postData['exchanges'] = {}
    postData['exchanges'][exchange] = exchange

    writeFirebase(res.locals.blankly, ``, postData, 'set', res).catch(function (message) {internalError(message)})
})

export default router