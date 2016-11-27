var message = require('./message');

exports.handler = function(event, context, callback) {
    var color = 'yellow';
    var text = '今いる?';
    message.storeMessage(color, text).then(function(data) {
        callback(null, data);
    });
}
