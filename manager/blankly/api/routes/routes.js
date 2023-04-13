// Routing definitions for the external API
// Copyright (C) Emerson Dove - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Emerson Dove, 2021

'use strict'
// module.exports = function (app) {
//   const controller = require('../controllers/controller')
//
//   app.route('/start_blankly')
//     .get(controller.start_blankly)
//
//   app.route('/stop_blankly')
//     .get(controller.kill_blankly)
//
//   // Test Routes
//   app.route('/tasks')
//     .get(controller.list_all_tasks)
//     .post(controller.create_a_task)
//
//   app.route('/tasks/:taskId')
//     .get(controller.read_a_task)
//     .put(controller.update_a_task)
//     .delete(controller.delete_a_task)
//
//   app.route('/')
//     .get(controller.root)
// }

module.exports.routes = function (app, controller) {
  // Get the root - currently nothing there
  app.route('/')
    .get(controller.root.bind(controller))

  // Directly start the python process
  app.route('/start')
    .get(controller.startBlankly.bind(controller))

  app.route('/stop')
    .get(controller.stopBlankly.bind(controller))

  // Poke a container to initiate buffer
  app.route('/poke')
    .get(controller.poke.bind(controller))

  // Get a list of live variables attached to the model
  app.route('/live_vars')
    .get(controller.listLiveVars.bind(controller))

  // Get a list of live variables organized by ID
  app.route('/live_vars/:live_var_id')
    /*
    Valid Params:
      new_value (valid json object): Any object that can be passed in json. This will be cast to the type shown
        as the type the live_var is defined as, so pass values that can be cast without error.
        Example: http://localhost:3000/live_vars/4492405888?new_value=3
     */
    .get(controller.manageLiveVars.bind(controller))

  app.route('/backtest/:strategyId')
    /*
    Valid Params:
      Send args straight to the python .backtest function by using

      >>> import urllib.parse
      >>> urllib.parse.urlencode({'a': 'A', 'b': 'B'})
      >>> 'a=A&b=B'

      http://localhost:3000/backtest?a=A&b=B -> { a: 'A', b: 'B' }
     */
    .get(controller.backtest.bind(controller))
}
