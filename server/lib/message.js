var AWS = require('aws-sdk');
var request = require('request');
var moment = require('moment');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: 'ap-northeast-1'

});
var dynamodb = new AWS.DynamoDB();

var DEFAULT_MESSAGES = {
    yellow: '誰かいます?',
    red:    '誰もいなさそうです',
    green:  '飲んでますよ'
};

var SLACK_ICON_MAPS = {
    yellow: ':yellow_heart:',
    red:    ':red_circle:',
    green:  ':green_heart:'
};

var slackNotify = function(color, message, user) {
    var options = {
        uri: process.env.SLACK_WEBHOOK_URL,
        headers: {'Content-type': 'applicationjson'},
        json: {
            username: user,
            text: SLACK_ICON_MAPS[color] + " " + message,
            icon_emoji: ':ajito:',
            channel: '#ajiting'
        }
    };
    request.post(options, function(error, response, body){
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else {
            console.log('error: '+ response.statusCode + body);
        }
    });
}

/**
 * @param string statusNum 色 yellow:ask, green:some one, red:no one
 * @param string message   表示文章
 *
 * @return Promise
 */
var storeMessage = function (color, message, user) {
    message = message || DEFAULT_MESSAGES[color];
    user = user || 'annonymous';

    var now = moment().utcOffset('+09:00'); //Asia/Tokyo
    var timestamp = now.unix();
    var params = {
        TableName: 'ajito.messages',
        Item: {
            'key':     	 {"S": 'messages'},
            'timestamp': {"N": String(timestamp)},
            'status':    {"S": color},
            'user'  :    {"S": user},
            'message':   {"S": message},
            'date':      {"S": String(now.format('YYYY/MM/DD HH:mm:ss'))}
        }
    };

    return new Promise(function(resolve, reject) {
        dynamodb.putItem(params, function (err, data) {
            if (err) {
                return reject(err);
            }
        });
        slackNotify(color, message, user);

        return resolve(data);
    });
};

/**
 * @return Promise
 */
var readMessages = function() {
    var params = {
        TableName: 'ajito.messages',
        KeyConditions: {
            'key' : {
                'ComparisonOperator': 'EQ',
                'AttributeValueList': [{S: 'messages'}]
            }
        },
        Limit: 5,
        ScanIndexForward: false //sortKeyで降順
    };

    return new Promise(function(resolve, reject) {
        dynamodb.query(params, function (err, data) {
            if (err) {
                return reject(err);
            }

            var result = [];
            data.Items.forEach(function(r) {
                result.push({
                    user:       r.user.S,
                    status:     r.status.S,
                    message:    r.message.S,
                    created_at: r.date.S,
                    timestamp:  r.timestamp.N
                });
            });
            return resolve(result);
        });
    });
};

module.exports.storeMessage = storeMessage;
module.exports.readMessages = readMessages;
