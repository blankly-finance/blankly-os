// Node client for blankly
// Copyright (C) Emerson Dove - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Emerson Dove, 2021

const zmq = require('zeromq')
const utils = require('../utils/utils')
// const fs = require('fs')

const Connection = class {
  constructor (callback) {
    this.callbacks = [callback]
    this.init()

    // socket to talk to server
    this.requester = zmq.socket('pair')
    this.requester.bind('tcp://*:5555')
    this.requester.on('message', this.onMessage.bind(this))
  }

  // Get context of the class
  getThis () {
    return this
  }

  init () {
    this.connected = false
    this.send_buffer = []
  }

  addCallback (callable) {
    this.callbacks.push(callable)
  }

  async connect () {
    for (let i = 0; i < 1000; i++) {
      console.log('ping')
      this.requester.send('ping')
      await utils.sleep(10)
      if (this.connected) {
        console.log('Target process found')
        this.runBuffer()
        return
      }
      // this.requester = zmq.socket('pair')
      // this.requester.on('message', this.onMessage.bind(this))
      // this.requester.connect('tcp://localhost:5555')
      await utils.sleep(1900)
    }
  }

  async onMessage (reply) {
    reply = reply.toString()
    // fs.writeFile('./result.json', (reply), function (err, data) {
    //   if (err) {
    //     return console.log(err)
    //   }
    //   console.log(data)
    // })
    if (reply === 'pong') {
      this.connected = true
      this.runBuffer()
    } else if (reply === 'active') {
      console.log('got active')
      this.requester.send('ping')
    } else {
      try {
        reply = JSON.parse(reply)
      } catch (e) {
        console.log('Failure decoding: ' + reply)
        return
      }
      const action = Object.keys(reply)[0]
      console.log('Received new ' + action)
      const command = reply
      for (let i = 0; i < this.callbacks.length; i++) {
        this.callbacks[i](action, command)
      }
    }
  }

  runBuffer () {
    if (this.connected) {
      while (this.send_buffer.length > 0) {
        console.log('sending: ' + this.send_buffer[0])
        this.requester.send(utils.remove(this.send_buffer, 0))
      }
    }
  }

  send (message) {
    this.send_buffer.push(JSON.stringify(message))

    this.runBuffer()
  }
}

module.exports.Connection = Connection
