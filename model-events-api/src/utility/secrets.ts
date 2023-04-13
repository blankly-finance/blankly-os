import {SecretManagerServiceClient} from "@google-cloud/secret-manager";

async function getKey(client: SecretManagerServiceClient, projectId: string, keyName: string, version: string = '1') {
    const [response] = await client.accessSecretVersion({
        name: `projects/${projectId}/secrets/${keyName}/versions/${version}`,
    });
    return response.payload.data.toString();
}

export default getKey
