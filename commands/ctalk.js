const Discord = require("discord.js");

module.exports.run = (client, message, args, ) => {
    let toptext = args.splice(1).join(' ')
    let channelid = args[0]

    if (message.author.id !== "372078453236957185")
    if (message.author.id !== "147765181903011840")
    if (message.author.id !== "365274392680333329")
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You are not a Terminal developer.")

    if (args.length < 1)
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Supply a channel ID.");

    if (toptext.length < 1)
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Supply a **valid** channel ID");

    client.channels.get(channelid).send(toptext)
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Sent " + "'" + toptext + "'" + " to " + channelid);
}
module.exports.help = {
    name: "ctalk"
}
