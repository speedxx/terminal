const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {
    let channel = message.channel
    let channelinfo = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setTitle("Channel Information for " + channel.name)
    .addField("NSFW?", channel.nsfw)
    .addField("Channel ID", channel.id)
    .addField("Channel type", channel.type)
    .addField("Channel description", channel.topic)
    .addField("Channel creation", channel.createdAt)
 message.channel.send("**/" + message.guild + "/" + message.channel.name + "/**")
 message.channel.send(channelinfo);
}
  module.exports.help = {
    name: "channelinfo"
}
