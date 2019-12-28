const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to create a reactrole.");

  if (!message.guild.me.hasPermission("MANAGE_ROLES"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to manage roles.");

  let messageargs = args[0]
  if (args.includes("off")) {
    let reactrole = JSON.parse(fs.readFileSync("./react.json", "utf8"));
    reactrole[message.guild.id] = {
      messageID: 0,
      role: 0
    };
    fs.writeFile("./react.json", JSON.stringify(reactrole), (err) => {
      if (err) console.log(err)
    });
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n " + "Removed all react roles.")
  }

  if (!messageargs)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n " + "  Please state a message ID.");

  let role = args.splice(1).join(" ");
  let gRole = message.guild.roles.find(`name`, role);

  if (!role)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Please supply a role");

  if (!gRole)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " That role doesn't exist, if it does exist: check your spelling");

  let reactrole = JSON.parse(fs.readFileSync("./react.json", "utf8"));
  reactrole[message.guild.id] = {
    messageID: messageargs,
    role: gRole
  };
  fs.writeFile("./react.json", JSON.stringify(reactrole), (err) => {
    if (err) console.log(err)
  });

  let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
  if (!logs[message.guild.id]) {
    logs[message.guild.id] = {
      toggle: 0
    };
  }

  message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Created a reactrole on message ID: " + messageargs + ", giving the role: " + role)
  if (logs[message.guild.id].toggle === 1) {
    const logchannel = message.guild.channels.find(channel => channel.name === "terminal-logs");
    let eventembed = new Discord.RichEmbed()
      .setColor(0x00ff00)
      .setTitle("React Role Event:")
      .addField("Admin:", message.author)
      .addField("Role:", gRole)
      .addField("Message:", messageargs)
      .setTimestamp()
    logchannel.send(eventembed);
  }
}
module.exports.help = {
  name: "reactrole"
}