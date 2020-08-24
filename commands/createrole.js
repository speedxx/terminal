const Discord = require("discord.js");
const fs = require("fs")

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to add roles.");

  if (!message.guild.me.hasPermission("MANAGE_ROLES"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to manage roles.");

  if (args.length < 1)
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "Please supply a name for the role.")

  let role = args.join(' ')
  var guild = message.guild;
  await guild.roles.create({
    data: {
      name: role
  }})

  message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "**" + role + "**" + " has been created")

  let logs = JSON.parse(fs.readFileSync("./json/logs.json", "utf8"));
  if (!logs[message.guild.id]) {
    logs[message.guild.id] = {
      toggle: 0
    };
  }
  if (logs[message.guild.id].toggle === 1) {
    const logchannel = message.guild.channels.cache.find(channel => channel.name === "terminal-logs");
    let eventembed = new Discord.MessageEmbed()
      .setColor(0x00ff00)
      .setTitle("Role Creation Event:")
      .addField("Admin:", message.author.username)
      .addField("Role Name:", role)
      .setTimestamp()
    logchannel.send(eventembed);
  }
}
module.exports.help = {
  name: "createrole"
}