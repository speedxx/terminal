const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " +  bot.guilds.map(r => " **" + r.name + "** with " + r.memberCount + " members"))
}
module.exports.help = {
    name: "serverlist"
}
