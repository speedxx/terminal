module.exports.run = async (client, message, args) => {
  const user = args[0];
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to unban users.");
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to unban members.");
  if (!user) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + 'Please supply an ID for me to unban.').catch(console.error);
  if (user === message.author) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You cannot unban yourself.");  
  message.guild.unban(user);
  message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Unbanned ${user}.`)
  try{
    await client.users.get(user).send("**/" + message.author.username + "/DM** \n  " + "You have been unbanned from " + message.guild + ", by admin name: " + message.author)
     }catch(e){
       console.log(e.stack);
       return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Failed to send DM.`)
     }
}
module.exports.help = {
    name: "unban"
}