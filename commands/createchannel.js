const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to create channels.");
    let cc= args.join(' ');
    var server = message.guild;
    server.createChannel(cc);
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**"+ cc + "**" + " has been created")
}
module.exports.help = {
    name: "createchannel"
}