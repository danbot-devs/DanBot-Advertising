exports.run = (client, message, args, msg) => { 
    ads[msg.author.id] = [];
    usersMakingAds.push(msg.author.id);
    msg.channel.send(`Please setup below or ${prefixtouse}cancel to cancel`);
}
