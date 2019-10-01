//https://discordapp.com/oauth2/authorize?client_id=628607494066798592&scope=bot&permissions=60481
//ID: 628607494066798592

//Conts to make bot work
global.Discord = require("discord.js");
const client = new Discord.Client()
global.fs = require("fs");
const moment = require("moment");
global.config = require("./config.json")
global.prefixtouse = config.prefix

//Ad stuff
global.usersMakingAds = [];
global.ads = {};

//Misc (don't remove or bot wont work)
global.util = require("./utility");
global.storageHeper = require("./storageHelper");

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
            global.msg = message;
            commandFile.run(client, message, args, msg);
        } catch (err) {
                if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                    return;
             }
    }  
})

//Advertisements setup
client.on("message", msg => {
    if (msg.author.bot) return;
    if (usersMakingAds.includes(msg.author.id)) {
      ads[msg.author.id].push(msg.content);
      switch (ads[msg.author.id].length) {
        case 1:
          msg.channel.send("What is the name of your server?");
          break;
        case 2:
          msg.channel.send("Please sent a invite for your server");
          break;
        case 3:
          msg.channel.send("What is the theme of your server? \n Valid themes: Community");
          break;
        case 4:
          msg.channel.send("Please enter a descripton for your server");
          break;
        case 5:
          msg.channel.send(
            "Would you like to save your advertisement? yes or no"
          );
          break;
        case 6:
          msg.channel.send(
            "Congrats! you're finished making your advertisement!"
          );
          let embed = util.advertisment(
            msg.author.tag,
            ads[msg.author.id][1],
            ads[msg.author.id][2],
            ads[msg.author.id][3].toLowerCase(),
            ads[msg.author.id][4]
          );
          if (ads[msg.author.id][5].toLowerCase() == "yes") {
            storageHeper.saveAd(
              msg.author.id,
              ads[msg.author.id][1],
              ads[msg.author.id][2],
              ads[msg.author.id][3].toLowerCase(),
              ads[msg.author.id][4]
            );
            msg.channel.send(`Advertisement saved! ${config.prefix}advertisements to view your advertisements! \nHeres what your advertisement looks like:` + embed);
          }
          if (ads[msg.author.id][3].toLowerCase() === "community") return client.channels.get(config.community).send(embed)
          
          delete ads[msg.author.id];
          usersMakingAds.splice(usersMakingAds.indexOf(msg.author.id), 1);
          msg.channel.send(
            `Please join our advertising server ${config.invite}`
          );
        default:
          break;
      }
      return;
    }
    //Ping response.
    if (msg.mentions.users.has(client.user.id)) {
      msg.channel.send(
        "Prefix is `" + config.prefix + "`."
      );
    }
})
//Bot login
client.login(config.token);