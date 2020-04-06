const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || message.author
    
    let dembed = new Discord.MessageEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setAuthor(user.tag)
        .setImage(user.displayAvatarURL())
    message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/**")
    return message.channel.send(dembed);
}
module.exports.help = {
    name: "avatar"
}
