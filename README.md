# DanBot Advertising
A discord bot for my DanBot Advertising server, This bot can do Moderation, Invite link checking in channels, Captcha for new users, message logger (to txt file and can download using the logs command) and a lot more
## Getting Started
These instructions will get you a copy of the project up and running on your machine.

### Installing requirements 
```
npm i discord.js fs moment svg-captcha svg2png child_process os systeminformation prettysize table array-sort twit chart-constructor moment-duration-format get-folder-size canvas
```

### Setting up config.json
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
    "invitechannel": "invites",
    "invite5": "Role ID For a role called `invite 5+`",
    "invite10": "Role ID For a role called `invite 10+`",
    "invite25": "Role ID For a role called `invite 25+`",
    "invite50": "Role ID For a role called `invite 50+`",
    "inviterewmsg": "Channel ID for channel where invite reward messages go when a user hits x invites",
    "commandlogs": "614980334492319764"
}
```

## Running the bot
After you followed everything above you can now do `node .` in the directory of the bot and it should start :)

## Users are permitted to
- add additional code as long as they do not redistribute.
- study the code and how the code is built for educational purposes.
- reverse engineer the code in any way they want as long as they do not distribute the fragmented code.
- take snippets of the code to use as long as they give due credit.

## Authors

* **danielpmc** - *Main Dev*
* **Vexcon1** - *Dev*

See also the list of [contributors](https://github.com/danbot-devs/DanBot-Advertising/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Misc
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6388d54032574f2a94e97589ed229648)](https://www.codacy.com/manual/danielpmc/DanBot-Advertising?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=danbot-devs/DanBot-Advertising&amp;utm_campaign=Badge_Grade)
