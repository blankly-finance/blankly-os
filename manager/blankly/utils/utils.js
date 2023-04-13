// Utils functions definition used broadly in this script
// Copyright (C) Emerson Dove - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Emerson Dove, 2021

function remove (array, index) {
  return array.splice(index, 1)[0]
}

function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function parseCommand (message) {
  const response = message.toString().split('\x0f')
  const action = remove(response, 0)
  const command = {}
  let previousKey = null

  // Parse command into a dictionary
  command[action] = {}
  for (let i = 0; i < response.length; i++) {
    if (i % 2 === 0) {
      command[action][response[i]] = null
      previousKey = response[i]
    } else {
      command[action][previousKey] = response[i]
    }
  }
  return command
}

function parseType (stringType) {
  switch (stringType) {
    case "<class 'int'>":
      return 'int'
    case "<class 'float'>":
      return 'float'
    default:
      return 'unknown'
  }
}

function pad (existing, payload) {
  /*
  Pad a string for use in messaging

  Turns: "" and a payload of "update_live_var" into update_live_var\x0
   */
  return existing.concat(String(payload), '\x0f')
}

function formatMessage (command) {
  /*
  Format a message for sending. This takes a javascript Object and returns a string ready for sending:

  Input:
  'update_live_var': {
    'value': 10
  }

  Output:
  update_live_var\x0fvalue\x0f10
   */
  const mainCommand = Object.keys(command)[0]

  const internalKeys = Object.keys(command[mainCommand])

  let output = pad('', mainCommand)

  for (let i = 0; i < internalKeys.length; i++) {
    if (internalKeys[i] !== null) {
      output = pad(output, internalKeys[i])
      output = pad(output, command[mainCommand][internalKeys[i]])
    }
  }

  // Remove last letter in the string
  return output.slice(0, -1)
}

module.exports.remove = remove
module.exports.parseType = parseType
module.exports.formatMessage = formatMessage
module.exports.parseCommand = parseCommand
module.exports.sleep = sleep
