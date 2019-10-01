module.exports = (client, guild) => {
    fs.mkdirSync("./" + guild.id);
};