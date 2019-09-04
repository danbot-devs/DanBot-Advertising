const Discord = require('discord.js');
const { HighChartsConstructor } = require("chart-constructor");
const moment = require("moment");
require("moment-duration-format");
const now = new Date();


exports.run = async(client, message, args) => {
    var Mem = [];
    for (var i = 0; Mem.length < 4; i++) { Mem.push(process.memoryUsage().heapUsed / 1024 / 1024); }
    const chart = await new HighChartsConstructor()
      .plotOptionsOptions({          
        series: {          
          color: "#000000",
          pointStart: now.setHours(now.getHours() - 1),
          pointInterval: 60 * 1000
        }})
      .seriesDataSetter([
        {
          type: "line",
          color: "#ffffff",
          data: Mem,
          name: "RAM (Used in MB)"
        }
      ])
      .titleOptions({ text: "Chart" })
      .toBuffer();
      const attachment = new Discord.Attachment(chart, 'data.png');

var getUptime = function(millis) {
    var dur = {};
    var units = [{
            label: "milliseconds",
            mod: 1000
        },
        {
            label: "seconds",
            mod: 60
        },
        {
            label: "minutes",
            mod: 60
        },
        {
            label: "hours",
            mod: 24
        },
        {
            label: "days",
            mod: 31
        }
    ];

    units.forEach(function(u) {
        millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
    });

    var nonZero = function(u) {
        return dur[u.label];
    };
    dur.toString = function() {
        return units
            .reverse()
            .filter(nonZero)
            .map(function(u) {
                return dur[u.label] + " " + (dur[u.label] == 1 ? u.label.slice(0, -1) : u.label);
            })
            .join(', ');
    };
    return dur;
};
let myDate = new Date(client.readyTimestamp);
        var embed = new Discord.RichEmbed()
        .addField(':runner: Servers:', `**${client.guilds.size.toLocaleString()}**`, true)
        .addField(':information_desk_person: Users:', `**${client.guilds.reduce((p, c) => p + c.memberCount, 0).toLocaleString()}**`, true)
        .addField(':microphone2: Voice Connections:', `**${client.voiceConnections.size}**`, true)
        .addField(":white_check_mark: Uptime:", `**${getUptime(client.uptime)}**`)
        .setFooter(`Ready Timestamp: ${myDate.toString()}`)
        .attachFile(attachment)
        .setImage("attachment://data.png")
        .setColor("GREEN")
        message.channel.send(embed);
    }
