var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: 'ap-northeast-1'

});
var dynamodb = new AWS.DynamoDB();

/**
 * @param string statusNum 色 yellow:ask, green:some one, red:no one
 * @param string message   表示文章
 *
 * @return Promise
 */
var storeMessage = function (color, message) {
    var date = new Date();
    var timestamp = Math.floor(date.getTime() / 1000 );
    var params = {
        TableName: 'ajito.messages',
        Item: {
            'key':     	 {"S": 'messages'},
            'timestamp': {"N": String(timestamp)},
            'status':    {"S": 'yellow'},
            'user'  :    {"S": 'annonymous'},
            'message':   {"S": "いまいる?"},
            'date':      {"S": String(date)}

        }
    };

    return new Promise(function(resolve, reject) {
        dynamodb.putItem(params, function (err, data) {
            if (err) {
                return reject(err);
            }
        });

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
