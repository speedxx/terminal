const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "The current host is: **host**")
    }
module.exports.help = {
    name: "host"
}
