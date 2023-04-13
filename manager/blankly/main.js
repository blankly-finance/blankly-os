// Main process to organize connection & REST API creation
// Copyright (C) Emerson Dove - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Emerson Dove, 2021

const server = require('./api/server.js')
const controller = require('./api/controllers/controller')
const yargs = require('yargs')
const process = require('process')
const external = require('./communication/external')

// Environment setup
const environmentDetails = {
  uid: process.env.UID,
  projectId: process.env.PROJECT_ID,
  modelId: process.env.MODEL_ID,
  apiKey: process.env.API_KEY,
  apiPass: process.env.API_PASS,
  type: process.env.TYPE
}

// Create a definition for the backtesting object
const backtestDetails = {
  backtesting: false,
  backtestingArgs: {},
  backtestingId: null
}

// Parse the backtesting argument input
if (process.env.BACKTESTING === '1') {
  backtestDetails.backtesting = true
  backtestDetails.backtestingId = process.env.BACKTESTING_ID
  if (process.env.BACKTESTING_ARGS !== undefined) {
    const args = Buffer.from(process.env.BACKTESTING_ARGS, 'base64').toString('utf-8')
    backtestDetails.backtestingArgs = JSON.parse(args)
  } else {
    backtestDetails.backtestingArgs = {}
  }
}

const External = new external.External(environmentDetails, backtestDetails)
const ProcessController = new controller.Controller(External, backtestDetails)
ProcessController.updateModelStatus({
  message: 'Started',
  start_at: Date.now() / 1000,
  running: true
})
const Server = new server.Server(ProcessController)

// Parse the arguments on initialization
const argv = yargs
  .command('start', 'Whether or not to immediately start python process or not', (yargs) => {
    yargs.positional('start', {
      type: 'boolean',
      default: true,
      describe: 'Whether to start process immediately'
    })
  }).command('python-local', 'Specify to avoid attempting a child process spawn and instead skip directly to zmq connection', (yargs) => {
    yargs.positional('pythonLocal', {
      type: 'boolean',
      default: false,
      describe: 'Whether to start the child process or instead skip straight to zmq connection'
    })
  }).argv

// Main function
const main = async function () {
  // If python local is specified then tell the controller to not run python
  if (argv.pythonLocal) {
    ProcessController.runPython = false
  }

  await Server.startServer()

  if (argv.start) {
    await ProcessController.startBlankly(null, { json: function () {} })
  }
}

// Entrypoint
main().then(r => function () {
  console.log(r)
  console.log('Finished.')
})

// Optional logging functions
const responseLog = function (action, command) {
  console.log(action)
  console.log(command)
}

const stdoutLog = function (event) {
  console.log(event)
}

const errorLog = function (event) {
  console.log(event)
}
