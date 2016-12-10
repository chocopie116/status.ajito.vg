var message = require('./lib/message');

exports.handler = function(event, context, callback) {
    message.storeMessage(event.color, event.message, event.user)
        .then(function(data) {
            callback(null, {reuslt: 'ok'});
        });
}
