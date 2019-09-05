exports.run = async (client, message, args) => {
    if (message.author.id !== config.ownerID) return message.channel.send("Sorry, No permission :O");
    var Twit = require('twit');
    var T = new Twit({
        consumer_key:         config.twitter_consumer_key,
        consumer_secret:      config.twitter_consumer_secret,
        access_token:         config.twitter_access_token,
        access_token_secret:  config.twitter_access_token_secret,
        timeout_ms:           60*1000,
        strictSSL:            true,
      })
      const message2tweet = message.content.split(' ').slice(1).join(' ');
      T.post('statuses/update', { status: message2tweet }, function(err, data, response) {
        message.channel.send("Posted on twitter ```" + message2tweet + "```")
      });
    };