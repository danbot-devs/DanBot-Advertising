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
  T.post('statuses/update', { status: `
You can advertise your Twitch, Youtube, Twitter and many more social medias! 
We range from Community, Gaming, Listing, Fun and many more types of servers!
We offer server partnerships!
Custom bot.

Join https://discord.gg/R7htvbv ${client.guilds.reduce((p, c) => p + c.memberCount, 0).toLocaleString()} members already advertising` }, function(err, data, response) {
    message.channel.send("Posted ad on twitter :)")
  });
};