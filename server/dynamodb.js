var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: 'ap-northeast-1'

});
var dynamodb = new AWS.DynamoDB();

var key = "messages";
var timestamp =  Math.floor( new Date().getTime() / 1000 ) ;
var params = {
    TableName: 'ajito.messages',
    Item: {
        'key':     	 {"S": key},
        'timestamp': {"N": String(timestamp)},
        'status':    {"N": String(1)},
        'message':   {"S": "お腹すいたけど、どうだろう"}
    }
};

dynamodb.putItem(params, function (err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.log(data);
    }
});

params = {
    TableName: 'ajito.messages',
    KeyConditions: {
        'key' : {
            'ComparisonOperator': 'EQ',
            'AttributeValueList': [{S: 'messages'}]
        }
    }
};

dynamodb.query(params, function (err, data) {
    if (err) {
        console.log(err,err.stack);
    } else {
        console.log(data);
    }
});
