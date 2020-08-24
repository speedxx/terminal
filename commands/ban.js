const fs = require("fs");
const Discord = require("discord.js")
module.exports.run = async (bot, message, args) => {

  let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  let reason = args.splice(1).join(' ');

  if (args.includes("@everyone"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + ' **Error**');

  if (args.includes("@here"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + ' **Error** ');

  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to ban users.");

  if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to ban members.");

  if (!user)
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "Couldn't find user.");

  if (user.hasPermission("BAN_MEMBERS"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "The user you are trying to ban is either the same, or higher ranking than you.");

  if (user === message.author)
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "You cannot ban yourself.");

  if (!reason)
    reason = " Insufficient reason.";

  if (message.content.includes("-s")) {
    message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "Silenced the ban.")
  } else {
    try {
      await user.send("**/" + user.username + "/DM** \n  " + "You have been banned from " + message.guild.name + ", by admin name: " + message.author.username + ", for the reason of: " + reason)
    } catch (e) {
      console.log(e);
      message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + `Failed to send DM.`)
    }
  }

  if (message.content.includes("-u")) {
    let reasonuser = `${reason} (${message.author.username})`
    message.guild.member(user).ban(reasonuser);
    message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " Successfully banned user: " + user.username + ", for the reason: " + reasonuser)
    let logs = JSON.parse(fs.readFileSync("./json/logs.json", "utf8"));
    if (!logs[message.guild.id]) {
      logs[message.guild.id] = {
        toggle: 0
      };
    }

    if (logs[message.guild.id].toggle === 1) {
      const logchannel = message.guild.channels.cache.find(channel => channel.name === "terminal-logs");
      let eventembed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTitle("Ban Event:")
        .addField("User Banned:", user.username)
        .addField("Admin:", message.author.username)
        .addField("Reason:", reasonuser)
        .setTimestamp()
      logchannel.send(eventembed);
    }
  } else {
    message.guild.member(user).ban(reason);
    message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " Successfully banned user: " + user.username + ", for the reason: " + reason)
    let logs = JSON.parse(fs.readFileSync("./json/logs.json", "utf8"));
    if (!logs[message.guild.id]) {
      logs[message.guild.id] = {
        toggle: 0
      };
    }

    if (logs[message.guild.id].toggle === 1) {
      const logchannel = message.guild.channels.cache.find(channel => channel.name === "terminal-logs");
      let eventembed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTitle("Ban Event:")
        .addField("User Banned:", user.username)
        .addField("Admin:", message.author.username)
        .addField("Reason:", reason)
        .setTimestamp()
      logchannel.send(eventembed);
    }
  }
}
module.exports.help = {
  name: "ban"
}