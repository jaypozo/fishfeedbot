// load config
var config = {}

try {
  config = require('../config.secret')
  console.log('Loaded config')
} catch (err) {
  console.log('Did not load config.secret')
}

const async = require('async')
const express = require('express')
const app = express()

var feedFishService
var chatService

var initFeeder = function (next) {
  console.log('init')
  feedFishService = require('./services/feedFishService')(config)
  feedFishService.initialize(function (err) {
    if (err) return next(err)
    next()
  })
}

var initChatService = function (next) {
  chatService = require('./services/chatService')(config, feedFishService)
  chatService.initialize(function (err) {
    if (err) return next(err)
    next()
  })
}

async.series([
  initFeeder,
  initChatService
], function (err) {
  if (err) return console.log(err.message)
  var listener = app.listen(process.env.PORT || 3000, function () {
    console.log(`App started on port ${listener.address().port}.`)
  })
})

