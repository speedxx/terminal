const Discord = require("discord.js");

module.exports.run = async (bot, message, args, discord) => {
    let noid = args[0]
    let reason = args.splice(1).join(' ');
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to ban users.");
    if(!member.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to ban members.");
    if (args.length < 1) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please supply an ID to ban.")
      bot.fetchUser(noid).then(id => {
        if (message.content.includes(" -u")) {
          let reasonuser = `${reason} (${message.author.username})`
          message.guild.member(id).ban(reasonuser).catch(err => {
            message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Failed to ban" + id)
            console.log(err)
          })
          
          message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " +  `Successfully banned ${id} for the reason: ` + reasonuser)
  } else {
    message.guild.member(id).ban(reason).catch(err => {
      message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Failed to ban" + id)
      console.log(err)
    })
    
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " +  `Successfully banned ${id} for the reason: ` + reason)

  }

      }).catch(() => {
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `${noid} isn't a real ID. Please enter a valid ID.`)
      })
  }
  module.exports.help = {
    name: "hackban"
}
  
  