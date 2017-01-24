var debug = require('debug')('bot')
var async = require('async')
var checkIntent = require('./changeStory').checkIntent

// TODO need to iterate over function list
var buildBlockFlow = (start, validation, blockScope) => {
    async.waterfall([
        start,
        checkIntent,
        validation,
        blockScope
    ], (err, result) => {
        debug('err ..', err, result)
    })
}

var asyncRandomResponseText = async (responses) => {
    return await new Promise(function (resolve) {
        var random = Math.floor(Math.random() * responses.length)
        resolve(responses[random])
    })
}

/**
 * returns random answer from pre-defined answers array
 * @param {string[]} responses
 * @param {function(String)} callback
 */
var randomResponseText = (responses, callback) => {
    var random = Math.floor(Math.random() * responses.length)
    var randomResponse = (responses[random])
    callback(randomResponse)
}

var randomResponseTextPromise = (responses) => {
    return new Promise((resolve, reject) => {
        var random = Math.floor(Math.random() * responses.length)
        resolve((responses[random]))
    })
}

module.exports = {
    buildBlockFlow,
    randomResponseText,
    asyncRandomResponseText,
    randomResponseTextPromise
}
