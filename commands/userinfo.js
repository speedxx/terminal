const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let userembed = new Discord.RichEmbed()
        .setTitle(`User Information for ${user.username}`)
        .setThumbnail(user.displayAvatarURL, true)
        .addField("Username", user.username, true)
        .addField("Discriminator", user.discriminator, true)
        .addField("ID", user.id, true)
        .addField("Bot?", user.bot, true)
        .addField("Presence", user.presence.status, true)
        .addField("Game", user.presence.game, true)
        .addField("Account Creation", user.createdAt, true)
        .addField("Last Message", user.lastMessage, true)
        .setColor(0x9e80e8);
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/**")
    return message.channel.send(userembed);
}
module.exports.help = {
    name: "userinfo"
};