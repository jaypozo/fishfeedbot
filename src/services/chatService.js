module.exports = function (config, feedFishService) {
  var Service = {}

  const Botkit = require('botkit')
  const controller = Botkit.slackbot()

  const bot = controller.spawn({
    token: process.env.SLACK_API_TOKEN || config.slack.apiToken
  })

  const watsonMiddleware = require('botkit-middleware-watson')({
    username: process.env.WATSON_CONVERSATION_USERNAME || config.watson.conversation.username,
    password: process.env.WATSON_CONVERSATION_PASSWORD || config.watson.conversation.password,
    workspace_id: process.env.WATSON_CONVERSATION_WORKSPACEID || config.watson.conversation.workspaceId,
    version_date: process.env.WATSON_CONVERSATION_VERSIONDATE || config.watson.conversation.versionDate
  })

  controller.middleware.receive.use(watsonMiddleware.receive)

  controller.hears(['feedfish'], ['direct_message', 'direct_mention', 'mention'], watsonMiddleware.hear, function (bot, message) {
    console.log('heard feed')
    bot.reply(message, message.watsonData.output.text.join('\n'))
    feedFishService.feed(function (err) {
      if (err) bot.reply(message, `I can't seem to access the feeder. I hope the fish don't starve!`)
      else bot.reply(message, `The fish have been fed! :fish:`)
    })
  })

  controller.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    bot.reply(message, message.watsonData.output.text.join('\n'))
  })

  Service.initialize = function (next) {
    bot.startRTM(function (err, bot, payload) {
      if (err) throw new Error('Could not connect to Slack')
      next()
    })
  }

  Service.sendMessage = function (messageText, next) {
    next()
  }

  return Service
}
