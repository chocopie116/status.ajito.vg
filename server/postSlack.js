var message = require('./message');

exports.handler = function(event, context, callback) {
    //slackのコマンドの引数にokが入っている場合は-1以外になる
    //var containsOkCommand = event.text.indexOf('ok') != -1;
    //var color = (containsOkCommand) ? 'green' : 'red';

    message.storeMessage('green')
        .then(function(data) {
            callback(null, {reuslt: 'ok'});
        });
}
