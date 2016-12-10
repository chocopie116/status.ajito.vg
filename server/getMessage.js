//var twitter = require('twitter');
var message = require('./lib/message');

//var client = new twitter({
//    consumer_key        : process.env.TWITTER_CONSUMER_KEY,
//    consumer_secret     : process.env.TWITTER_CONSUMER_SECRET,
//    access_token_key    : process.env.TWITTER_ACCESS_TOKEN_KEY,
//    access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET
//});

exports.handler = function(event, context, callback) {
    //いつも同じ文字列だとtwitterに投稿できないため
    //var random = Math.random().toString(36).slice(-8);
    //client.post('statuses/update', {status: random },  function(error, tweet, response) {
    //    if(error) throw error;
    //    console.log('done');
    //});

    message.readMessages().then(function(data) {
        callback(null, data);
    });
}
