module.exports = async(client, member, guild) => {
    client.channels.get("614980234747576341").send(`Welcome <@${member.user.id}> to DanBot Advertising. Make sure to read <#614980230318391329> for the rules!`)


    //Captcha Stuff
    const captcha = require('svg-captcha');
    const svg2png = require('svg2png');

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
}