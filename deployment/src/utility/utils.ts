// Utility file for deployment API

// Use this to determine if the request has the valid keys
// Returns array with [true/false, missing key name if false]
import {getCollection, setDoc} from "./firebase";
import {deleteModel, deleteJob} from "./kubernetes";
import {V1EnvVar} from "@kubernetes/client-node/dist/gen/model/v1EnvVar";
import {V1Pod} from "@kubernetes/client-node";

let checkArgs = function (json: Object, args: Array<string>) {
    for (let element of args) {
        if (!(element in json)) {
            return [false, element]
        }
    }
    return [true, null]
}

let userCanModifyProject = async function(userId: string, projectId: string) {
    if (userId === projectId)
        return true

    const teams = await getCollection(`/users/${userId}/teams`)
    for (const team of teams) {
        if (projectId == team.id)
            return true
    }

    return false
}

let killPod = async function(userId: string, kubernetesName: string) {
    await deleteModel(userId, kubernetesName)
}

let killJob = async function(userId: string, kubernetesName: string) {
    await deleteJob(userId, kubernetesName)
}

let wipe = async function(projectId: string, modelId: string) {
    return await setDoc(`projects/${projectId}/models/${modelId}`, {
        exchanges: null,
        lifecycleStatus: {
            message: 'Deploying',
            endAt: null,
            startAt: null,
            running: null
        },
        tickers: null,
        schedule: null
    })
}


function extractEnvs(envList: Array<V1EnvVar>) {
    interface kubeConfiguration {
        projectId: string,
        modelId: string,
        versionId: string
    }
    const response: kubeConfiguration = {
        projectId: undefined,
        modelId: undefined,
        versionId: undefined
    }
    // Loop through and extract each of the envs as they're found
    for (let env of envList) {
        if (env.name == 'PROJECT_ID') {
            response.projectId = env.value
        } else if (env.name == 'MODEL_ID') {
            response.modelId = env.value
        } else if (env.name == "VERSION_ID") {
            response.versionId = env.value
        }
    }

    return response
}

const parseAndPostStatus = async (pod: V1Pod, projectId: string = undefined, modelId: string = undefined) => {
    const namespace = pod.metadata.namespace

    // If the pod is placed in by kubernetes then ignore it
    if (namespace == 'default' || namespace == 'kube-system') {
        return
    }

    // All user pods should be only a single container
    const state = pod.status.containerStatuses[0].state

    // Ignore anything running or completed normally
    // Largely just checking for weird cases
    if (state.terminated !== undefined && state.terminated.reason != 'Completed') {
        console.log(state)
        let reason = state.terminated.reason

        // Parse kube reasons into something nicer here
        if (reason == 'OOMKilled') {
            reason = "Out of Memory"
        }

        const finishedAt = (new Date(state.terminated.finishedAt)).getTime()/1000

        try {
            const identifier = extractEnvs(pod.spec.containers[0].env)
            // Update the lifecycle with this new data
            // console.log(`${JSON.stringify({
            //     lifecycleStatus: {
            //         endAt: finishedAt,
            //         running: false,
            //         message: reason
            //     }
            // })} at projects/${identifier.projectId}/models/${identifier.modelId}`)

            setDoc(`projects/${identifier.projectId}/models/${identifier.modelId}`, {
                lifecycleStatus: {
                    endAt: finishedAt,
                    running: false,
                    message: reason
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
};


export {checkArgs, userCanModifyProject, wipe, killPod, killJob, parseAndPostStatus}
