module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("CHANGE_NICKNAME"))
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/ \n**  " + "You do not have permissions to change my nickname.");

  if (args.includes("off")) {
    message.guild.members.get(bot.user.id).setNickname("terminal")
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/ **\n  " + "Removed nickname")
  }

  let nick = args.join(' ');
  message.guild.members.get(bot.user.id).setNickname(nick);
  return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/ \n**  " + "Changed nickname to " + "**" + nick + "**")
}
module.exports.help = {
  name: "nick"
}