// Deprecated ZMQ communication code
// Copyright (C) Emerson Dove - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Emerson Dove, 2021

const path = require('path')

// Call the venv in the python folder
const createPyProc = () => {
  const port = '' + selectPort()
  const script = path.join(process.cwd(), '..', 'Blankly', 'Blankly', 'server.py')
  console.log(script)
  console.log(path.join(process.cwd(), '..', 'Blankly', 'venv', 'bin', 'python'))
  pyProc = require('child_process').spawn(path.join(process.cwd(), '..', 'Blankly', 'venv', 'bin', 'python'), [script, port])
  if (pyProc != null) {
    console.log('child process success')
  }
}

const exitPyProc = () => {
  pyProc.kill()
  pyProc = null
  pyPort = null
}

app.on('ready', createPyProc)
app.on('will-quit', exitPyProc)

// Create a sporadically usable top bar mover
const windowTopBar = document.createElement('div')
windowTopBar.style.width = '120px'
windowTopBar.style.height = '32px'
windowTopBar.style.backgroundColor = '#000'
windowTopBar.style.opacity = '0'
windowTopBar.style.position = 'absolute'
windowTopBar.style.top = windowTopBar.style.left = 0
windowTopBar.style.webkitAppRegion = 'drag'
windowTopBar.style.zIndex = '10'
document.body.appendChild(windowTopBar)

// Define keys necessary for each exchange
function exchange (exchange_object) {
  this.exchange = exchange_object
}

function coinbase_pro (portfolio_name, given_name, API_KEY, API_SECRET, API_PASS) {
  this.exchange = 'coinbase_pro'
  this.parsed_name = portfolio_name
  this.given_name = given_name
  this.API_KEY = API_KEY
  this.API_SECRET = API_SECRET
  this.API_PASS = API_PASS
}

// Connect to the server
const zerorpc = require('zerorpc')
// Client options configuration
const constLargeEnoughHeartbeat = 60 * 60 * 24 * 30 * 12 // 1 Year
clientOptions = {
  heartbeatInterval: constLargeEnoughHeartbeat
}
const client = new zerorpc.Client(clientOptions)
client.connect('tcp://127.0.0.1:4242')

// Parse the profile file
const Keys = require('./Keys.json')
const Settings = require('./Settings.json')
exchanges = []

client.invoke('init', (error, res) => {
  if (error) {
    console.error(error)
  } else {
    // console.log(res)
  }
})

if (Keys.exchanges.hasOwnProperty('coinbase_pro')) {
  coinbase_pro_profiles = Object.keys(Keys.exchanges.coinbase_pro)
  for (i = 0; i < coinbase_pro_profiles.length; i++) {
    API_KEY = Keys.exchanges.coinbase_pro[coinbase_pro_profiles[i]].API_KEY
    API_SECRET = Keys.exchanges.coinbase_pro[coinbase_pro_profiles[i]].API_SECRET
    API_PASS = Keys.exchanges.coinbase_pro[coinbase_pro_profiles[i]].API_PASS

    auth = [API_KEY, API_SECRET, API_PASS]
    // Make sure to replace spaces with underscores
    parsed_name = replaceAll(coinbase_pro_profiles[i], ' ', '_')
    actual_name = coinbase_pro_profiles[i]
    // Push the coinbase pro exchange into the exchanges array. Run it through the exchange object to generalize it
    exchanges.push(new exchange(new coinbase_pro(parsed_name, actual_name, API_KEY, API_SECRET, API_PASS)))
    client.invoke('add_exchange', parsed_name, 'coinbase_pro', auth, (error, res) => {
      if (error) {
        console.error(error)
      } else {
        // console.log(res)
      }
    })
  }
}

// TODO this could be improved on
let loopingExchangeUpdates = false

async function loop_account_update (exchanges) {
  loopingExchangeUpdates = true
  for (i = 0; i < exchanges.length; i++) {
    active_element = exchanges[i][0]
    given_name = exchanges[i][1].exchange.given_name
    // console.log("run: " + i)
    client.invoke('get_exchange_state', active_element.id, (error, res) => {
      if (error) {
        console.error(error)
      } else {
        updateState(document.getElementById(res[1]), res[0])
      }
    })
    element = document.getElementById(active_element.id)
    element.childNodes[1].innerHTML = given_name
  }
  setTimeout(function () {
    loop_account_update(exchanges)
  }, Settings.settings.account_update_time)
}

const portfolio_button = document.querySelector('#portfolio-page-button')
portfolio_button.addEventListener('click', () => {
  exchangeBlocks = []
  if (!loopingExchangeUpdates) {
    // First run code
    portfolio_block = document.getElementById('portfolio-block')
    portfolio_block.style.display = 'none'
    for (i = 0; i < exchanges.length; i++) {
      // Use cloned_node as a boilerplate
      exchange_block = portfolio_block.cloneNode(true)
      exchange_block.style.display = 'block'
      exchange_block.id = exchanges[i].exchange.parsed_name
      // Exchanges wraps in an exchange block, which in turn gets the name
      // Put it in first
      portfolio_block.parentNode.prepend(exchange_block)
      exchangeBlocks.push([exchange_block, exchanges[i]])

      // Add the listener for the user entering the exchange
      const given_name = exchanges[i].exchange.given_name
      // When the block is clicked we need to add the listener to append the relevant currencies
      exchange_block.addEventListener('click', (event) => {
        navigateToPortfolio()

        // Jesus christ okay so lets try to figure this out
        // Run this if its not already looping
        if (!loopingPortfolioUpdates) {
          // Get the state to find the default
          client.invoke('get_portfolio_state', exchange_block.id, (error, res) => {
            if (error) {
              console.error(error)
            } else {
              // Get the defaults
              const page = document.getElementById('portfolio-overview-page')
              const grid = page.childNodes[3].childNodes[1]
              // Set title
              page.childNodes[1].childNodes[1].innerHTML = given_name
              // Populate the page
              const keys = Object.keys(res[0])
              for (let j = 0; j < keys.length; j++) {
                // Only create exchanges if this is the first run
                currency_block = defaultCurrencyBlock.cloneNode(true)
                currency_block.style.display = 'block'
                currency_block.id = 'currency-' + keys[j]
                grid.prepend(currency_block)
                // Set block title
                currency_block.childNodes[1].innerHTML = keys[j]
                // The sad thing another listener has to go right here
              }
              // updateState(document.getElementById(res[1]), res[0])
            }
          })
          loopPortfolioUpdate(exchange_block.id, given_name)
        }
      })

      // TODO - make this not specific to COMP
      const models_object = Keys.exchanges.coinbase_pro[given_name].attached_models
      const model_keys = Object.keys(models_object)
      for (let h = 0; h < model_keys.length; h++) {
        client.invoke('assign_model', exchange_block.id, models_object[model_keys[h]], model_keys[h], (error, res) => {
          if (error) {
            console.error(error)
          } else {
            console.log('Starting: ' + models_object[model_keys[h]] + ' on ' + model_keys[h])
            // console.log(res)
          }
        })
      }
      client.invoke('run_model', exchange_block.id, (error, res) => {
        if (error) {
          console.error(error)
        } else {
          // console.log(res)
        }
      })
    }
    loop_account_update(exchangeBlocks)
  }
})
// Boilerplate list objects for the updateState function below
nameObject = document.getElementById('portfolio-block').childNodes[3].childNodes[1].childNodes[1]
valueObject = document.getElementById('portfolio-block').childNodes[3].childNodes[3].childNodes[1]
valueObject.style.display = 'none'
nameObject.style.display = 'none'

function updateState (active_exchange, state) {
  states = Object.keys(state)
  leftParent = active_exchange.childNodes[3].childNodes[1]
  rightParent = active_exchange.childNodes[3].childNodes[3]

  childLeft = []
  childRight = []
  for (i = 0; i < states.length; i++) {
    newName = nameObject.cloneNode(true)
    newName.style.display = 'block'
    newName.innerHTML = states[i]

    newValue = valueObject.cloneNode(true)
    newValue.style.display = 'block'
    newValue.innerHTML = state[states[i]]

    childLeft.push(newName)
    childRight.push(newValue)
    // console.log(states[i] + ": " + state[states[i]])
  }
  // Have to remove the elements before adding them back
  while (leftParent.firstChild) {
    leftParent.removeChild(leftParent.lastChild)
  }
  while (rightParent.firstChild) {
    rightParent.removeChild(rightParent.lastChild)
  }
  for (i = 0; i < childLeft.length; i++) {
    leftParent.appendChild(childLeft[i])
    rightParent.appendChild(childRight[i])
  }
}

function replaceAll (str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace)
}

let log_counter = 0

// Log function to append to the blocks
function log (input) {
  const parent = document.getElementById('textLog')
  const child = document.createElement('div')
  child.className = 'logblock'
  child.id = 'text' + log_counter

  const insertText = document.createElement('p')
  insertText.className = 'logText'
  insertText.innerText = input
  child.style = 'transform: translateY(0px); opacity: 0;'
  child.appendChild(insertText)
  parent.prepend(child)
  log_counter++

  const height = child.clientHeight
  let currentTransform
  const children = parent.children
  for (i = 1; i < children.length; i++) {
    currentTransform = children[i].getAttribute('style')
    currentTransform = currentTransform.substring(currentTransform.indexOf('(') + 1, currentTransform.indexOf(')'))
    const trans = parseInt(currentTransform, 10) + parseInt(height, 10)
    children[i].setAttribute('style', 'transform: translateY(' + trans + 'px)')
  }
  setTimeout(makeElementVisible, 100, child)
}

// Example Python Test Code
// portfolio_button.dispatchEvent(new Event('input'))

// Default calculator process

// formula.addEventListener('input', () => {
//     client.invoke("calc", formula.value, (error, res) => {
//         console.log("active")
//         if(error) {
//             console.error(error)
//         } else {
//             result.textContent = res
//         }
//     })
// })

var loopingPortfolioUpdates = false
const defaultCurrencyBlock = document.getElementById('currency-block').cloneNode(true)
document.getElementById('currency-block').style.display = 'none'

function loopPortfolioUpdate (id, givenName) {
  loopingPortfolioUpdates = true
  const page = document.getElementById('portfolio-overview-page')
  const grid = page.childNodes[3].childNodes[1]
  // Set title
  page.childNodes[1].childNodes[1].innerHTML = givenName

  // Setup the three indicators on the top bar
  const indicators = [page.childNodes[1].childNodes[3].childNodes[1], page.childNodes[1].childNodes[3].childNodes[3], page.childNodes[1].childNodes[3].childNodes[5]]

  client.invoke('update_indicators', id, (error, res) => {
    if (error) {
      console.log(error)
    } else {
      populateIndicators(indicators, res)
    }
  })

  client.invoke('get_portfolio_state', id, (error, res) => {
    if (error) {
      console.error(error)
    } else {
      const keys = Object.keys(res[0])
      for (j = 0; j < keys.length; j++) {
        console.log(res)
        const payload = res[0][keys[j]]
        updateState(document.getElementById('currency-' + keys[j]), payload)
      }
    }
  })
  setTimeout(function () {
    loopPortfolioUpdate(id, givenName)
  }, Settings.settings.account_update_time)
}

function switchKey (keyFrom, keyTo, jsonObject) {
  jsonObject[keyTo] = jsonObject[keyFrom]
  delete jsonObject[keyFrom]
  return jsonObject
}

function populateIndicators (nodes, jsonObject) {
  const keys = Object.keys(jsonObject)
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].innerHTML = keys[i] + ': ' + jsonObject[keys[i]]
  }
}

availableIsToggled = false
// Create the available listener
const availableButton = document.getElementById('available-button')
availableButton.addEventListener('click', () => {
  const availablePage = document.getElementById('available-models')
  if (!availableIsToggled) {
    availableButton.style.marginBottom = '470px'
    availablePage.style.marginTop = '-470px'
    availablePage.style.display = 'block'
    availableIsToggled = true
  } else {
    availableButton.style.marginBottom = '0px'
    availablePage.style.marginTop = '0px'
    availablePage.style.display = 'none'
    availableIsToggled = false
  }
})
