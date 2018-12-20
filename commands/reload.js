const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
if (!args[0] || args[0].length < 0) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please supply a command name.");
let reloadCommand = args[0]
client.commands = new Discord.Collection();
fs.readdir("../commands/", (err, files) => {

  console.log("Loading command: " + reloadCommand);
    let props = require(`../commands/${reloadCommand}`);
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " The command has loaded.");
    client.commands.set(props.help.name, props);
})
}
  module.exports.help = {
    name: "reload"
}
