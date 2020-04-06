const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to create an image embed.");

    if (!args[0] || args[0].length < 1)
        return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "Please put an Image URL to turn into an embed.")

    let imageembed = new Discord.MessageEmbed()
        .setAuthor(`Image embed.`)
        .setImage(args[0])
        .setColor('RANDOM')
    message.channel.send(imageembed)
}
module.exports.help = {
    name: "image"
}
