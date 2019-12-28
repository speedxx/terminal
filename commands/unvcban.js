const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  if (!message.guild.me.hasPermission("MANAGE_ROLES"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to add roles.");

  if (!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.channel.send("/" + message.guild + "/" + message.channel.name + "/" + "You do not have sufficient permissions to unvc ban members.");

  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if (!rMember)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Couldn't find that user.");

  let role = "VC Banned"
  let gRole = message.guild.roles.find(`name`, role);

  if (!gRole)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " The VC ban role doesn't exist. Please VC ban someone first before unmuting them.");

  if (!rMember.roles.has(gRole.id))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ` That person isn't VC banned.`);

  await (rMember.removeRole(gRole.id));

  try {
    await message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ` UnVC banned ${rMember}.`)
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
        .setTitle("UnVC Ban Event:")
        .addField("User UnVC banned:", rMember)
        .addField("Admin:", message.author)
        .setTimestamp()
      logchannel.send(eventembed);
    }
  } catch (e) {
  }
}
module.exports.help = {
  name: "unvcban"
}