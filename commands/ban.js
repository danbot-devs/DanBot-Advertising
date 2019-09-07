const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs');
exports.run = (client, message, args) => {
let casenumber = JSON.parse(fs.readFileSync("./casenumber.json"));
  const usage = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle("Command: " + prefixtouse + "ban")
            .addField("Usage", prefixtouse + "ban @Someone <reason>")
            .addField("Example", prefixtouse + "ban @Someone dm advertising")
            .setDescription("Description: " + "ban a user from the current server");

  if (message.guild.roles.find(role => role.name === config.staffrole)) {
  if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('Sorry, i dont have the perms to do this!')
    let reason = args.slice(1).join(' ');
    if (!reason) return message.channel.send(usage);
    if (message.mentions.users.size < 1) return message.channel.send(usage);
    let user = message.guild.member(message.mentions.users.first());
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('I can\'t ban that member.');
  message.channel.send(`***Bye Bye ${user.user.tag}***`);
  if (!message.guild.member(user).banable) return message.reply('I can\'t ban that member.');
  message.guild.member(user).ban("Mod:" + message.author.tag + "| Reason: " + reason); 
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Case #" + casenumber.casenumber + " | Action: Ban")
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