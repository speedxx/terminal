const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args, client) => {
    if (args.includes("@everyone")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error**');
    if (args.includes("@here")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error** ');
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to kick this user.");
    let tokick = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (tokick.hasPermission("KICK_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "The user you are trying to mute is either the same, or higher ranking than you.");
    if (!tokick) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Couldn't find user.");
    var member = message.mentions.members.first();
    let user = message.mentions.users.first();
    if (message.content.includes(" -s")) {
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Silenced the kick.")
        } else {
            try{
                await user.send("**/" + message.author.username + "/DM** \n  " + "You have been kicked from " + message.guild + ", by admin name: " + message.author + ", for the reason of: " + args.splice(1).join(' '))
                 }catch(e){
                   console.log(e.stack);
                   return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Failed to send DM.`)
                 }
        }
    member.kick().then((member) => {
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " " + member.displayName + " has been kicked by " + message.author.username);
    })
}

module.exports.help = {
    name: "kick",
}
