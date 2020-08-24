const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs")

module.exports.run = async (bot, message, args, client) => {
  let toblind = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  let blindrole = message.guild.roles.cache.find(r => r.name == "Blinded");

  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to blind members.");

  if (args.includes("@everyone"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + 'Error.');

  if (args.includes("@here"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + 'Error.');

  if (!message.guild.me.hasPermission("MANAGE_ROLES"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to add roles.");

  if (!toblind)
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "Couldn't find user.");

  if (toblind === message.author)
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "You cannot blind yourself.");

  if (toblind.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "The user you are trying to blind is either the same, or higher ranking than you.");

  if (!blindrole) {
    try {
      blindrole = await message.guild.roles.create({
        data: {
          name: "Blinded",
          color: "#000000",
          permissions: []
      }})
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(blindrole, {
          VIEW_CHANNEL: false,
          SEND_MESSAGES: false,
          READ_MESSAGE_HISTORY: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }

  let blindtime = args[1];
  if (!blindtime)
    return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "Please specify a time.");

  await (toblind.roles.add(blindrole.id));
  message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + `<@${toblind.id}> has been blinded for ${ms(ms(blindtime))}`);
  let logs = JSON.parse(fs.readFileSync("./json/logs.json", "utf8"));
  if (!logs[message.guild.id]) {
    logs[message.guild.id] = {
      toggle: 0
    };
  }
  if (logs[message.guild.id].toggle === 1) {
    const logchannel = message.guild.channels.cache.find(channel => channel.name === "terminal-logs");
    let eventembed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle("Blind Event:")
      .addField("User Blinded:", toblind.username)
      .addField("Time:", blindtime)
      .addField("Admin:", message.author.username)
      .setTimestamp()
    logchannel.send(eventembed);
  }

  setTimeout(function () {
    if (!toblind.roles.cache.has(blindrole.id)) return
    toblind.roles.remove(blindrole.id);
    message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + `<@${toblind.id}> has been unblinded.`);
    let logs = JSON.parse(fs.readFileSync("./json/logs.json", "utf8"));
    if (!logs[message.guild.id]) {
      logs[message.guild.id] = {
        toggle: 0
      };
    }
    if (logs[message.guild.id].toggle === 1) {
      const logchannel = message.guild.channels.cache.find(channel => channel.name === "terminal-logs");
      let eventembed = new Discord.RichEmbed()
        .setColor(0x00ff00)
        .setTitle("Unblind Event:")
        .addField("User Unblinded:", toblind.username)
        .addField("Admin:", message.author.username)
        .setTimestamp()
      logchannel.send(eventembed);
    }
  }, ms(blindtime));
}

module.exports.help = {
  name: "blind",
}