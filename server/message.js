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

    dynamodb.putItem(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
    });
};

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

    dynamodb.query(params, function (err, data) {
        if (err) {
            console.log(err,err.stack);
        } else {
            console.log(data);
        }
    });
};

module.exports.storeMessage = storeMessage;
module.exports.readMessages = readMessages;
