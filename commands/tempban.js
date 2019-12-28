const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  if (args.includes("@everyone"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + 'Error.');

  if (args.includes("@here"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + 'Error.');

  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to tempban members.");

  if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to ban members.");

  let toban = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if (!toban)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Couldn't find user.");

  if (toban === message.author)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You cannot ban yourself.");

  if (toban.hasPermission("BAN_MEMBERS"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "The user you are trying to tempban is either the same, or higher ranking than you.");

  let bantime = args[1];

  if (!bantime)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please specify a time.");

  let reason = args.splice(1).join(' ');
  if (!reason) reason = " Insufficient reason.";
  if (message.content.includes(" -s")) {
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Silenced the tempban.")
  } else {
    try {
      await toban.send("**/" + message.author.username + "/DM** \n  " + "You have been tempbanned from " + message.guild + ", by admin name: " + message.author + `, duration: ${ms(ms(bantime))}, for the reason of: ` + reason)
    } catch (e) {
      console.log(e.stack);
      message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Failed to send DM.`)
    }
  }

  if (message.content.includes(" -u")) {
    let reasonuser = `${reason} (${message.author.username})`
    await (message.guild.member(toban).ban(reasonuser))
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `<@${toban.id}> has been tempbanned for ${ms(ms(bantime))}` + ", for the reason: " + reasonuser);
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
        .setTitle("Temp Ban Event:")
        .addField("User Banned:", toban)
        .addField("Admin:", message.author)
        .addField("Reason:", reason)
        .addField("Time:", bantime)
        .setTimestamp()
      logchannel.send(eventembed);
    }
  } else {
    await (message.guild.member(toban).ban(reason))
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `<@${toban.id}> has been tempbanned for ${ms(ms(bantime))}` + ", for the reason: " + reason);
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
        .setTitle("Temp Ban Event:")
        .addField("User Banned:", toban)
        .addField("Admin:", message.author)
        .addField("Reason:", reason)
        .addField("Time:", bantime)
        .setTimestamp()
      logchannel.send(eventembed);
    }

  }

  setTimeout(function () {

    message.guild.unban(toban);
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `<@${toban.id}> has been unbanned.`);
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
        .setTitle("Temp Unban Event:")
        .addField("User Unbanned:", user)
        .addField("Admin:", message.author)
        .setTimestamp()
      logchannel.send(eventembed);
    }
  }, ms(bantime));

}

module.exports.help = {
  name: "tempban",
}