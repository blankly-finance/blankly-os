import {Router, Request, Response} from "express";
import {getAllPods} from "../utility/kubernetes";
import {parseAndPostStatus} from "../utility/utils";

const router = Router();

function extractIdentifier(podName: string) {
    const splitString = podName.split('/')
    const identifier = splitString[3]
    // The identifier is formatted like this
    // ${_PROJECT_ID}-${_MODEL_ID}:${_VERSION_ID}

    // So first split across the colon
    const colonSplit = identifier.split(':')

    // The first one still contains project and model ID
    const projectIdAndModelId = colonSplit[0]

    return  {
        // So split the first one again into project & model
        projectId: projectIdAndModelId.split('-')[0],
        modelId: projectIdAndModelId.split('-')[1],

        // Now the first colon split contains the version ID
        versionId: colonSplit[1]
    }
}

router.get('/refresh-lifecycles', async (req: Request, res: Response) => {
    // Ensure that this is passing the secret value
    // This could be expanded into its own middleware
    if (process.env.CLOUD_SCHEDULER_SECRET === req.headers.token) {
    }
    const podInfo = await getAllPods()

    for (let config of podInfo.body.items) {
        await parseAndPostStatus(config)
    }
    return res.status(200).json(podInfo)
})

export default router;
