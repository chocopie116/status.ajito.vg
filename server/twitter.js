var twitter = require('twitter');

var client = new twitter({
    consumer_key        : process.env.TWITTER_CONSUMER_KEY,
    consumer_secret     : process.env.TWITTER_CONSUMER_SECRET,
    access_token_key    : process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.post('statuses/update', {status: 'いるよ'},  function(error, tweet, response) {
    if(error) throw error;
});

client.post('statuses/update', {status: '誰もいないよ'},  function(error, tweet, response) {
    if(error) throw error;
});
