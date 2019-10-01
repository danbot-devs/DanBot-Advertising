exports.run = (client, message, msg) => { 
let args = msg.content.split(" ");
num = Number(args[1]);
if (num != NaN) {
  storageHeper.fetchAds(msg.author.id, function(ads) {
    try {
      let embed = util.advertisment(
        msg.author.tag,
        ads[num - 1].name,
        ads[num - 1].invite,
        ads[num - 1].topic,
        ads[num - 1].description
      );
      msg.channel.send(embed);
      client.channels.get(config.adsChannel).send(embed);
    } catch (e) {
      msg.channel.send("Error: You dont have any ads.");
    }
  });
}
}