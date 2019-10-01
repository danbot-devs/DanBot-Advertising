exports.run = (client, message, args) => {
    //Initialise a git repo if necessary
    const gitP = require('simple-git');
    const git = gitP(__dirname);
     
    git.checkIsRepo()
       .then(isRepo => !isRepo && initialiseRepo(git))
       .then(() => git.fetch());
     
    function initialiseRepo (git) {
       return git.init()
          .then(() => git.addRemote('origin', 'https://github.com/danbot-devs/DanBot-Advertising'))
    }

require('simple-git')()
.exec(() => message.channel.send('Starting pull...'))
.pull((err, update) => {
    if(update && update.summary.changes) {
   //After pull
   message.channel.send('Pull complete. Reloading commands...')
   //Command reloading
   fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    message.channel.send(`Reloaded \`${files.length}\` commands!`)
    files.forEach(file => {
         delete require.cache[require.resolve(`./${file}`)];
    });
    });
})
})
.exec(() => message.channel.send('Complete!'));
};