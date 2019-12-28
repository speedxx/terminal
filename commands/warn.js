const Discord = require("discord.js");
const fs = require("fs")

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.channel.send("/" + message.guild + "/" + message.channel.name + "/" + "You do not have sufficient permissions to warn members.");

  if (args.length < 1)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please supply a reason.")

  if (!message.mentions.users.first())
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please supply a mention.")

  let user = message.mentions.users.first();

  if (user === message.author)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You cannot warn yourself.");

  let reason = args.splice(1).join(' ');

  try {
    await user.send("**/" + message.author.username + "/DM** \n  " + "You have been warned in " + message.guild + ", by admin name: " + message.author + ", for the reason of: " + args.splice(1).join(' '))
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Warned ` + user + ` for the reason of: ` + reason)
  } catch (e) {
    console.log(e.stack);
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Failed to send DM.`)
    message.channel.send(message.mentions.users.first() + `, you have been warned by ` + message.author + ` for: ` + reason)
  }

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
      .setTitle("Warn Event:")
      .addField("User Warned:", user)
      .addField("Admin:", message.author)
      .addField("Reason:", reason)
      .setTimestamp()
    logchannel.send(eventembed);
  }

}
module.exports.help = {
  name: "warn",
}