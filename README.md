# DanBot Advertising
A discord bot for my DanBot Advertising server, This bot can do Moderation, Invite link checking in channels, Captcha for new users, message logger (to txt file and can download using the logs command) and a lot more
## Getting Started
These instructions will get you a copy of the project up and running on your machine.

### Installing requirements 
```
npm i discord.js fs moment svg-captcha svg2png child_process os systeminformation prettysize table array-sort twit chart-constructor moment-duration-format 
```

### Setting up config
```
{
    "token": "https://discordapp.com/developers/applications/me",
    "twitter_consumer_key": "https://developer.twitter.com/en/application",
    "twitter_consumer_secret": "https://developer.twitter.com/en/application",
    "twitter_access_token": "https://developer.twitter.com/en/application",
    "twitter_access_token_secret": "https://developer.twitter.com/en/application",
    "ownerID": "Owner id",
    "prefix": "DBA!",
    "invite": "Server invite for captcha fail",
    "staffrole": "Staff",
    "logchannel": "logs",
    "invitechannel": "invites"
}
```

## Running the bot
After you followed everything above you can now do `node .` in the directory of the bot and it should start :)

## Authors

* **danielpmc** - *Main Dev*

See also the list of [contributors](https://github.com/danbot-devs/DanBot-Advertising/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
