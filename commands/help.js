
    const Discord = require("discord.js");
    const bot = new Discord.Client();
    exports.run = (client, message, args) => { 
         const embed10 = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle("Here are all my commands!")
            .addField("Dans's commands:", config.prefix + "tweet | Posts args to a tweet \n" + config.prefix + "tweetad | Posts our server ad to twitter \n" + config.prefix + "reload | Reloads all commands. \n" + config.prefix + "eval | Allows you to run code and system commands.")
            .addBlankField()
            .addField("STAFF ONLY:", config.prefix + "logs | Gets the message logs for a user \n" + config.prefix + "kick | Kicks a user from the server")
            .addBlankField()
            .addField("COMMANDS:", config.prefix + "help | Shows this embed... \n" + config.prefix + "system | Shows system infomation. \n" + config.prefix + "topinvites | Shows invite leaderboard \n" + config.prefix + "uptime | Shows the uptime of the bot \n")
    message.channel.send(embed10)
    }
