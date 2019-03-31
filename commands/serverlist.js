const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
let guilds = bot.guilds.filter(g => g.memberCount > 100).map(r => "**" + r.name + "**" + " with " + r.memberCount + " members").join("\n");
message.channel.send("**/" + message.guild + "/" + message.channel.name + "/**" + "\n" + guilds)  
}
module.exports.help = {
    name: "serverlist"
}
