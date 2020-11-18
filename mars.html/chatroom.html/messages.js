var moment = require('moment');

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a') //to get the exact time and date when logged in
    }
}

module.exports = formatMessage 