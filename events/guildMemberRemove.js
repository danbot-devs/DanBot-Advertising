module.exports = (client, member, guild) => {
    client.channels.get("614980344235556886").send(`${member.user.tag} (ID: ${member.user.id}) just left. If you need them for some reason i will attach their message logs. (You can still get them using the user's id)`, { files: ["./messagelogs/" + member.user.id + '.txt'] })
}