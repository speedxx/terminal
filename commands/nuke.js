const fs = require("fs");
const Discord = require("discord.js")
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to nuke channels.");
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to manage channels.");

  if (args.includes("accept")) {
    let nukeChannel = message.mentions.channels.first();
    let server = message.guild
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Nuked the channel " + message.mentions.channels.first() + " successfully.")
    const channel = await server.createChannel(message.mentions.channels.first().name);
    channel.setParent(message.mentions.channels.first().parentID)
    message.guild.channels.find(t => t.id == nukeChannel.id).delete();
    let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
    if (!logs[message.guild.id]) {
      logs[message.guild.id] = {
        toggle: 0
      };
    }

    if (logs[message.guild.id].toggle === 1) {
      const logchannel = message.guild.channels.find(channel => channel.name === "terminal-logs");
      let eventembed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle("Channel Nuke Event:")
        .addField("Admin:", message.author)
        .setTimestamp()
      logchannel.send(eventembed);
    }
  } else {
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please add `accept` to the command to accept that this will delete the channel you have mentioned.")
  }
}
module.exports.help = {
  name: "nuke"
}