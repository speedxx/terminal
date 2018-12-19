const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.mentions.users.size) 
    try {
        const embed = new Discord.RichEmbed()
            .setColor(0x9e80e8)
            .setAuthor(message.author.tag)
            .setThumbnail(message.author.displayAvatarURL, true)
            .addField("Discriminator", message.author.discriminator, true)
            .addField("ID", message.author.id, true)
            .addField("Presence", message.author.presence.status, true)
            .addField("Account Creation", message.author.createdAt, true)
            message.channel.send("**/" + message.guild + "/" + message.channel.name + "/**")
            message.channel.send(embed)
        } catch (err) {
                }

    let user = message.mentions.users.first();
    let userembed = new Discord.RichEmbed()
        .setTitle(`User Information for ${user.username}`)
        .setThumbnail(user.displayAvatarURL, true)
        .addField("Username", user.username, true)
        .addField("Discriminator", user.discriminator, true)
        .addField("ID", user.id, true)
        .addField("Bot?", user.bot, true)
        .addField("Presence", user.presence.status, true)
        .addField("Account Creation", user.createdAt, true)
        .addField("Last Message", user.lastMessage, true)
        .setColor(0x9e80e8);  
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/**")
    message.channel.send(userembed);
}

module.exports.help = {
    name: "userinfo"
};
  
