const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "The developers of Terminal are: `square#1255`, `speed#3413`, and `fionn#5126`");
};

module.exports.help = {
    name: "developers"
};