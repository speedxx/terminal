const fs = require("fs");
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to unban users.");

  if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to unban members.");

  let user = args[0];

  if (!user)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + 'Please supply an ID for me to unban.').catch(console.error);

  if (user === message.author)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You cannot unban yourself.");

  message.guild.unban(user);
  message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Unbanned ${user}.`)
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
      .setTitle("Unban Event:")
      .addField("User Unbanned:", user)
      .addField("Admin:", message.author)
      .setTimestamp()
    logchannel.send(eventembed);
  }
  try {
    await client.users.get(user).send("**/" + message.author.username + "/DM** \n  " + "You have been unbanned from " + message.guild + ", by admin name: " + message.author)
  } catch (e) {
    console.log(e.stack);
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Failed to send DM.`)
  }
}
module.exports.help = {
  name: "unban"
}