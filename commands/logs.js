exports.run = (client, message, guild) => {
    var args = message.content.split(" ");
    if (args[1] == null) {
        return message.channel.send("Please specify the users ID");
    }
    var data = {
        aliases: [],
        name: args[1]
    }

    const path = "./messagelogs/" + message.guild.id + "/" + data.name.toLowerCase() + '.txt'
    try {
        if (fs.existsSync(path)) {
            message.channel.send(`Here you go! Heres the logs for <@${args[1]}>`, { files: ["./messagelogs/" + message.guild.id + "/" + data.name + '.txt'] });
        }
      } catch(err) {
        message.channel.send('Users logs file does not exist :/');
      }
}