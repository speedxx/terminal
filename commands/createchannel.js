const Discord = require("discord.js");
const fs = require("fs")

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to create channels.");

  if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to manage channels.");

  if (args.length < 1)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please supply a name for the channel.")

  let cc = args.join(' ');
  let server = message.guild;
  server.createChannel(cc, "text");
  message.channel.send("**/" + server + "/" + server.name + "/** \n  " + "**" + cc + "**" + " has been created")
  let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
  if (!logs[message.guild.id]) {
    logs[message.guild.id] = {
      toggle: 0
    };
  }
  if (logs[message.guild.id].toggle === 1) {
    const logchannel = message.guild.channels.find(channel => channel.name === "terminal-logs");
    let eventembed = new Discord.RichEmbed()
      .setColor(0x00ff00)
      .setTitle("Channel Event:")
      .addField("Channel Added:", cc)
      .addField("Admin:", message.author)
      .setTimestamp()
    logchannel.send(eventembed);
  }
}
module.exports.help = {
  name: "createchannel"
}
