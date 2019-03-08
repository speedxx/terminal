const Discord = require("discord.js");

module.exports.run = async (client, message) => {
    message.channel.createInvite().then(invite => message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + invite.url))
};
module.exports.help = {
   name: "serverinvite"
};