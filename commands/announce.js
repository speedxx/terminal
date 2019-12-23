const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let announceChannel = message.mentions.channels.first();

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to announce in a channel.");

    if (!args || args.length < 2) {
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please put an announcement channel and a message.")
    }

    let embedmsg = args.splice(1).join(' ');
    let announceembed = new Discord.RichEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setAuthor('Announcement from: ' + message.author.username)
        .setDescription(embedmsg);
    message.guild.channels.find(t => t.id == announceChannel.id).send("**/" + message.guild + "/" + message.channel.name + "/**")
    message.guild.channels.find(t => t.id == announceChannel.id).send(announceembed);
}
module.exports.help = {
    name: "announce"
}
