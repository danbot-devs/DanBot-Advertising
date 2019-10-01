//https://discordapp.com/oauth2/authorize?client_id=616585101266124802&scope=bot&permissions=60481

//Conts to make bot work
global.Discord = require("discord.js");
const client = new Discord.Client()
global.fs = require("fs");
const moment = require("moment");
global.config = require("./config.json")
global.prefixtouse = config.prefix

//Message logger
client.on("message", async message => {
global.logger = fs.createWriteStream('messagelogs/'+ message.guild.id + "/" + message.author.id + '.txt', {
  flags: 'a' 
});
global.timestamp = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  global.messagestuff = message.content.split(' ').slice(0).join(' ');
  logger.write(`${timestamp} | Channel: ${message.channel.name} | User: ${message.author.username} | Message: ${messagestuff}\n`)
});

//Invite stuff
const invites = {};
client.on('ready', () => {
    client.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
          invites[g.id] = guildInvites;
        });
      });
  });
  client.on('guildMemberAdd', member => {
    member.guild.fetchInvites().then(guildInvites => {
      const ei = invites[member.guild.id];
      invites[member.guild.id] = guildInvites;
      const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
      const inviter = client.users.get(invite.inviter.id);
      const logChannel = member.guild.channels.find(channel => channel.name === config.invitechannel);
      logChannel.send(`${member.user.tag} (ID: ${member.user.id}) joined using invite code ` + "`" + invite.code + "`" + ` from ${inviter.tag} (ID: ${inviter.id}). Invite code has been used ${invite.uses} times.`);
      const invite5 = member.guild.roles.find(role => role.id === config.invite5);
      const invite10 = member.guild.roles.find(role => role.id === config.invite10);
      const invite25 = member.guild.roles.find(role => role.id === config.invite25);
      const invite50 = member.guild.roles.find(role => role.id === config.invite50);
      if (invite.uses == 5) return member.guild.members.get(inviter.id).addRole(invite5), client.channels.get(config.inviterewmsg).send(`<@${inviter.id}> just hit 5 invites! Here's a role for you :)`);
      if (invite.uses == 10) return member.guild.members.get(inviter.id).removeRole(invite5), member.guild.members.get(inviter.id).addRole(invite10), client.channels.get(config.inviterewmsg).send(`<@${inviter.id}> just hit 10 invites! Here's a role for you :)`);;
      if (invite.uses >= 25) return member.guild.members.get(inviter.id).removeRole(invite10), member.guild.members.get(inviter.id).addRole(invite25), client.channels.get(config.inviterewmsg).send(`<@${inviter.id}> just hit 25 invites! Here's a role for you :)`);;
      if (invite.uses >= 50) return member.guild.members.get(inviter.id).removeRole(invite25), member.guild.members.get(inviter.id).addRole(invite50), client.channels.get(config.inviterewmsg).send(`<@${inviter.id}> just hit 50 invites! Here's a role for you :)`);;
    });
  });

//Bot kicking if unauth
client.on('guildMemberAdd', async member => {
if(member.user.bot){ 
    client.channels.get("614980234747576341").send(`Banned <@${member.user.id}> for trying to join without owners permission. :wave:`)
    return member.ban()}
  })

//Invite checker stuff
const invitecheck = ["discord.gg", "discord.me", "discord.io/", "discordapp.com/invite"]
const weblinkcheck = ["http", "www.", ".com", ".net", ".org", ".ca", ".co.uk", ".xyz", ".ga", ".tk"]
let count = JSON.parse(fs.readFileSync("./count.json"));
client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (message.channel.id === '614980269350584346') return count.ps ++, count.countall ++; //Premium servers
    if (message.channel.id === '614980270877311026') return count.pap ++, count.countall ++; //Paid ad promotions
    if (message.channel.id === '614980272961749009') return count.nbs ++, count.countall ++; //Nitro boosted servers
    if (message.channel.id === '614980274341675092') return count.sds ++, count.countall ++; //Special discord servers
    if (message.channel.id === '614980301562839050') return count.cs ++, count.countall ++; //Community servers
    if (message.channel.id === '614980303223652372') return count.gs ++, count.countall ++; //Gaming servers
    if (message.channel.id === '614980304960094222') return count.las ++, count.countall ++; //Listed advertising servers
    if (message.channel.id === '614980306637946895') return count.es ++, count.countall ++; //Economy servers
    if (message.channel.id === '614980307791380489') return count.ss ++, count.countall ++; //Social servers
    if (message.channel.id === '614980310005842124') return count.fs ++, count.countall ++; //Fun servers
    if (message.channel.id === '614980312207720458') return count.as ++, count.countall ++; //Anime servers
    if (message.channel.id === '614980314195951702') return count.nsfws ++, count.countall ++; //NSFW servers
    if (message.channel.id === '614980315970011138') return count.ms ++, count.countall ++; //Music servers
    if (message.channel.id === '614980317882744852') return count.memes ++, count.countall ++; //Meme servers
    if (message.channel.id === '614980319506071553') return count.dbs ++, count.countall ++; //Discord bot servers
    if (message.channel.id === '614980321162559535') return count.ods ++, count.countall ++; //Other discord servers
    //if (!modlog) return;
      const prefix = config.prefix;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
    if (message.content.startsWith("<@" + client.user.id +">") || message.content.startsWith("<@!" + client.user.id +">")) {
      message.reply("Prefix is `" + prefix + "`.")
    }
  
    if (invitecheck.some(word => message.content.toLowerCase().includes(word))) {
    message.delete()
    let modlog = message.guild.channels.find(channel => channel.name == config.logchannel);
    const embed = new Discord.RichEmbed()
      .setColor(0x00A2E8)
      .setTitle("Action: Auto Moderation")
      .addField("Moderator", client.user.username + " (ID: " + client.user.id + ")")
      .addField("User", message.author.username + " (ID: " + message.author.id + ")")
      .addField("In channel", message.channel.name, true)
      .addField("Reason", "Invite Link", true)
      .addField("Invite link", message.cleanContent)
      .setFooter("Time used: " + message.createdAt.toDateString())
      if (!modlog) return;
      client.channels.get(modlog.id).send({embed});
      message.reply(" You are not allowed to send invite links in this channel").then((response) => {
        response.delete(6000);
        });
  }
});
setInterval(() => {
fs.writeFile(`./count.json`, JSON.stringify(count), (err) => {
    if(err) console.error(err)
})
}, 10000);   

//Warn, Error and Reconnecting events
client.on('warn', err => console.log('[WARNING]', err));
client.on('error', err => console.log('[ERROR]', err));
client.on('reconnecting', () => console.log('Got disconnected from discord : Reconnecting...'));

//Event handler
fs.readdir('./events/', (err, files) => {
  files = files.filter(f => f.endsWith('.js'));
  files.forEach(f => {
      const event = require(`./events/${f}`);
      client.on(f.split('.')[0], event.bind(null, client));
      delete require.cache[require.resolve(`./events/${f}`)];
    });
  });

//Command handler
client.on('message', message => {

    const prefix = config.prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandargs = message.content.split(' ').slice(1).join(' ');
    const command = args.shift().toLowerCase();
    client.channels.get(config.commandlogs).send(`[${message.author.username}] [${message.author.id}] >> ${prefix}${command} ${commandargs}`);
        try {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(client, message, args);
        } catch (err) {
                if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                    return;
             }
    }  
})

client.login(config.token);