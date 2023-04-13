// Async REST server starting script
// Copyright (C) Emerson Dove - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Emerson Dove, 2021

const express = require('express')
const bodyParser = require('body-parser')
const { promisify } = require('util')

const routes = require('./routes/routes').routes // importing route

const app = express()
app.use(bodyParser.json())

const Server = class {
  constructor (controller) {
    routes(app, controller)
  }

  async startServer () {
    const port = process.env.SERVER_PORT || 8000
    await promisify(app.listen).bind(app)(port)
    console.log(`Listening on port ${port}`)
  }
}

module.exports.Server = Server
