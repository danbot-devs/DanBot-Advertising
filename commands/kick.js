const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs');
exports.run = (client, message, args) => {
let casenumber = JSON.parse(fs.readFileSync("./casenumber.json"));
  const usage = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle("Command: " + prefixtouse + "kick")
            .addField("Usage", prefixtouse + "kick @Someone <reason>")
            .addField("Example", prefixtouse + "kick @Someone for ad links to other discords")
            .setDescription("Description: " + "Kicks a user from the current server");

  if (message.member.hasPermission("KICK_MEMBERS")) {
  if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Sorry, i dont have the perms to do this!')
    let reason = args.slice(1).join(' ');
    if (!reason) return message.channel.send(usage);
    if (message.mentions.users.size < 1) return message.channel.send(usage);
    let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('I can\'t kick that member.');
  message.channel.send(`***Bye Bye ${user.user.tag}***`);
  if (!message.guild.member(user).kickable) return message.reply('I can\'t kick that member.');
  message.guild.member(user).kick("Mod:" + message.author.tag + "| Reason: " + reason); 
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Case #" + casenumber.casenumber + " | Action: Kick")
    .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
    .addField("User", user.user.tag + " (ID: " + user.user.id + ")")
    .addField("Reason", reason, true)
    .setFooter("Time used: " + message.createdAt.toDateString())
    client.channels.get("614980325189353483").send({embed});
    casenumber.casenumber ++;
      }
      fs.writeFile(`./casenumber.json`, JSON.stringify(casenumber), (err) => {
        if(err) console.error(err)
    });
}