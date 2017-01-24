
var smallTalk = require('./src/smallTalk').smallTalk

module.exports = (convo) => {
    var kit = {}
    kit.smallTalk = smallTalk(convo)

    return kit
}
