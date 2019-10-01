exports.run = (client, message, args) => { 
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Info for " + client.user.username + "\n coming soon:tm:")
message.channel.send(embed)
}
