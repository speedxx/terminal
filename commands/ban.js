const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (args.includes("@everyone")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error**');
    if (args.includes("@here")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error** ');
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to ban users.");
    let user = message.mentions.users.first();
    if (!user) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " Please mention a user to ban.");

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