//Conts to make bot work
const Discord = require("discord.js");
const client = new Discord.Client()
const fs = require("fs");
const moment = require("moment");
global.config = require("./config.json")
global.prefixtouse = config.prefix

//Captcha Stuff
const captcha = require('svg-captcha');
const svg2png = require('svg2png');

client.on('guildMemberAdd', async member => {
  const vcm = member.guild.channels.find(c => c.id === "614980239725953046");
    let svg = captcha.create({ noise: 0, size: 5, background: '#7289DA', ignoreChars: 'f0o1il' });
    let pngBuffer = await svg2png(svg.data);
  

  const filter2 = m => m.author.id === member.id && m.channel.id === "614980239725953046";
  vcm.send(`<@${member.id}>`, {
    embed: new Discord.RichEmbed()
    .setDescription("Hi! This is a captcha to stop raid bots joining. Please type what you see in the captcha below. You have **2** minutes to do this or you will be kicked!")
    .addField('Your Captcha:', '_ _')
    .attachFiles([{ attachment: pngBuffer, name: 'captcha.png' }])
    .setImage('attachment://captcha.png')
    .setColor("RED")
  }).then((message2) => {
    message2.channel.awaitMessages(filter2, {
        max: 1,
        time: 120000,
        errors: ['time'],
    }).then(async (collected1) => {
      collected1.delete()
      message2.delete()
      message2.channel.fetchMessages({
        limit: "5",
       }).then((messages) => {
        message2.channel.bulkDelete(messages, true).catch(error => console.log(error.stack));
       })
      if (collected1.first().content === svg.text) {
        const autorole = member.guild.roles.find(r => r.name === "Advertiser");
        const autorole2 = member.guild.roles.find(r => r.name === "Members");
        const autorole3 = member.guild.roles.find(r => r.name === "Not Verified");
        const welcome = member.guild.channels.find(c => c.name === "server verification");
        member.addRole(autorole)
        member.addRole(autorole2)
        member.removeRole(autorole3)
} else {
member.send("You failed the captcha! Want another go? " + config.invite)
setTimeout(async () => {
  await member.kick("Failed the captcha in 2minutes")
}, 3000);
}
  }).catch(async (err) => {
    if (member.roles.some(r=>["Advertiser"].includes(r.name))) return;
message2.delete()
message2.channel.fetchMessages({
  limit: "5",
 }).then((messages) => {
  message2.channel.bulkDelete(messages, true).catch(error => console.log(error.stack));
 })
member.send("You failed the captcha! Want another go? " + config.invite)
setTimeout(async () => {
 member.kick("Failed the captcha in 2minutes")
}, 3000);
})
});
})

//Message logger
client.on("message", async message => {
global.logger = fs.createWriteStream('messagelogs/'+ message.author.id + '.txt', {
  flags: 'a' 
});
const timestamp = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  const messagestuff = message.content.split(' ').slice(0).join(' ');
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
      logChannel.send(`${member.user.tag} (ID: ${member.user.id}) joined using invite code ` + "`" + invite.code + "`" + ` from ${inviter.tag} (ID: ${inviter.id}). Invite code has been used ${invite.uses}`);
      const invite5 = member.guild.roles.find(role => role.id === "614980191881658388");
      const invite10 = member.guild.roles.find(role => role.id === "614980191101386770");
      const invite25 = member.guild.roles.find(role => role.id === "614980190048616465");
      const invite50 = member.guild.roles.find(role => role.id === "614980189314613248");
      if (invite.uses == 5) return member.guild.members.get(inviter.id).addRole(invite5), client.channels.get("614980252359327744").send(`<@${inviter.id}> just hit 5 invites! Here's a role for you :)`);
      if (invite.uses == 10) return member.guild.members.get(inviter.id).removeRole(invite5), member.guild.members.get(inviter.id).addRole(invite10), client.channels.get("614980252359327744").send(`<@${inviter.id}> just hit 10 invites! Here's a role for you :)`);;
      if (invite.uses >= 25) return member.guild.members.get(inviter.id).removeRole(invite10), member.guild.members.get(inviter.id).addRole(invite25), client.channels.get("614980252359327744").send(`<@${inviter.id}> just hit 25 invites! Here's a role for you :)`);;
      if (invite.uses >= 50) return member.guild.members.get(inviter.id).removeRole(invite25), member.guild.members.get(inviter.id).addRole(invite50), client.channels.get("614980252359327744").send(`<@${inviter.id}> just hit 50 invites! Here's a role for you :)`);;
    });
  });

//Bot kicking if unauth
client.on('guildMemberAdd', async member => {
if(member.user.bot){ 
    console.log(`the bot ${member.user.username} tried to join the server.`)
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
    console.log(`[${message.guild.name}] [${message.author.username}] >> ${prefix}${command} ${commandargs}`);
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