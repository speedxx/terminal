const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to nuke channels.");
    if(!member.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to manage channels.");
    if (args.includes("accept")) {
        let nukeChannel = message.mentions.channels.first();
        let server = message.guild
    server.createChannel(message.mentions.channels.first().name);
    message.guild.channels.find(t => t.id == nukeChannel.id).delete();
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Nuked the channel " + message.mentions.channels.first() + " successfully.")
} else {
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please add `accept` to the command to accept that this will delete the channel you have mentioned.")
}
}
module.exports.help = {
    name: "nuke"
}
