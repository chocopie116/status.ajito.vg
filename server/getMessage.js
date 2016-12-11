var message = require('./lib/message');

exports.handler = function(event, context, callback) {
    message.readMessages().then(function(data) {
        callback(null, data);
    });
}
