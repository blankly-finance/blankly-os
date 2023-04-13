import { Response } from "express"
import {addDoc, setDoc} from "../../utility/firebase";

let writeFirebase = async function(blanklyLocals: any, specificRoute: string, data: object, action: string, res: Response = undefined) {
    /*
    Args:
        blanklyLocals: The locals object nested inside res.locals
        specificRoute: The route within /model that route is sent to
        data: The data to write to that route
        action: Should the data be "set" or "add"
     */
    let base = `projects/${blanklyLocals.projectId}/models/${blanklyLocals.modelId}`


    base = base.concat(specificRoute)

    if (action == 'set') {
        await setDoc(base, data)
    } else if (action == 'add') {
        await addDoc(base, data)
    } else {
        console.log(`ERROR: Invalid action for route ${base}`)
        return
    }

    if (res != undefined) {
        return res.status(200).send()
    }
}

let checkArgs = function (json: Object, args: (string | string[])[], res: Response) {
    for (let i = 0; i< args.length; i++) {
        if (typeof args[i] == "string") {
            // @ts-ignore
            if (!(args[i] in json)) {
                res.status(400).json({error: `Missing required body key: ${args[i]}`})
                return false
            }
        } else if (args[i] instanceof Array) {
            let key_found: string = undefined
            // Search through this inner array
            for (let j = 0; j < args[i].length; j++) {
                if (args[i][j] in json) {
                    // found in subarray
                    if (key_found == undefined) {
                        // Assign it here
                        key_found = args[i][j]
                    } else {
                        // Now if it wasn't undefined that means there were two of them
                        res.status(400).json({error: `Key '${args[i][j]}' conflicts with the key '${key_found}' - only one can be sent.`})
                        // goofed
                        return false
                    }
                }
            }
            // If it's undefined at this level we didn't find any
            if (key_found == undefined) {
                res.status(400).json({error: `Must have one of these keys: ${args[i]}`})
                return false
            }
        }
    }
    return true
}

let internalError = function(error: string) {
    // TODO upgrade this reporting
    console.log(error)
}

export {
    writeFirebase,
    checkArgs,
    internalError
}
