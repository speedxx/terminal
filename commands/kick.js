const fs = require("fs");
const Discord = require("discord.js")
const ms = require("ms");

module.exports.run = async (bot, message, args, client) => {
  if (args.includes("@everyone"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error**');

  if (args.includes("@here"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error** ');

  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to kick this user.");

  if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to kick members.");

  let tokick = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if (!tokick)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Couldn't find user.");

  if (tokick === message.author)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You cannot kick yourself.");

  if (tokick.hasPermission("KICK_MEMBERS"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "The user you are trying to kick is either the same, or higher ranking than you.");
  var member = message.mentions.members.first();
  let user = message.mentions.users.first();
  let reason = args.splice(1).join(' ')
  if (message.content.includes(" -s")) {
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Silenced the kick.")
  } else {
    try {
      await user.send("**/" + message.author.username + "/DM** \n  " + "You have been kicked from " + message.guild + ", by admin name: " + message.author + ", for the reason of: " + args.splice(1).join(' '))
    } catch (e) {
      console.log(e.stack);
      return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Failed to send DM.`)
    }
  }
  member.kick().then((member) => {
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " " + member.displayName + " has been kicked by " + message.author.username);
    let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
    if (!logs[message.guild.id]) {
      logs[message.guild.id] = {
        toggle: 0
      };
    }
    if (logs[message.guild.id].toggle === 1) {
      const logchannel = message.guild.channels.find(channel => channel.name === "terminal-logs");
      let eventembed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle("Kick Event:")
        .addField("User Kicked:", tokick)
        .addField("Admin:", message.author)
        .addField("Reason:", reason)
        .setTimestamp()
      logchannel.send(eventembed);
    }
  })
}

module.exports.help = {
  name: "kick",
}