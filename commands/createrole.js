const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to create roles.");
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to manage roles.");
    if (args.length < 1) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please supply a name for the role.")
    let role = args.join(' ')
    var guild = message.guild;
    await guild.createRole({
        name: role
      })
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**"+ role + "**" + " has been created")
}
module.exports.help = {
    name: "createrole"
}