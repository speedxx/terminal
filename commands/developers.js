const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "The developers of Terminal are: `square#1255`, `speed#3413`, and `fionn#0170`");
};

module.exports.help = {
    name: "developers"
};
