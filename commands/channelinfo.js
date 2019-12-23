const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let channel = message.mentions.channels.first() || message.channel;
  let channelembed = new Discord.RichEmbed()
    .setTitle(`Channel Information for #${channel.name}`)
    .addField("NSFW?", channel.nsfw)
    .addField("Channel ID", channel.id)
    .addField("Channel type", channel.type)
    .addField("Channel description", channel.topic)
    .addField("Channel creation", channel.createdAt)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
  message.channel.send("**/" + message.guild + "/" + message.channel.name + "/**")
  return message.channel.send(channelembed);
}
module.exports.help = {
  name: "channelinfo"
}
