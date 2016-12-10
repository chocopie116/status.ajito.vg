var message = require('./lib/message');

exports.handler = function(event, context, callback) {
    var slackMessage = event.event.text;
    var userName = event.event.user_name;
    //slackのコマンドの引数にokの文字列が入っている場合はgreen
    var containsOkCommand = slackMessage.indexOf('ok') != -1;
    var color = (containsOkCommand) ? 'green' : 'red';
    message.storeMessage(color, slackMessage, userName).then(function() {
            callback(null, slackMessage);
        });
}

