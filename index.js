var smallTalk = require('./src/smallTalk').smallTalk
var getReplyText = require('./src/getReplyText')
var dontUnderstand = require('./src/smallTalk').dontUnderstand
var changeStory  = require('./src/changeStory')
var helpers = require('./src/helpers')

var Kit = function () {}

Kit.prototype.smallTalk  = (convo) => {
    smallTalk(convo)
}

Kit.prototype.getReplyText = (convo, intent) => {
    return new Promise((resolve, reject) => {
        getReplyText(convo, intent)
            .then(rs => resolve(rs))
            .catch(err => reject(err))
    })
}

Kit.prototype.notGot = (convo, message) => {
    dontUnderstand(convo, message)
}

Kit.prototype.responseTextPromise = (response) => {
    return new Promise((resolve, reject) => {
        helpers.randomResponseTextPromise(response)
        .then(rs => {
            resolve(rs)
        })
    })
}

Kit.prototype.buildFlow = (start, validation, blockScope) => {
    helpers.buildBlockFlow(start, validation, blockScope)
}

module.exports = new Kit()


