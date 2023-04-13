import {KubeConfig, CoreV1Api, BatchV1Api, AppsV1Api, V1Job, V1Pod} from '@kubernetes/client-node';
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let kc: any = undefined
let k8sApi: CoreV1Api = undefined
let k8sBatchApi: BatchV1Api = undefined

// This would reference a .json or configuration file for the deployment
const deployment_config_template = JSON.parse(fs.readFileSync('./src/container-configs/pod-config.json'))
const signalConfigTemplate =  JSON.parse(fs.readFileSync('./src/container-configs/chronjob.json'))

// TODO optimize this double init from above to here
function initKube() {
    kc = new KubeConfig();
    kc.loadFromDefault();

    k8sApi = kc.makeApiClient(CoreV1Api);
    k8sBatchApi = kc.makeApiClient(BatchV1Api);
}

// This function creates a namespace
async function createNameSpace (nameSpaceID: string): Promise<any> {
    let namespace = {
        metadata: {
            name: nameSpaceID,
        },
    };

    let response = await k8sApi.createNamespace(namespace);
    console.log(response.body)

    return response; 
}

// This function applies a resource quota to an existing namespace
async function applyNSResourceQuota (nameSpaceID: string, CPULimit: number, RAMLimit: number): Promise<any> {
    // let ResourceQuota = {
    //     metadata: {
    //         name: "compute-resources"
    //     },
    //
    //     spec: {
    //         limits: [
    //             {
    //                 max: {
    //                     cpu: "${CPULimit.toString()}m",
    //                     memory: "${RAMLimit.toString()}Mi"
    //                 },
    //                 min: {
    //                     cpu: "0m",
    //                     memory: "0Mi"
    //                 },
    //                 type: "Container"
    //             }
    //         ]
    //     }
    // };

    let response = await k8sApi.createNamespacedResourceQuota(nameSpaceID.toLowerCase(), {
        kind: 'ResourceQuota',
        metadata: {
            name: "compute-resources",
            namespace: nameSpaceID.toLowerCase()
        },

        spec: {
            hard: {
                // 'requests.cpu': `${CPULimit.toString()}m`,
                // 'requests.memory': `${RAMLimit.toString()}Mi`,

                // 'limits.cpu': `${CPULimit.toString()}m`,
                // 'limits.memory': `${RAMLimit.toString()}Mi`,
            }
        }
    })
    console.log(response.body)
    return response;
}


async function getAllPods() {
    return await k8sApi.listPodForAllNamespaces()
}

async function getPodStatus(namespace: string, podName: string) {
    return await k8sApi.readNamespacedPodStatus(podName, namespace)
}

async function ensureNamespace (userId: string) {
    await createNameSpace(userId.toLowerCase()).catch(function (error) {})
}

async function deployModel (nameSpaceID: string, deployment_config: any): Promise<any> {
    await k8sApi.createNamespacedPod(nameSpaceID.toLowerCase(), deployment_config).catch(function (message: any) {
        console.log(message)
        console.log(message.body)
        console.log("Deployment failed")
    });
}

async function deleteModel (nameSpaceID: string, podName: any): Promise<any> {
    const deleteJob = k8sApi.deleteNamespacedPod(podName, nameSpaceID.toLowerCase()).catch(function (message: any) {
        console.log("Pod delete failed")
    })
}

async function startScreenerDeployment (nameSpaceID: string, deployment_config: any): Promise<any> {
    await k8sBatchApi.createNamespacedCronJob(nameSpaceID.toLowerCase(), deployment_config).catch(function (message: any) {
        console.log(message)
        console.log(message.body)
        console.log("Deployment failed")
    });
}

async function deleteJob (nameSpaceID: string, podName: any): Promise<any> {
    await k8sBatchApi.deleteNamespacedCronJob(podName, nameSpaceID.toLowerCase()).catch(function (message: any) {
        console.log("Delete failed")
    })
}


// TODO these functions are asking for a horrible injection attack
function fillScreenerTemplate (containerImageUrl: string,
                               versionId: string,
                               Mb: string,
                               milliCpu: string,
                               projectId: string,
                               modelId: string,
                               userId: string,
                               schedule: string) {
    let signalConfig = JSON.parse(JSON.stringify(signalConfigTemplate))

    signalConfig.spec.schedule = schedule

    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].image = containerImageUrl
    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].name = versionId.toLowerCase()

    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].resources.limits.memory = Mb + "Mi"
    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].resources.limits.cpu = milliCpu + 'm';

    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].resources.requests.memory = Mb + "Mi"
    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].resources.requests.cpu = milliCpu + 'm';

    const token = uuidv4()

    // Add identifiers for the model
    // These are the 4 identifiers that always allow you to locate exactly which model ran
    // The TODO here is to add the user token here to authenticate every request
    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].env.push({
        name: 'PROJECT_ID',
        value: projectId
    });
    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].env.push({
        name: 'MODEL_ID',
        value: modelId
    });
    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].env.push({
        name: 'UID',
        value: userId
    });
    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].env.push({
        name: 'VERSION_ID',
        value: versionId
    });
    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].env.push({
        name: 'TYPE',
        value: 'SCREENER'
    });
    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].env.push({
        name: 'API_KEY',
        value: projectId
    });
    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].env.push({
        name: 'API_PASS',
        value: token
    });
    signalConfig.spec.jobTemplate.spec.template.spec.containers[0].env.push({
        name: "URL_MODEL_EVENTS_API",
        value: process.env.URL_MODEL_EVENTS_API
    })

    signalConfig.metadata.name = createKubeName(versionId)

    return [signalConfig, token]
}

// This function just defines container resource limits and stores it in a json template
function fillDeploymentTemplate (containerImageUrl: string,
                                 versionId: string,
                                 Mb: string,
                                 milliCpu: string,
                                 backtesting: boolean,
                                 projectId: string,
                                 modelId: string,
                                 userId: string,
                                 backtestingArgs: string = undefined,
                                 backtestId: string = undefined): any {
    if (!Number.isInteger(parseInt(Mb, 10))) {
        throw new Error('Mb is not a integer'); 
    }
    if (!Number.isInteger(parseInt(milliCpu, 10))) {
        throw new Error('milliCpu is not a integer'); 
    }

    // make a deep copy of the template
    //                      This isn't super efficient, but it does guarantee a new clone
    let deploymentConfig: V1Pod = JSON.parse(JSON.stringify(deployment_config_template))

    deploymentConfig.spec.containers[0].image = containerImageUrl;
    deploymentConfig.spec.containers[0].name = versionId.toLowerCase();

    deploymentConfig.spec.containers[0].resources.requests.memory = Mb + 'Mi';
    deploymentConfig.spec.containers[0].resources.requests.cpu = milliCpu + 'm';

    deploymentConfig.spec.containers[0].resources.limits.memory = Mb + 'Mi';
    deploymentConfig.spec.containers[0].resources.limits.cpu = milliCpu + 'm';

    // If backtesting is enabled ensure that we enable it in the container & pass along any arguments
    if (backtesting) {
        deploymentConfig.spec.containers[0].env.push({
            name: 'BACKTESTING',
            value: '1'
        })
        deploymentConfig.spec.containers[0].env.push({
            name: 'BACKTESTING_ID',
            value: backtestId
        })

        // This snippet is from nodejs conversion to a secure base64 encoding
        let buf;
        if (Buffer.from && Buffer.from !== Uint8Array.from) {
            buf = Buffer.from(backtestingArgs);
        } else {
            if (typeof backtestingArgs === 'number') {
                throw new Error('The "size" argument must be not of type number.');
            }
            buf = new Buffer(backtestingArgs);
        }

        if (backtestingArgs !== undefined) {
            // Don't parse the json on the server there is no point
            deploymentConfig.spec.containers[0].env.push({
                name: 'BACKTESTING_ARGS',
                value: buf.toString('base64')
            });
        }
    }

    const token = uuidv4()

    // Add identifiers for the model
    // These are the 4 identifiers that always allow you to locate exactly which model ran
    // The TODO here is to add the user token here to authenticate every request
    deploymentConfig.spec.containers[0].env.push({
        name: 'PROJECT_ID',
        value: projectId
    });
    deploymentConfig.spec.containers[0].env.push({
        name: 'MODEL_ID',
        value: modelId
    });
    deploymentConfig.spec.containers[0].env.push({
        name: 'UID',
        value: userId
    });
    deploymentConfig.spec.containers[0].env.push({
        name: 'VERSION_ID',
        value: versionId
    });
    deploymentConfig.spec.containers[0].env.push({
        name: 'API_KEY',
        value: projectId
    });
    deploymentConfig.spec.containers[0].env.push({
        name: 'API_PASS',
        value: token
    });
    deploymentConfig.spec.containers[0].env.push({
        name: 'TYPE',
        value: 'STRATEGY'
    })
    deploymentConfig.spec.containers[0].env.push({
        name: "URL_MODEL_EVENTS_API",
        value: process.env.URL_MODEL_EVENTS_API
    })

    deploymentConfig.metadata.name = createKubeName(versionId)
    return [deploymentConfig, token];
}


function createKubeName(versionId: string) {
    const exactTime = (Date.now() / 1000).toString()

    // This will force the string to have 1 decimal place, allowing a .1 second resolution
    const decimalLocation = exactTime.indexOf('.')
    const roundedTime = exactTime.substring(0, decimalLocation+2)

    return versionId.toLowerCase() + '-' + roundedTime
}

export {
    createNameSpace,
    applyNSResourceQuota,
    deployModel,
    fillDeploymentTemplate,
    ensureNamespace,
    fillScreenerTemplate,
    deleteModel,
    startScreenerDeployment,
    deleteJob,
    initKube,
    getAllPods,
    getPodStatus
};
