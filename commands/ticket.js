const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!args || args.length < 1)
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please put in an issue to put in a ticket.")

    let reportchannel = "terminal-reports"

    if (message.guild.channels.exists('name', reportchannel)) {
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Your report has been sent to the reports channel.")
        const logreport = message.guild.channels.find(channel => channel.name === "terminal-reports");
        let reportmsg = args.join(' ');
        let rembed = new Discord.RichEmbed()
            .setAuthor(`Support Ticket:`)
            .setDescription(reportmsg)
            .setFooter("From: " + message.author.username)
            .setColor('RANDOM')
        logreport.send(rembed);
    } else {
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "There is no `terminal-reports` channel, the ticket has been sent here.")
        let reportmsg = args.join(' ');
        let report = new Discord.RichEmbed()
            .setAuthor(`Support Ticket:`)
            .setDescription(reportmsg)
            .setFooter("From: " + message.author.username)
            .setColor('RANDOM')
        message.delete()
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/**")
        message.channel.send(report)
    }

}
module.exports.help = {
    name: "ticket"
}