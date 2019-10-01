const Discord = require("discord.js");
const bot = new Discord.Client();
module.exports = (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    const description = message.cleanContent
    const descriptionfix = description.substr(0, 600);

    logger.write(`${timestamp} | Channel: ${message.channel.name} | User: ${message.author.username} | Deleted: ${descriptionfix}\n`)

    let guild = message.guild;
    let modlog = guild.channels.find(channel => channel.name == config.logchannel);
     if (!modlog) return;
    const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .addField("Author ", `${message.author.tag} (ID: ${message.author.id})`, true)
    .addField("Message Content:", `${descriptionfix}`, true)
    .setTimestamp()
    .setFooter("Message delete in " + message.channel.name)
    .setDescription("I have logged this to their logs file.")
    client.channels.get(modlog.id).send({embed});
}