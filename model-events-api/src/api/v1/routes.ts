import { Router } from 'express'

import liveRouter from './routes/live'
import modelRouter from './routes/model'
import backtestRouter from './routes/backtest'
import { createHash } from "crypto"
import { getDoc } from "../../utility/firebase"


const v1 = Router()

const validTokens: any = {}
const invalidTokens: any = {}


async function validateToken(apiKey: string, apiPass: string) {
  async function writeTokenCache(cache: any, apiKey: string, apiPass: string, contents: string) {
    if (!cache.hasOwnProperty(apiKey)) {
      cache[apiKey] = {}
    }
    cache[apiKey][apiPass] = contents
  }

  try {
    // The cache is valid if this occurs
    const key = validTokens[apiKey][apiPass]
    return [true, key.projectId]
  } catch (e) {
    if (e instanceof TypeError) {
      // If it's not in valid tokens it could have been an invalid token
      try {
        if (invalidTokens[apiKey][apiPass] === 'invalid') {
          return [false, ""]
        }
      } catch (e) {
        if (e instanceof TypeError) { /* This just means it wasn't found */ } else {
          throw e
        }
      }
      // If it fails it could still be valid
      const authRoute = `apiKeys/${apiKey}`
      const firebaseTokens = (await getDoc(authRoute)).tokens

      if (firebaseTokens != undefined && firebaseTokens.hasOwnProperty(apiPass) && firebaseTokens[apiPass].write) {
        // This is the case where it is still valid
        // Just add in some keys to make it work
        await writeTokenCache(validTokens, apiKey, apiPass, firebaseTokens[apiPass])
        return [true, firebaseTokens[apiPass].projectId]
      } else {
        // Wasn't in the firebase call, so we should just cache this in the invalid tokens
        // We know instantly and forever that this isn't right
        await writeTokenCache(invalidTokens, apiKey, apiPass, 'invalid')
        return [false, ""]
      }
    } else {
      throw e
    }
  }
}

function convertTime(time: string) {
  let epochAttempt = Number(time)
  // Hope nobody is fixing this on Friday, June 11, 2128 at 8:53:20 AM (GMT)
  if (!isNaN(epochAttempt)) {
    while (epochAttempt > 5000000000) {
      epochAttempt = epochAttempt / 10
    }
    // Created the epoch in seconds so now return
    return epochAttempt
  } else {
    // Must be a string assume something that Date.parse() can handle
    return Date.parse(time) / 1000
  }
}

function authwares() {
  v1.use(async function (req, res, next) {
    res.locals.blankly = {}
    const headers = req.headers

    let modelId: string
    let apiKey: string
    let apiPass: string

    modelId = headers.model_id as string
    apiKey = headers.api_key as string
    apiPass = headers.api_pass as string

    if (modelId == undefined || apiKey == undefined || apiPass == undefined) {
      return res.status(401).send( {
        error: "Missing a required header"
      })
    }

    // These are the blankly headers
    res.locals.blankly.modelId = modelId
    res.locals.blankly.apiKey = apiKey
    res.locals.blankly.apiPass = apiPass

    if (req.headers.time == undefined) {
      // Always put time in the locals, do this before any firebase calls because those take a meaningful amount of
      //  time
      res.locals.blankly.time = (new Date().getTime() / 1000)
    } else {
      res.locals.blankly.time = convertTime(req.headers.time as string);
    }

    // Hash the passed token to validate
    apiPass = createHash('sha256').update(apiPass).digest('hex')

    // This returns if it was successful and the project id as an array: [true, 'biu3oinwcw']
    const validation = await validateToken(apiKey, apiPass)
    if (validation[0]) {
      // We have it, and we have it cached so just continue
      res.locals.blankly.projectId = validation[1]
      // TODO this is the override for the project id
      //  this will set it to be the user id
      res.locals.blankly.projectId = apiKey
      // This should be the user ID:
      next()
      return
    } else {
      return res.status(401).send({
        error: 'Not Authenticated'
      })
    }
  })
}

// Make sure to register the auth first
authwares()
v1.use('/live', liveRouter)
v1.use('/model', modelRouter)
v1.use('/backtest', backtestRouter)

export {
  v1
}