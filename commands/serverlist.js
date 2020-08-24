module.exports.run = async (bot, message, args) => {

    if (message.author.id !== "372078453236957185")
        if (message.author.id !== "147765181903011840")
            if (message.author.id !== "365274392680333329")
                return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "You are not a Terminal developer.")

    let guilds = bot.guilds.cache.filter(g => g.memberCount > 100).map(r => "**" + r.name + "**" + " with " + r.memberCount + " members").join("\n");
    message.author.send("**/" + message.author.username + "/DM/**" + "\n" + guilds)
    message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/**" + "\n" + "Sent the server list to your DMs.");
}
module.exports.help = {
    name: "serverlist"
}