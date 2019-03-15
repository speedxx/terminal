const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to add roles.");
  if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("/" + message.guild + "/" + message.channel.name + "/" + "You do not have sufficient permissions to unvc ban members.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Couldn't find that user.");
  let role = "VC Banned"
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " The VC ban role doesn't exist. Please VC ban someone first before unmuting them.");

  if(!rMember.roles.has(gRole.id)) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ` That person isn't VC banned.`);
  await(rMember.removeRole(gRole.id));
  if (err) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Failed to unVC ban " + rMember + " for the reason: " + err)

  try{
    await message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ` UnVC banned ${rMember}.`)
  }catch(e){
  }
}
module.exports.help = {
    name: "unvcban"
}