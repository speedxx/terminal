const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args, client) => {
    if (message.author.id !== "372078453236957185")
    if (message.author.id !== "147765181903011840")
    if (message.author.id !== "365274392680333329")
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You are not a Terminal developer.")
    try {
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/ \n  " + '**Restarting...').then(message => bot.destroy())
            .then(() => bot.login(config.token))
    } catch (e) {
        message.channel.send(`${client.clean(err)}`)
    }
}
module.exports.help = {
    name: "restart"
}