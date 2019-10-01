exports.run = (client, message, args, msg) => { 
storageHeper.fetchAds(msg.author.id, function(ads) {
    if (ads == 0) {
      msg.channel.send("You do not have any advertisements. Please create one!");
      return;
    }
    ads.forEach(async function(ad, i) {
      await msg.channel.send(
        util.advertisment(
          msg.author.tag,
          ad.name,
          ad.invite,
          ad.topic,
          ad.description
        )
      );
    });
  });
}
