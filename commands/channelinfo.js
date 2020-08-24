const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let channel = message.mentions.channels.first() || message.channel;
  let channelembed = new Discord.MessageEmbed()
    .setTitle(`Channel Information for #${channel.name}`)
    .addField("NSFW?", channel.nsfw)
    .addField("Channel ID", channel.id)
    .addField("Channel Type", channel.type)
    .addField("Channel Description", channel.topic ? null : "None")
    .addField("Channel Creation", channel.createdAt)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
  message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/**")
  return message.channel.send(channelembed);
}
module.exports.help = {
  name: "channelinfo"
}
