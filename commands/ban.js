const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (args.includes("@everyone")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error**');
    if (args.includes("@here")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error** ');
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to ban users.");
    if(!member.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to ban members.");
    let user = message.mentions.users.first();
    if (!user) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Couldn't find user.");   
    if(!user.bannable) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "I do not have sufficient permissions to ban this user.");   
    if (user.hasPermission("BAN_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "The user you are trying to ban is either the same, or higher ranking than you.");

    let reason = args.splice(1).join(' ');
    if (!reason) reason = " Insufficient reason.";
    if (message.content.includes(" -s")) {
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Silenced the ban.")
        } else {
            try{
                await user.send("**/" + message.author.username + "/DM** \n  " + "You have been banned from " + message.guild + ", by admin name: " + message.author + ", for the reason of: " + reason)
                 }catch(e){
                   console.log(e.stack);
                   message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Failed to send DM.`)
                 }
        }

         if (message.content.includes(" -u")) {
            let reasonuser = `${reason} (${message.author.username})`
            message.guild.member(user).ban(reasonuser); 
            message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Successfully banned user: " + user + ", for the reason: " + reasonuser)
    } else {
        message.guild.member(user).ban(reason); 
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Successfully banned user: " + user + ", for the reason: " + reason)

    }

}
module.exports.help = {
    name: "ban"
}