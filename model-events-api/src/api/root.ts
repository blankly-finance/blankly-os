import {Request, Response, Router} from 'express';

const root = Router()

root.get('/time', async (req: Request, res: Response) => {
    const epoch: number = ((new Date()).getTime())/1000
    res.json({
        time: epoch
    })
})

root.get('/', async (req: Request, res: Response) => {
    res.json({
        message: "Welcome to the blankly events server. Use this API to easily post model details to the platform for better insights & sharing.",
        docs: "https://docs.blankly.finance/services/events"
    })
})

export {
    root
}