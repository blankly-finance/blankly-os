import { Request, Response, Router } from 'express';
import {setDoc, addDoc, getCollection, deleteDocument, deleteCollection, deleteData, getDoc, createDocumentReference} from '../utility/firebase';
import {getPlans, postToken} from './commonRoutes'
import mixpanel from 'mixpanel';
import {checkArgs, killPod, userCanModifyProject} from "../utility/utils";
import {firestore} from "firebase-admin";
import FieldValue = firestore.FieldValue;
const { v4: uuidv4 } = require("uuid");

const router = Router();

const TOKEN_ID_LENGTH = 10;

router.get('/list', async (req: Request, res: Response) => {
    if (req.headers.uid as string === undefined) {
        return res.json({ 'error': 'Missing user id.' })
    }
    const path = `/users/${req.headers.uid as string}/projects`;
    const result = await getCollection(path);
    res.status(200).send(result);
});
router.post('/plans', async (req: Request, res: Response) => {
    let folder = req.body.type
    let plans = await getPlans(folder)
    if (plans.length === 0) {
        res.status(200).send({'status': 'error', 'message': 'Plan type not found.'})
    } else {
        res.status(200).send(plans)
    }
})

router.post('/create', async (req: Request, res: Response) => {
    const data = req.body;
    const name = data.name;
    const description = data.description;

    // query plan resource limits
    const currTime = new Date().getTime()/1000
    const projectData = {
        name,
        creator: req.headers.uid as string,
        createdAt: currTime,
        description: description,
    };
    const addedResult = await addDoc(`/projects`, projectData);

    // Now re-add the project ID (extra request, but it should exist as a promise)
    setDoc(`/projects/${addedResult.id}`, {
        projectId: addedResult.id
    })

    setDoc(`/projects/${addedResult.id}/users/${req.headers.uid as string}`, {
        level: 15
    })

    const userData = {
        name,
        projectId: addedResult.id,
        createdAt: projectData.createdAt,
        role: 'owner',
        status: 'accepted',
        description: description,
        lastAccessed: currTime
    };
    const userPath = `/users/${req.headers.uid as string}/projects`;
    await setDoc(`${userPath}/${addedResult.id}`, userData);
    const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');
    init.track('Project Created', {
        distinct_id: req.headers.uid,
    })

    return res.status(200).send({
        name: name,
        status: 'created',
        createdAt: projectData.createdAt,
        projectId: addedResult.id,
        description: description,
    });
});

router.get('/teams', async (req: Request, res: Response) => {
    const teamsCollection = await getCollection(`users/${req.headers.uid}/teams`) || []
    const teams = await Promise.all(teamsCollection.map((team: any) => getDoc(`teams/${team.id}`)))
    return res.status(200).json(teams)
})

router.post('/delete', async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, ['projectId'])

    // if it doesn't have the required keys, exit here
    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    // Make sure the user can modify this project
    if (!(await userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        return res.status(400).json({error: `Invalid Permission.`})
    }
    try {
        // Non-authed route
        const projectId = req.body.projectId

        // First thing is hide it from the user
        await deleteDocument(`/users/${req.headers.uid as string}/projects/`, projectId).catch()

        // Must be able to delete it then
        const collection: any = await getCollection(`/projectSecure/${projectId}/models`)

        const killedModels = []
        // Loop through and kill the pods
        for (let i = 0; i<collection.length; i++) {
            killedModels.push(killPod(req.headers.uid as string, collection[i].kubernetesName))
        }

        // Now wait for all the deletes to come back
        await Promise.all(killedModels)

        // Wipe the collections first
        const modelDelete = deleteCollection(`/projects/${projectId}/models`).catch()
        const userDelete = deleteCollection(`/projects/${projectId}/users`).catch()

        const modelSecureDelete = deleteCollection(`/projectSecure/${projectId}/models`).catch()

        // Do both at the same time
        await Promise.all([modelDelete, userDelete, modelSecureDelete])

        // Now wipe the documents
        const secureDelete = deleteDocument(`/projectSecure/`, projectId).catch()
        const projectDelete = deleteDocument(`/projects/`, projectId).catch()

        await Promise.all([secureDelete, projectDelete])
        const init = mixpanel.init('0b2135a9ea74656218db6e1018e00674');
        init.track('Project Deleted', {
            distinct_id: req.headers.uid,
        })
        await deleteData(`/projects/${projectId}`)
        return res.status(200).send()
    } catch {
        return res.status(500).send()
    }
})


router.post('/generate-project-token', async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, ['projectId', 'name', 'autogenerated'])

    // if it doesn't have the required keys, exit here
    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    if (await (userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        const token = uuidv4()

        // Post the token to firebase
        const keys = await postToken(req.headers.uid as string, token, req.body.projectId, true, true, req.body.name, req.body.autogenerated)

        // Send the raw response back to the user
        return res.status(200).json( { apiKey: keys[0], apiPass: keys[1] } )
    } else {
        return res.status(400).json( { error: 'Invalid permission' } )
    }
})

router.post('/list-tokens', async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, ['projectId'])

    // if it doesn't have the required keys, exit here
    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    if (await (userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        const result = []
        const tokens = (await getDoc(`apiKeys/${req.headers.uid}`)).tokens

        for (const secretHash in tokens) {
            result.push({
                id: secretHash.substring(0, TOKEN_ID_LENGTH),
                name: tokens[secretHash].name,
                read: tokens[secretHash].read,
                write: tokens[secretHash].write,
                timestamp: tokens[secretHash].timestamp,
                projectId: tokens[secretHash].projectId,
                autogenerated: tokens[secretHash].autogenerated
            })
        }

        return res.status(200).json({'keys': result})
    } else {
        return res.status(400).json( { error: 'Invalid permission' } )
    }
})

router.post('/delete-project-token', async (req: Request, res: Response) => {
    let validity = checkArgs(req.body, ['projectId', 'tokenId'])

    // if it doesn't have the required keys, exit here
    if (!validity[0]) {
        return res.status(400).json({error: `Missing required argument: ${validity[1]}`})
    }

    if (await (userCanModifyProject(req.headers.uid as string, req.body.projectId))) {
        const tokens = (await getDoc(`apiKeys/${req.headers.uid}`)).tokens;

        // Search for the full hash if it matches the first 10 chars
        let fullHash;
        let found = false;
        for (const secretHash in tokens) {
            if (secretHash.substring(0, TOKEN_ID_LENGTH) == req.body.tokenId) {
                fullHash = secretHash
                found = true
                break;
            }
        }
        if (!found) {
            return res.status(400).json({error: 'tokenId not found'})
        }

        // Reference the doc and then delete it
        const ref = await createDocumentReference(`apiKeys`, req.headers.uid as string)
        await ref.set({
            tokens: {
                [fullHash]: FieldValue.delete()
            }
        }, {merge: true});

        return res.status(200).send()
    } else {
        return res.status(401).json( { error: 'Invalid permission' } )
    }
})

export default router;
