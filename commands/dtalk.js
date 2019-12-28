const Discord = require("discord.js");

module.exports.run = (client, message, args, ) => {
    if (message.author.id !== "372078453236957185")
    if (message.author.id !== "147765181903011840")
    if (message.author.id !== "365274392680333329")
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You are not a Terminal developer.")

    if (args.length < 1)
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Supply a user ID.");

    let southtext = args.splice(1).join(' ')
    let user = args[0]
    if (southtext.length < 1) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Supply a ***valid*** user ID.");
    client.users.get(user).send("A Bot Developer in " + "**" + message.guild + "**" + "(" + "**" + message.author + "**" + ")" + " has messaged you: " + southtext);
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Sent " + "'" + southtext + "'" + " to " + user);
}
module.exports.help = {
    name: "dtalk"
}