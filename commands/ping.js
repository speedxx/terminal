const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let pings = ["Loading...", "Waiting...", "Pinging...", "Doing a thing...", "Debugging...", "Shopping...", "Coding...", "Changing language...", "Doing nothing...", "Doing something...", "Doing things...", ":ok_hand:...", "Alright...", "Uh...", "404..."]
    var ping = pings[Math.floor(Math.random() * pings.length)];
    message.channel.send(ping).then((message) => {
        message.edit("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + `Pinged! // \`${Math.round(client.ws.ping)}ms\``);
    })
};

module.exports.help = {
    name: "ping"
};
