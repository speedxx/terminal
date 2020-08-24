const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let online = message.guild.members.cache.filter(member => member.user.presence.status !== 'offline');
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
  let sicon = message.guild.iconURL();

  let serverembed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, sicon)
    .setFooter(`Server Created • ${day}.${month}.${year}`)
    .setColor("#7289DA")
    .setThumbnail(sicon)
    .addField("ID", message.guild.id, true)
    .addField("Name", message.guild.name, true)
    .addField("Owner", message.guild.owner.user.tag, true)
    .addField("Region", message.guild.region, true)
    .addField("Channels", message.guild.channels.cache.size, true)
    .addField("Members", message.guild.memberCount, true)
    .addField("Humans", message.guild.memberCount - message.guild.members.cache.filter(m => m.user.bot).size, true)
    .addField("Bots", message.guild.members.cache.filter(m => m.user.bot).size, true)
    .addField("Online", online.size, true)
    .addField("Roles", message.guild.roles.cache.size, true);
  message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/**")
  message.channel.send(serverembed);
}
module.exports.help = {
  name: "serverinfo"
}