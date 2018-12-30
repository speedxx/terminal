const Discord = require("discord.js");
module.exports.run = async (client, msg, args) => {
    
if (!msg.mentions.users.size) {
const embed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setAuthor(msg.author.tag)
    .setImage(msg.author.displayAvatarURL)
    return msg.channel.send(embed);
    }
let user = msg.mentions.users.first() || msg.author
    const dembed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setAuthor(user.tag)
    .setImage(user.displayAvatarURL)
    return msg.channel.send(dembed);
    }
module.exports.help = {
    name: "avatar"
}