const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (args.includes("@everyone")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + 'Error.');
    if (args.includes("@here")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + 'Error.');
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to mute members.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to manage roles.");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Couldn't find user.");
    if (tomute === message.author) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You cannot mute yourself.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "The user you are trying to mute is either the same, or higher ranking than you.");
    let muterole = message.guild.roles.find(`name`, "Muted");

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    await (tomute.addRole(muterole.id));
    if (err) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Failed to mute " + tomute + " for the reason: " + err)
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `<@${tomute.id}> has been muted.`);

}

module.exports.help = {
    name: "permmute",
}