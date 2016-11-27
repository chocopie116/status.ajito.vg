var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: 'ap-northeast-1'

});
var dynamodb = new AWS.DynamoDB();

/**
 * @param int    statusNum ステータス 1:ask, 2:ok, 3:ng
 * @param string message   表示文章
 *
 * @return Promise
 */
var storeMessage = function (statusNum, message) {
    var timestamp = Math.floor(new Date().getTime() / 1000 );
    var params = {
        TableName: 'ajito.messages',
        Item: {
            'key':     	 {"S": 'messages'},
            'timestamp': {"N": String(timestamp)},
            'status':    {"N": String(1)},
            'message':   {"S": "Hello"}
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

            return resolve(data);
        });
    });
};

module.exports.storeMessage = storeMessage;
module.exports.readMessages = readMessages;
