import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
const execute = promisify(execFile);

async function buildDocker (filePath: string, fileName: string, projectId: string, modelId: string, versionId: string, pythonVersion: string): Promise<any> {
    let scriptPath = path.resolve('src/scripts/build_image.sh')

    // Ensure that the script is executable
    fs.chmodSync(scriptPath, 511)

    let dockerFilePath = path.resolve('src/scripts/Dockerfile')

    let baseImage = `us-docker.pkg.dev/${process.env.PROJECT_ID}/blankly-base/blankly-base:` + pythonVersion
    // Run the sh build
    return execute(scriptPath,
        [
            filePath, // arg 1
            projectId.toLowerCase(), // arg 2
            modelId.toLowerCase(), // arg 3
            versionId.toLowerCase(),  // 4
            dockerFilePath, // arg 5
            process.env.GOOGLE_APPLICATION_CREDENTIALS, // arg 6
            baseImage, // arg 7
            process.env.PROJECT_ID // arg 8
        ]
    )
}


export { 
    execute,
    buildDocker
}
