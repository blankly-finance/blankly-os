// Child process event management
// Copyright (C) Emerson Dove - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Emerson Dove, 2021

const spawn = require('child_process').spawn

const utils = require('../utils/utils')
const path = require('path')

const deployScript = 'blankly.json'

const ChildManager = class {
  constructor (backtesting, backtestingId) {
    this.child = undefined

    // Allow callbacks to exist continuously or only fire once
    // Single fires may be useful for async callbacks to rest endpoints
    this.stdOutCallbacks = []
    this.errCallbacks = []

    this.exitCallbacks = {
      persistent: [],
      single: []
    }

    this.locations = {}
    this.settingsCache = undefined

    // If the model is stopped before the dependencies finish install this is used
    this.killed = false

    this.backtesting = backtesting
    this.backtestingId = backtestingId
  }

  evaluateLocations () {
    // const rootDir = path.join(process.cwd(), '..', 'blankly')
    const rootDir = path.join('/', 'blankly', 'model')

    // const commandDir = path.join(rootDir, 'venv', 'bin')
    const commandDir = path.join('')

    // const deployFolder = path.join(rootDir, 'examples', 'init_demo')
    const deployFolder = path.join(rootDir) //, 'examples', 'init_demo')

    if (this.settingsCache === undefined) {
      try {
        this.settingsCache = require(path.join(deployFolder, deployScript))
      } catch (err) {
        console.log('Failed to read deployment settings')
        return false
        // throw new Error('Error reading deployment settings.') // new exceptions.FileNotFoundError('Error reading deployment settings.')
      }
    }

    this.locations.scriptExecutable = path.join(deployFolder, this.settingsCache.main_script)
    this.locations.rootDir = rootDir
    this.locations.deployFolder = deployFolder
    this.locations.commandDir = commandDir
    this.locations.workingDirectory = this.settingsCache.working_directory

    // This either succeeds or fails with an error
    return true
  }

  installAndRun () {
    // Make sure to remove any outstanding callbacks
    this.killed = false
    if (!this.evaluateLocations()) {
      return
    }

    // This is the location of pip inside the docker container
    this.child = spawn('/usr/local/bin/pip',
      ['install', '-r', this.settingsCache.requirements],
      {
        cwd: path.join(this.locations.deployFolder),
        env: {
          PYTHONUNBUFFERED: 1,
          PYTHONPATH: this.locations.rootDir
        }
      }
    )

    // Create a next object to be used inside the exit callback
    this.child.stdout.setEncoding('utf8')
    this.child.stdout.on('data', this.stdoutEvent.bind(this))
    this.child.stderr.setEncoding('utf8')
    this.child.stderr.on('data', this.errEvent.bind(this))
    // After this exits run the actual child script
    this.child.on('exit', this.startBlanklyChild.bind(this))
  }

  startBlanklyChild () {
    console.log('starting child')
    // Avoid starts if it was quit during the dependency install
    if (this.killed) { return }

    const env = {
      PYTHONUNBUFFERED: 1,
      PYTHONPATH: this.locations.rootDir
    }

    // Inject the backtesting ENV args here
    if (this.backtesting === true) {
      env.BACKTESTING = '1'
      env.BACKTESTING_ID = this.backtestingId
    }

    this.evaluateLocations()
    const child = spawn('/usr/local/bin/python',
      [this.locations.scriptExecutable],
      {
        cwd: path.join(this.locations.deployFolder, this.locations.workingDirectory),
        env: env
      })

    // Assign pid to the class
    child.stdout.setEncoding('utf8')
    child.stdout.on('data', this.stdoutEvent.bind(this))
    child.stderr.setEncoding('utf8')
    child.stderr.on('data', this.errEvent.bind(this))

    // Exit event only fires when the actual process is done
    child.on('exit', this.exitEvent.bind(this))
    this.child = child
  }

  async exitChildProc () {
    // Set this to true to avoid any more processes from spawning
    this.killed = true

    this.child.kill('SIGINT')
    // Give two seconds for initial cleanup
    await utils.sleep(2000)
    if (this.isAlive()) {
      // If it's not closed it gets another 2 seconds before its killed
      await utils.sleep(2000)
      this.child.kill('SIGKILL')
    }
    // Remember that watching this is the exit event which will spawn any watching callbacks
  }

  addStdoutListener (callback) {
    this.stdOutCallbacks.push(callback)
  }

  addErrListener (callback) {
    this.errCallbacks.push(callback)
  }

  /*
  This is a bit different, but it does allow a callback and an argument to be specified for the process stop
   */
  addExitListener (callback, callbackArg = undefined, persistent = false) {
    if (persistent) {
      this.exitCallbacks.persistent.push({
        callback: callback,
        arg: callbackArg
      })
    } else {
      this.exitCallbacks.single.push({
        callback: callback,
        arg: callbackArg
      })
    }
  }

  // This function can forward any print statement that occurs in the child to any attached callbacks
  stdoutEvent (data) {
    for (let i = 0; i < this.stdOutCallbacks.length; i++) {
      this.stdOutCallbacks[i](data)
    }
  }

  // This function can forward any error that occurs in the child to any attached callbacks
  errEvent (data) {
    for (let i = 0; i < this.errCallbacks.length; i++) {
      this.errCallbacks[i](data)
    }
  }

  exitEvent () {
    // Immediate undefined the child so that the state appears exited
    this.child = undefined

    // For persistent callbacks
    this.exitCallbacks.persistent.forEach(function (element) {
      if (element.arg === undefined) {
        element.callback()
      } else {
        element.callback(element.arg)
      }
    })
    // For callbacks that only run once
    this.exitCallbacks.single.forEach(function (element) {
      if (element.arg === undefined) {
        element.callback()
      } else {
        element.callback(element.arg)
      }
    })

    // Remove remaining callbacks
    this.exitCallbacks.single = []

    this.stdOutCallbacks = []
    this.errCallbacks = []
    this.exitCallbacks.persistent = []
    this.exitCallbacks.single = []
  }

  isAlive () {
    // If it's not yet assigned it fails
    return this.child !== undefined
  }
}

module.exports.ChildManager = ChildManager
