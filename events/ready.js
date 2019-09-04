const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
module.exports = (client, guild, files) => {
    client.user.setActivity("LOADING STATUS.........")
//Ready Console Message
const timestamp = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
console.log(`Started ${client.user.username} at ${timestamp}!`)

//Command Handler
fs.readdir("./commands/", (err, files) => {
    if (err) return console.log(err);
         console.log(`Loaded ${files.length} commands successfully!`)
     })

//Auto Activities List
const activities = [
    {
        "text": "TEMP STATUS",
        "type": "WATCHING"
    },
];
setInterval(() => {
    client.user.setStatus('online')
    const activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity.text, { type: activity.type }); 
}, 10000);   


}