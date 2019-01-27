const Discord = require("discord.js");

module.exports.run = (bot, message, args, discord) => {
    if (message.author.id !== "372078453236957185")
    if (message.author.id !== "508352711507443712")
    if (message.author.id !== "365274392680333329") return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You are not a Terminal developer.")
    if (message.author.bot) return;
    let bottomtext = args.join(' ')
    message.delete()
    message.channel.send(bottomtext);
}
module.exports.help = {
    name: "say"
};