module.exports = (client, member, guild) => {
    client.channels.get("614980234747576341").send(`Welcome <@${member.user.id}> to DanBot Advertising. Make sure to read <#614980230318391329> for the rules!`)
      const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');


    let fontSize = 70;

    do {
        ctx.font = `${fontSize -= 10}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
};

const Canvas = require('canvas');
const canvas = Canvas.createCanvas(700, 300);
    const ctx = canvas.getContext('2d');
   const background = await Canvas.loadImage('https://i.imgur.com/Gl4lfft.png'); 
    // For setting up the image if you are using glitch you must put the image under in assets and use the link of that image in glitch! Otherwise you a link like so!
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '35px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to the server,', canvas.width / 2.8, canvas.height / 3.9);
//ctx.fillText(`${guild.name}`, canvas.width / 2.5, canvas.height / 2.5);
    // Add an exclamation point here and below
    ctx.font = applyText(canvas, `${member.user.username}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.user.username}!`, canvas.width / 2.5, canvas.height / 1.9);
    
    ctx.font = '29px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`We Hope you enjoy your stay :)`, canvas.width / 3.0, canvas.height / 1.3);

    ctx.beginPath();
    ctx.arc(125, 145, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
	ctx.drawImage(avatar, 25, 45, 200, 200);

    
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

client.channels.get("614980234747576341").send(attachment);

}
