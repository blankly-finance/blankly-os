// Controller functions - this file contains functions oriented towards large scale control of the subprocess
// Copyright (C) Emerson Dove - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Emerson Dove, 2021

'use strict'

const child = require('../../communication/child')
const { sleep } = require('../../utils/utils')
const utils = require('../../utils/utils')
const ConnectionObject = require('../../communication/zmq').Connection

const livevars = {}

const Controller = class {
  constructor (external, backtestingDetails) {
    this.backtesting = backtestingDetails.backtesting
    this.backtestingArgs = backtestingDetails.backtestingArgs
    this.backtestingId = backtestingDetails.backtestingId

    this.pyProc = new child.ChildManager(this.backtesting, this.backtestingId)
    this.connection = null
    this.runPython = true
    this.external = external
  }

  getLiveVars () {
    return livevars
  }

  async stdOutPoster (message) {
    console.log('STDOUT > ' + message)
    if (this.backtestingId === null) {
      await this.external.post('/v1/live/log', { line: message, type: 'stdout' })
    } else {
      await this.external.post('/v1/backtest/log', { line: message, type: 'stdout', backtest_id: this.backtestingId })
    }
  }

  async errorPoster (message) {
    console.log('STDERR > ' + message)
    if (this.backtestingId === null) {
      await this.external.post('/v1/live/log', { line: message, type: 'stderr' })
    } else {
      await this.external.post('/v1/backtest/log', { line: message, type: 'stderr', backtest_id: this.backtestingId })
    }
  }

  async installAndRun () {
    if (this.runPython) {
      this.pyProc.addErrListener(this.errorPoster.bind(this))
      this.pyProc.addStdoutListener(this.stdOutPoster.bind(this))

      this.updateModelStatus({
        message: 'Installing Dependencies'
      })
      this.pyProc.installAndRun()
    } else {
      console.log('Skipping python start')
    }
    // Connect to the model
    this.connection.init()
    await this.connection.connect()
    console.log('node connected')
    this.updateModelStatus({
      message: 'Monitoring Active'
    })

    // This is where the backtest message is sent
    console.log(this.backtestingArgs)

    console.log(this.backtesting)
    if (this.backtesting) {
      console.log('sending backtest command')
      await sleep(1000)
      console.log('now sending')
      this.connection.send({
        backtest: {
          kwargs: this.backtestingArgs
        }
      })
    }

    return true
  }

  async startBlankly (req, res) {
    // Start the python process if it isn't alive
    if (!this.pyProc.isAlive()) {
      try {
        // Register the message callback with the connection object here
        // We do this immediately to avoid any race conditions & require it so that no messages are skipped
        this.connection = new ConnectionObject(this.connectionMessage.bind(this))

        // This is the callback that controls what this process does after the child finishes
        // These two lines will simply just reset ZMQ to keep listening
        // const connectionContext = this.connection.getThis()
        // this.pyProc.addExitListener(this.connection.init.bind(connectionContext))
        // This will just close the entire process
        this.pyProc.addExitListener(async function () {
          // Wait a second and then close the process
          this.updateModelStatus({
            message: 'Process Exited',
            end_at: Date.now() / 1000,
            running: false
          })
          await sleep(1000)
          console.log('child process ended - exiting')
          process.exit(0)
        }.bind(this))

        await this.installAndRun()
      } catch (e) {
        console.log(e)
        res.json({ status: 'failure', message: e.toString() })
      }
    } else {
      res.json({ message: 'Child process already running. Use stop endpoint.' })
    }
  }

  async stopBlankly (req, res) {
    if (this.pyProc.isAlive() === false) {
      res.json({ message: 'Process has not been started. Use start endpoint.' })
    } else {
      // This response will be sent immediately on exit
      const callback = res.json.bind(res)
      this.pyProc.addExitListener(callback, { message: 'Stopped' })
      this.pyProc.exitChildProc().then()
    }
  }

  root (req, res) {
    res.json({ message: 'Blankly internal API.' })
  }

  poke (req, res) {
    (async function () {
      await utils.sleep(3000)
      this.connection.send('ping')
    }).then(
      res.json({ message: 'Poked' })
    )
  }

  formatLiveVars () {
    const output = []

    const liveVars = this.getLiveVars()

    const keys = Object.keys(liveVars)

    for (let i = 0; i < keys.length; i++) {
      const internalDict = liveVars[keys[i]]
      internalDict.id = keys[i]
      output.push(internalDict)
    }

    return output
  }

  listLiveVars (req, res) {
    res.json(this.formatLiveVars())
  }

  manageLiveVars (req, res) {
    // req.query = { new_value: '3' }
    // req.params = { live_var_id: '123123' }
    const query = req.query
    const id = req.params.live_var_id
    const liveVars = this.getLiveVars()

    if (id in liveVars) {
      if ('new_value' in query) {
        this.exportLiveVar(id, query.new_value)
        // It's annoying that this response isn't updated instantly
        // That's because the python process responds independently of anything here
        res.json(this.formatLiveVars())
      } else {
        res.json(liveVars[id])
      }
    } else {
      res.json({ message: 'Live var ID not found.' })
    }
  }

  // Send an updated live var back to the module. This should be acknowledged by a re-export from the python proc
  exportLiveVar (id, newValue) {
    const outputCommand = {
      update_live_var: {
        id: id,
        value: newValue
      }
    }
    this.connection.send(outputCommand)
  }

  backtest (req, res) {
    const urlQuery = req.query
    const params = req.params

    if (params.strategyId === undefined) {
      res.json({ message: 'Must specify a strategy id.' })
    } else {
      // Directly forward the backtest parameters
      this.connection.send({ backtest: { urlQuery } })
      res.json({ message: 'Backtest request sent.' })
    }
  }

  updateModelStatus (statusUpdate) {
    if (!this.backtesting) {
      this.external.post('/v1/model/lifecycle', statusUpdate)
    }
  }

  connectionMessage (action, command) {
    const internals = command[action]
    switch (action) {
      case 'live_var':
        console.log('Skipping export for live var...')
        //   const id = commandObject.live_var.id
        //   const internals = commandObject.live_var
        //   delete internals.id
        //
        //   internals.type = utils.parseType(internals.type)
        //
        //   const keys = Object.keys(liveVars)
        //   for (let i = 0; i < keys.length; i++) {
        //     if (id === keys[i]) {
        //       liveVars[keys[i]].value = internals.value
        //       return
        //     }
        //   }
        //
        //   liveVars[id] = internals
        //
        //   this.external.post('/live-var', { id: id, details: internals }).catch(function () { console.log('live var post failed') })
        break
      case 'backtest_status':
        internals.backtest_id = this.backtestingId
        this.external.post('/v1/backtest/status', internals).catch(function () { console.log('Backtest status post failed') })
        break
      case 'market_order': {
        this.external.post('/v1/live/spot-market', internals).catch(function () { console.log('Market spot post failed') })
        break
      }
      case 'limit_order': {
        this.external.post('/v1/live/spot-limit', internals).catch(function () { console.log('Limit order spot post failed') })
        break
      }
      case 'update_order': {
        this.external.post('/v1/live/update-trade', internals).catch(function () { console.log('Update order spot post failed') })
        break
      }
      case 'update_annotation':
        this.external.post('/v1/live/update-annotation', internals).catch(function () { console.log('Update order spot post failed') })
        break
      case 'screener_result':
        this.external.post('/v1/live/screener-result', internals).catch(function () { console.log('Screener result failed') })
        break
      case 'backtest_result': {
        internals.backtest_id = this.backtestingId
        this.external.post('/v1/backtest/result', internals).catch(function () { console.log('Backtest result post failed') })
        break
      }
      case 'used_exchange':
        this.external.post('/v1/model/used-exchange', internals).catch(function () { console.log('Add exchange post failed') })
        break
      case 'used_symbol':
        this.external.post('/v1/model/used-symbol', internals).catch(function () { console.log('Adding new used exchange failed') })
        break
      case 'email':
        console.log('TODO') // TODO
        break
      case 'text':
        console.log('TODO') // TODO
        break
      case 'internal_error': // TODO hook this up
        console.log('TODO') // TODO
        // Older but valid implementation: check database format or sentry
        // const details = internals.error_details
        // this.external.post('/internal-error', {
        //   error_details: details
        // })
        break
    }
  }
}

module.exports.Controller = Controller
