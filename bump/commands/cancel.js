exports.run = (client, message, msg) => {   
    usersMakingAds.splice(usersMakingAds.indexOf(msg.author.id), 1);
        delete ads[msg.author.id];
        msg.channel.send("Advertisement canceled");
        return;
    }