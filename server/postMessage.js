var message = require('./message');

exports.handler = function(event, context, callback) {
    message.storeMessage(event.color, event.message)
        .then(function(data) {
            callback(null, {reuslt: 'ok'});
        }).catch(function(err) {
            callback(null, {result: 'ng'});
        });
}
