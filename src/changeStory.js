
// change current loaded intent
var changeItent = (intent, convo) => {
    require(`${convo.conf.STORY_DIR}/${intent}/blocks`).startConversation(convo)
}

 /**
     * Checks if different intent is exists, if exists than moved current coversation into it
     * @param {object} response
     * @param {object} convo
     * @param {any} callback
     */

module.exports = exports = (response, convo, callback) => {
     // get intent from current resposne
    var intent = response.intent[0].value

    if (intent !== null && intent !== convo.vars.story) {
        changeItent(intent, convo)
        convo.next()
        callback(true)
    } else {
            // გმაოტოვე მომდევნო ბლოკი
        callback(null, response, convo)
    }
}

