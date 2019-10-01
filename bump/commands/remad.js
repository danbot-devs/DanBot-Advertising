exports.run = (client, message, msg) => {   
let args = msg.content.split(" ");
let num = Number(args[1]);
if (!isNaN(num)) {
  storageHeper.delad(msg.author.id, num - 1);
  msg.channel.send("Advertisement removed.");
} else {
  msg.channel.send("Error: Wrong number.");
}
}