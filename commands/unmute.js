const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.channel.send("/" + message.guild + "/" + message.channel.name + "/" + "You do not have sufficient permissions to unmute members.");

  if (!message.guild.me.hasPermission("MANAGE_ROLES"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to add roles.");

  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if (!rMember)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Couldn't find that user.");

  if (rMember === message.author)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You cannot unmute yourself.");

  let role = "Muted"
  let gRole = message.guild.roles.find(`name`, role);

  if (!gRole)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " The muted role doesn't exist. Please mute someone first before unmuting them.");

  if (!rMember.roles.has(gRole.id))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ` That person isn't muted.`);

  await (rMember.removeRole(gRole.id));

  try {
    await message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ` Unmuted ${rMember}.`)
    let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
    if (!logs[message.guild.id]) {
      logs[message.guild.id] = {
        toggle: 0
      };
    }
    if (logs[message.guild.id].toggle === 1) {
      const logchannel = message.guild.channels.find(channel => channel.name === "terminal-logs");
      let eventembed = new Discord.RichEmbed()
        .setColor(0x00ff00)
        .setTitle("Unmute Event:")
        .addField("User Unmuted:", rMember)
        .addField("Admin:", message.author)
        .setTimestamp()
      logchannel.send(eventembed);
    }
  } catch (e) {
  }
}
module.exports.help = {
  name: "unmute"
}