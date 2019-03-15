const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args, client) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " You do not have sufficient permissions to blind members.");
    if (args.includes("@everyone")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + 'Error.');
    if (args.includes("@here")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + 'Error.');
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to add roles.");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Couldn't find user.");
    if (tomute === message.author) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You cannot blind yourself.");
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

    let mutetime = args[1];
    if (!mutetime) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please specify a time.");

    await (tomute.addRole(muterole.id));
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `<@${tomute.id}> has been blinded for ${ms(ms(mutetime))}`);

    setTimeout(function() {
        if(!tomute.roles.has(muterole.id)) return 
        tomute.removeRole(muterole.id);
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `<@${tomute.id}> has been unblinded.`);
    }, ms(mutetime));

}

module.exports.help = {
    name: "blind",
}