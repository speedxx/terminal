const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
  let role = args.join(" ").slice(22);
  let gRole = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()

  if (args.includes("@everyone"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + ' **Error**');

  if (args.includes("@here"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + ' **Error** ');

  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to add roles.");

  if (!message.guild.me.hasPermission("MANAGE_ROLES"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to manage roles.");

  if (!rMember)
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n " + "  Couldn't find that user");

  if (!role)
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " Please supply a role");

  if (!gRole)
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " That role doesn't exist, if it does exist: check your spelling");

  if (rMember.roles.cache.has(gRole.id))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " This person already has that role.");

  await (rMember.roles.add(gRole.id));

  try {
    await message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + ` Added **${gRole.name}** to ${rMember}.`)
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
        .setTitle("Add Role Event:")
        .addField("User:", rMember)
        .addField("Admin:", message.author)
        .addField("Role:", gRole)
        .setTimestamp()
      logchannel.send(eventembed);
    }
  } catch (e) {
    console.log(e);
  }
}
module.exports.help = {
  name: "addrole"
}