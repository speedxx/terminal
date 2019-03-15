const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to blind members.");
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to manage roles.");
    if (args.includes("@everyone")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + 'Error.');
    if (args.includes("@here")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + 'Error.');
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Couldn't find user.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "The user you are trying to blind is either the same, or higher ranking than you.");
    let muterole = message.guild.roles.find(`name`, "Blinded");

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Blinded",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    VIEW_CHANNEL: false,
                    SEND_MESSAGES: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    
    await (tomute.addRole(muterole.id));
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `<@${tomute.id}> has been blinded.`);
}

module.exports.help = {
    name: "permblind",
}