// Deprecated ZMQ communication code
// Copyright (C) Emerson Dove - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Emerson Dove, 2021

const axios = require('axios')

const modelEventsURL = process.env.URL_MODEL_EVENTS_API // 'http://host.docker.internal' // 'http://localhost' // 'http://host.docker.internal:80' // 'localhost' // 'https://events.blankly.finance' // 'https://model-events-api-67jfnx2vvq-uc.a.run.app'

const External = class {
  constructor (environmentDetails) {
    this.modelId = environmentDetails.modelId
    this.apiKey = environmentDetails.apiKey
    this.apiPass = environmentDetails.apiPass

    // Fundamentally these are the keys that identify the model
    this.headers = {
      model_id: this.modelId,
      api_key: this.apiKey,
      api_pass: this.apiPass
    }
  }

  // Define the functions fundamental to the API interaction
  async request (method, endpoint, data) {
    // Append the endpoint to the current url
    // endpoint = '/bin/17f7de64-3b94-4fd8-aa84-be6e8cb72e74/'
    const url = new URL(endpoint, modelEventsURL).toString()

    console.log('Posting this data:')
    console.log(data)
    console.log('with these headers:')
    console.log(this.headers)
    console.log('at this url:')
    console.log(url)

    // Update the time
    this.headers.time = ((new Date().getTime()) / 1000).toString()

    axios({
      method: method,
      url: url,
      headers: this.headers,
      data: data
    }).then(function (response) { return response }).catch(function (response) {
      if (response.response !== undefined) {
        console.log('Failed on route ' + url + ' for reason: ' + JSON.stringify(response.response.data))
      } else {
        console.log('Failed on route for reason ' + response)
      }
    })
  }

  async get (endpoint) {
    return await this.request('get', endpoint, undefined)
  }

  async post (endpoint, data) {
    return await this.request('post', endpoint, data)
  }

  async del (endpoint, data) {
    return await this.request('delete', endpoint, data)
  }
}

module.exports.External = External
