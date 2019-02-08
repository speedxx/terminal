const Discord = require("discord.js");

module.exports.run = (bot, message, args, discord) => {
    let noid = args.join(' ');
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to ban users.");
    if (args.length < 1) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please supply an ID to ban.")
    try{
      await user.send("**/" + message.author.username + "/DM** \n  " + "You have been banned from " + message.guild + ", by admin name: " + message.author + ", for the reason of: " + args.splice(1).join(' '))
       }catch(e){
         console.log(e.stack);
         return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Failed to send DM.`)
       }
      bot.fetchUser(noid).then(id => {
        message.guild.ban(id).catch(err => {
          message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Failed to ban" + id)
          console.log(err)
        })
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " +  `Successfully banned ${id}.`)
      }).catch(() => {
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `${noid} isn't a real ID. Please enter a valid ID.`)
      })
  }
  module.exports.help = {
    name: "hackban"
}
  
  