import {Request, Response, Router} from 'express';
import {addDoc, deleteCollection, deleteDocument, getCollection, getDoc,} from '../utility/firebase';
import moment from 'moment';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {run, upload as uploadModelUtil} from "./commonRoutes";
import {checkArgs, killJob, killPod, parseAndPostStatus, userCanModifyProject} from "../utility/utils";
import mixpanel from 'mixpanel';
import {getPodStatus} from "../utility/kubernetes";

const {v4: uuidv4} = require("uuid");

const createModelArgs = ['projectId', 'type', 'name', 'description']

// Just upload or just deploy
const uploadArgs = ["pythonVersion", "versionDescription", "projectId", "modelId", "type"]
const deployArgs = ['modelId', 'projectId', 'versionId', 'plan', 'type']

// Upload and deploy or upload and backtest
const uploadAndDeployArgs = [...uploadArgs, ...['plan']]
const backtestArgs = [...["pythonVersion", "projectId", "modelId", "type"], ...['backtestingArgs', 'backtestDescription', 'plan']]

// Accept invites for view-only collaborators and team invites


let parseUploadQuery = function (req: Request) {
    // Passed in through the body
    const pythonVersion: string = req.body.pythonVersion as string;
    const versionDescription: string = req.body.versionDescription as string;
    const projectId: string = req.body.projectId as string;
    const modelId: string = req.body.modelId as string
    const type: string = req.body.type as string

    // Headers and other details
    const file = req.file;
    const userId: string = req.headers.uid as string

    return {
        file: file,
        projectId: projectId,
        type: type,
        versionDescription: versionDescription,
        modelId: modelId,
        userId: userId,
        pythonVersion: pythonVersion
    }
}

// Defines where file uploads go and how they are named
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let random_hash = uuidv4()
        // TODO: check for collision
        fs.mkdirSync(path.resolve(`deployment/${random_hash}`), {recursive: true})
        cb(null, path.resolve(`deployment/${random_hash}`))
    },
    filename: function (req, file, cb) {
        cb(null, 'model.zip')
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 1024 * 5,
    }
});

const router = Router();

router.get('/status', async (req: Request, res: Response) => {
    return res.status(200).send("server is running");
});

router.post('/details', async (req: Request, res: Response) => {
    const data = req.body;
    const path = `projects/${data.projectId}/models/${data.modelId}`;
    const result = await getDoc(path);
    return res.status(200).send(result);
});

router.post('/create-model', async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, createModelArgs)

    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    // Validate that the user is authenticated
    if (!(await userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        return res.status(400).json({error: `Invalid permission.`})
    }
    const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');
    init.track('Model Created', {
        distinct_id: req.headers.uid,
        location: 'CLI'
    })

    const model = await addDoc(`/projects/${req.body.projectId}/models`, {
        name: req.body.name,
        description: req.body.description,
        type: req.body.type
    })

    return res.status(200).json({
        status: 'success',
        'modelId': model.id
    })
})

router.post(`/delete`, async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, ['projectId', 'modelId'])

    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    // Validate that the user is authenticated
    if (!(await userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        return res.status(400).json({error: `Invalid permission.`})
    }

    const collection: any = await getDoc(`/projectSecure/${req.body.projectId}/models/${req.body.modelId}`)

    try {
        await killPod(req.headers.uid as string, collection.kubernetesName)
    } catch (e) {
    }

    await Promise.all([
        deleteCollection(`/projectSecure/${req.body.projectId}/models/${req.body.modelId}/versions`).catch(),
        deleteDocument(`/projectSecure/${req.body.projectId}/models`, req.body.modelId).catch(),

        deleteCollection(`/projects/${req.body.projectId}/models/${req.body.modelId}/PNL`).catch(),
        deleteCollection(`/projects/${req.body.projectId}/models/${req.body.modelId}/live`).catch(),
        deleteCollection(`/projects/${req.body.projectId}/models/${req.body.modelId}/metrics`).catch(),
        deleteCollection(`/projects/${req.body.projectId}/models/${req.body.modelId}/timeseriesMetrics`).catch(),
        deleteCollection(`/projects/${req.body.projectId}/models/${req.body.modelId}/trades`).catch(),
        deleteCollection(`/projects/${req.body.projectId}/models/${req.body.modelId}/backtests`).catch(),
        deleteCollection(`/projects/${req.body.projectId}/models/${req.body.modelId}/versions`).catch(),

        deleteDocument(`/projects/${req.body.projectId}/models`, req.body.modelId).catch(),
    ])
    const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');
    init.track('Model Deleted', {
        distinct_id: req.headers.uid,
    })

    return res.status(200).send()
})

router.post(`/kill`, async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, ['projectId', 'modelId'])

    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    // Validate that the user is authenticated
    if (!(await userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        return res.status(400).json({error: `Invalid permission.`})
    }

    const collection: any = await getDoc(`/projectSecure/${req.body.projectId}/models/${req.body.modelId}`)
    const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');
    init.track('Model Killed', {
        distinct_id: req.headers.uid,
    })

    try {
        if ((await getDoc(`/projects/${req.body.projectId}/models/${req.body.modelId}`)).type == 'screener') {
            await killJob(req.body.projectId, collection.kubernetesName)
        } else {
            // If its anything besides a screener its probably a pod
            await killPod(req.body.projectId, collection.kubernetesName)
        }
        return res.status(200).send()
    } catch (e) {
        return res.status(500).send()
    }

})

router.get('/starter-models', async (req: Request, res: Response) => {
    return res.status(200).json(
        await getCollection('/starterModels')
    )
})

router.post('/list', async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, ['projectId'])

    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    // Validate that the user is authenticated
    if (!(await userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        return res.status(400).json({error: `Invalid permission.`})
    }

    const path = `/projects/${req.body.projectId}/models`;
    const result: any = await getCollection(path);
    let output = []
    for (let i = 0; i < result.length; i++) {
        output.push({
            id: result[i].id,
            description: result[i].description,
            name: result[i].name,
            type: result[i].type
        })
    }
    res.status(200).send(output);
})

router.post('/deploy', upload.single('model'), async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, uploadAndDeployArgs)

    // if it doesn't have the required keys, exit here
    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    if (req.body.type == "screener") {
        if (req.body.schedule == undefined) {
            return res.status(400).json({error: "Must pass schedule argument to run a screener"})
        }
    }

    if (!(await userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        return res.status(400).json({error: `Invalid permission.`})
    }

    const parsedUpload = parseUploadQuery(req)

    let details = await uploadModelUtil(parsedUpload.file, parsedUpload.pythonVersion, parsedUpload.versionDescription, parsedUpload.projectId, parsedUpload.modelId, parsedUpload.type, parsedUpload.userId)

    if ('error' in details) {
        return res.status(400).json(details)
    }

    // Assume no backtesting for a deploy

    const start = Date.now()

    await run(
        parsedUpload.projectId,
        req.headers.uid as string,
        'live',
        req.body.plan,
        details.modelId,
        details.versionId,
        false,
        req.body.schedule
    )

    const response = {
        timestamp: moment().format(),
        modelId: details.modelId,
        versionId: details.versionId,
        status: 'success',
        projectId: parsedUpload.projectId,
        description: parsedUpload.versionDescription,
        createdAt: details.createdAt
    }

    const end = Date.now() - start;
    const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');
    init.track('Model Deployed', {
        distinct_id: req.headers.uid,
        duration: end
    })
    return res.status(200).send(response);
});

router.post('/upload', upload.single('model'), async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, uploadArgs)

    // if it doesn't have the required keys, exit here
    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    if (!(await userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        return res.status(400).json({error: `Invalid permission.`})
    }

    const parsedUpload = parseUploadQuery(req)

    let details = await uploadModelUtil(parsedUpload.file, parsedUpload.pythonVersion, parsedUpload.versionDescription, parsedUpload.projectId, parsedUpload.modelId, parsedUpload.type, parsedUpload.userId)

    if ('error' in details) {
        res.status(400).json(details)
    } else {
        // Ensure the deletion of the imgUrl key
        delete details["imgUrl"]
        return res.status(200).send(
            details
        )
    }
})

router.post('/backtest', upload.single('model'), async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, backtestArgs)

    // if it doesn't have the required keys, exit here
    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    if (!(await userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        return res.status(400).json({error: `Invalid permission.`})
    }

    const args = JSON.parse(req.body.backtestArgs)

    const parsedUpload = parseUploadQuery(req)

    let details = await uploadModelUtil(parsedUpload.file, parsedUpload.pythonVersion, req.body.backtestDescription, parsedUpload.projectId, parsedUpload.modelId, parsedUpload.type, parsedUpload.userId)

    await run(
        details.projectId,
        req.headers.uid as string,
        'backtesting',
        'slow',
        details.modelId,
        details.versionId,
        true,
        undefined,
        args,
        req.body.backtestDescription
    )
    const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');
    init.track('Backtest Run', {
        distinct_id: req.headers.uid,
    })

    return res.status(200).send({
        modelId: details.modelId,
        versionId: details.versionId,
        status: 'success',
        projectId: details.projectId,
        timestamp: moment().format()
    })
})

router.post('/backtest-uploaded-model', async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, backtestArgs)

    // if it doesn't have the required keys, exit here
    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    if (!(await userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        return res.status(400).json({error: `Invalid permission.`})
    }

    await run(
        req.body.projectId,
        req.headers.uid as string,
        'backtesting',
        'slow',
        req.body.modelId,
        req.body.versionId, // Most version Ids are set to 1
        true,
        undefined,
        JSON.parse(req.body.backtestArgs),
        req.body.backtestDescription
    )

    // Respond with 200 if all of that works
    return res.status(200).json({});
})


router.post('/run', async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, deployArgs)

    // if it doesn't have the required keys, exit here
    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    if (req.body.type == "screener") {
        if (req.body.schedule == undefined) {
            return res.status(400).json({error: "Must pass schedule argument to run a screener"})
        }
    }

    if (!(await userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        return res.status(400).json({error: `Invalid permission.`})
    }

    await run(
        req.body.projectId,
        req.headers.uid as string,
        'live',
        req.body.plan,
        req.body.modelId,
        req.body.versionId,
        false,
        req.body.schedule,
        req.body.type
    )
    const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');
    init.track('Model Run', {
        distinct_id: req.headers.uid,
    })

    return res.status(200).json({})
})


router.post('/status', async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, ['projectId', 'modelId'])
    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    if (!(await userCanModifyProject(req.headers.uid as string, req.body))) {
        return res.status(400).json({error: `Invalid Permission`})
    }

    // Get the kubernetes name to identify what's running
    const collection: any = await getDoc(`/projectSecure/${req.body.projectId}/models/${req.body.modelId}`)

    // Check that pod directly
    const result = await getPodStatus((req.headers.uid as string).toLowerCase(), collection.kubernetesName)
    await parseAndPostStatus(result.body, req.body.projectId, req.body.modelId)

    return res.status(200).send()
})

export default router;
