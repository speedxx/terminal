const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (args.includes("@everyone"))
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error**');

    if (args.includes("@here"))
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + ' **Error** ');

    if (args.length < 1)
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please supply a role name.")

    let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(r => r.name.toLowerCase() == args.join(' ').toLocaleLowerCase());

    if (!role)
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " That role doesn't exist, if it does exist: check your spelling");

    let roleembed = new Discord.RichEmbed()
        .setAuthor("Role information for " + role.name)
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .addField("Role color", role.color)
        .addField("Mentionable?", role.mentionable)
        .addField("Role ID", role.id)
        .addField("Hex color", role.hexColor)
        .addField("Role creation", role.createdAt)
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/**")
    message.channel.send(roleembed);
}
module.exports.help = {
    name: "roleinfo"
}