const table = require('table');
const arraySort = require('array-sort');
const Discord = require('discord.js');
exports.run = async(client, message, args) => {
    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send(`Sorry, I don't have the proper permissions to view invites!`);
    })
    invites = invites.array();
    arraySort(invites, 'uses', { reverse: true });
    let possibleInvites = [['User', 'Uses']];
    invites.forEach(function (invite) {
        possibleInvites.push([invite.inviter.username, invite.uses]);
    })
    const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Leaderboard', `${table.table(possibleInvites)}`)
        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL)
    message.channel.send(embed)
};