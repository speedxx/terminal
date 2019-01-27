const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
  if (message.author.id !== "372078453236957185")
  if (message.author.id !== "508352711507443712")
  if (message.author.id !== "365274392680333329") return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You are not a Terminal developer.")

client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  if (jsfiles.length <= 0) return console.log("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "No commands to load.");

  message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  ")
  message.channel.send(`Loading ${jsfiles.length} commands...`);
  jsfiles.forEach((f, i) => {
    let props = require(`../commands/${f}`);
    console.log(`The command ${f} has loaded.`);
    client.commands.set(props.help.name, props);
})
    console.log(`Manual restart successful.`)
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Loaded all commands.")
})}
  module.exports.help = {
    name: "reload"
}
