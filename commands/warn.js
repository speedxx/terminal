const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
 if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("/" + message.guild + "/" + message.channel.name + "/" + "You do not have sufficient permissions to warn members.");
  if (args.length < 1) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please supply a reason.")
 if (!message.mentions.users.first()) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please supply a mention.")
let user = message.mentions.users.first();

  try{
    await user.send("**/" + message.author.username + "/DM** \n  " + "You have been warned in " + message.guild + ", by admin name: " + message.author + ", for the reason of: " + args.splice(1).join(' '))
let warnembed = new Discord.RichEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setAuthor('Warned: ' + message.mentions.users.first().username)
        .setTitle("Reason:")
        .setDescription(args.splice(1).join(' '))
        .addField("Warned by: ", message.author.username)
  return message.channel.send(warnembed)
  }catch(e){
    console.log(e.stack);
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Failed to send DM.`)
    return message.channel.send(message.mentions.users.first() + `, you have been warned by ` + message.author + ` for: ` + args.splice(1).join(' '))
  }


}
module.exports.help = {
    name: "warn",
}
