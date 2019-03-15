const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (args.includes("@everyone")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error**');
    if (args.includes("@here")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error** ');
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to softban this user.");
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to ban members.");
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Couldn't find user."); 
    if (user === message.author) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You cannot ban yourself.");  
    if (user.hasPermission("BAN_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "The user you are trying to softban is either the same, or higher ranking than you.");

    let reason = args.splice(1).join(" ");
    if (!reason) reason = " Insufficient reason.";
    if (message.content.includes(" -s")) {
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Silenced the softban.")
        } else {
            try{
                await user.send("**/" + message.author.username + "/DM** \n  " + "You have been softbanned from " + message.guild + ", by admin name: " + message.author + ", for the reason of: " + args.splice(1).join(' '))
                 }catch(e){
                   console.log(e.stack);
                   return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Failed to send DM.`)
                 }
        }

         if (message.content.includes(" -u")) {
            let reasonuser = `${reason} (${message.author.username})`
            message.guild.member(user).ban(reasonuser); 
            message.guild.unban(user);
            message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Successfully softbanned user: " + user + ", for the reason: " + reasonuser)
            
    } else {
        message.guild.member(user).ban(reason); 
        message.guild.unban(user);
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Successfully softbanned user: " + user + ", for the reason: " + reason)

    }
}
module.exports.help = {
    name: "softban"
}