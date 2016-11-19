var event = {
    "Records": [ { "s3": { "bucket": { "name": "mybucket" }, "object": { "key": "test.json" } } } ]
};

var context = {};
var callback = function(err, data) {
    return;
};

var myLambda = require('./messages/get.js');
myLambda.handler(event, context, callback);
