var _ = require('lodash')

module.exports = exports = (convo, intent) => {
    const message = convo.message
    // const _keyFolder =
    const intentKeys = require(`${convo.conf.KEY_DIR}/${intent}`)
    return new Promise((resolve, reject) => {
        // if message entities is empty than dontUnderstand what are u saying
        if (_.isEmpty(message.entities)) {
            reject(false)
            return false
        }
        Object.keys(message.entities).forEach((value, index, arr) => {
            const _key = message.entities[value][0].value
            if (intentKeys[value][_key]) {
                require('./helpers').randomResponseTextPromise(intentKeys[value][_key])
                    .then(rs => {
                        resolve(rs)
                    }).catch(err => {
                        reject(err)
                    })
            } else {
                reject(false)
            }
        })
    })
}
