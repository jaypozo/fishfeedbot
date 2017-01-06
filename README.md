Fish Feed Bot
=============

Uses IBM Watson's Conversation API to recognize intent to feed your fish using a
Particle Photon and a couple of servos.

Blog post: https://bikesgrindsandlife.com/2016/12/10/fish-feeding-as-a-service/

Also uses Botkit by Howdy.ai to handle bot functionality for Slack.

Setup
-----

[Create a IBM Bluemix account and create a Conversation service](http://www.ibm.com/watson/developercloud/doc/conversation/getting-started.html). This will provide you with credentials to use in your config.

You are going to need a new [Slack bot user](https://api.slack.com/bot-users). You can create a new one for your Slack account [here](https://my.slack.com/services/new/bot). This will provide you with your Slack API Token.

Your Particle access token secures the cloud function so only you can call it.
Learn how to generate one [here](https://docs.particle.io/reference/api/#generate-an-access-token).

You can find your Particle device id under the "devices" menu of the Particle IDE.

Rename `config.secret.example.js` to `config.secret.js` and fill in the credentials with your own.

Deployment
----------

This project is ready to deploy on Heroku. Just [provide your environment variables](https://devcenter.heroku.com/articles/config-vars) to your Heroku project:

WATSON_CONVERSATION_USERNAME

WATSON_CONVERSATION_PASSWORD

WATSON_CONVERSATION_WORKSPACEID

WATSON_CONVERSATION_VERSIONDATE

SLACK_API_TOKEN

PARTICLE_DEVICE_1

PARTICLE_ACCESS_TOKEN
