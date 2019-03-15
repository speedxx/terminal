const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let remindtime = args[0];
    if (!remindtime) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please specify a time.");
    if (!args[1]) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please specify a message.");

    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `A timer has been set for ${ms(ms(remindtime))}`);

    setTimeout(function() {
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `**Reminder from ` + remindtime +` ago**: ` + args.splice(1).join(" "));
    }, ms(remindtime));

}

module.exports.help = {
    name: "remind",
}