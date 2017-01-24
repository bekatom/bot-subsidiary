var _ = require('lodash')
var debug = require('debug')('bot')
var getReplyText = require('./getReplyText')

var loadIntent = (intent, convo) => {
    require(`${convo.conf.STORY_DIR}/${intent}/blocks`).startConversation(convo)
}

var dontUnderstand = (convoBot, messageTexts) => {
    if (messageTexts === null || typeof messageTexts === 'undefined') {
       messageTexts = require(`${convoBot.conf.KEY_DIR}/index`).DONT_UNDERSTAND 
    }
    require('./helpers').randomResponseTextPromise(messageTexts)
    .then(text => {
        if (!convoBot.status) {
            convoBot.replyWithTyping(convoBot.message, text)
        } else {
            convoBot.say(text)
            convoBot.next()
        }
    }).catch(err => {
        debug('error in smallTalk ', err)
    })
}

module.exports = {
    dontUnderstand,
    smallTalk: (convoBot) => {
       // var dontKnowMessages = require(`${convoBot.conf.KEY_DIR}/index`).DONT_UNDERSTAND
        // TODO check if convoBot.message contains existing properties
        let { entities, intent } = convoBot.message
        let intentValue = intent[0].value
        delete entities.intent

        //  if intent and entities exists both
        if (!_.isEmpty(entities) && intentValue !== null) {
            getReplyText(convoBot, intentValue)
            .then(rs => {
                convoBot.activate()
                convoBot.setVar('story', intentValue)
                loadIntent(intentValue, convoBot)
            }).catch(() => {
                convoBot.activate()
                dontUnderstand(convoBot, null)
            })

            return false
        }

        // if intent exists only
        if (_.isEmpty(entities) && intentValue !== null) {
            convoBot.setVar('story', intentValue)
            convoBot.activate()
            loadIntent(intentValue, convoBot)
            return false
        }

        // if entities is empty and intent also empty
        if (_.isEmpty(entities) && intentValue === null) {
            dontUnderstand(convoBot, null)
            return false
        }

        // if entities is not empty && intent is null
        if (!_.isEmpty(entities) && intentValue === null) {
            getReplyText(convoBot, 'smalltalk')
            .then(rs => {
                var writeResponseText = rs.replace('$FirstName', convoBot.message.userData.first_name)
                convoBot.replyWithTyping(convoBot.message, writeResponseText)
            })
            .catch(() => {
                dontUnderstand(convoBot, null)
            })
            return false
        }
    }
}

