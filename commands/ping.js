const request = require("request");
exports.run = async (client, message, args, color, member) => {
  let ping = Math.round(message.client.ping); 
  const ping1 = new Discord.RichEmbed()
  .setDescription(`:ping_pong: Please wait!`)
  .setColor("RANDOM");
  message.channel.send({embed: ping1}).then((msg) => {
  const ping2 = new Discord.RichEmbed();
  ping2.addField('__**Discord API:**__', `${ping} ms`, true)
  request.get({
    url : 'http://danielpmc.ddns.net',
    time : true
  },function(err, response){
  ping2.addField('__**Home Servers:**__', `${response.elapsedTime} ms`, true)
  request.get({
    url : 'http://ss.danbot.xyz/',
    time : true
  },function(err, r1){
  ping2.addField('__**DanBot Hosting:**__', `${r1.elapsedTime} ms`, true)
  ping2.addField("------------------------------------------------------------------------------------------------", "__**Home Servers (Local):**__")
  request.get({
    url : 'http://192.168.0.60/',
    time : true
  },function(err, r2){
  ping2.addField('__**Server-01:**__', `${r2.elapsedTime} ms`, true)
  request.get({
    url : 'http://192.168.0.46:32400/',
    time : true
  },function(err, r3){
  ping2.addField('__**Server-03:**__', `${r3.elapsedTime} ms`, true)
  request.get({
    url : 'http://192.168.0.34/',
    time : true
  },function(err, r4){
  ping2.addField('__**Raspi:**__', `${r4.elapsedTime} ms`, true)
  ping2.setColor('RANDOM');
  msg.edit(ping2)
    })
})
})
})
})
})
};