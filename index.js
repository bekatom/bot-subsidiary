var smallTalk = require('./src/smallTalk').smallTalk
var getReplyText = require('./src/getReplyText')
var dontUnderstand = require('./src/smallTalk').dontUnderstand

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

module.exports = new Kit()


