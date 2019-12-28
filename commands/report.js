const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!args || args.length < 1)
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please put a report to put in a ticket. It should include: \n A mention, what they did, time, extra details.")

    if (!message.mentions.users.first())
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please mention the rulebreaker.")

    let reportchannel = "terminal-reports"
    if (message.guild.channels.exists('name', reportchannel)) {
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Your report has been sent to the reports channel.")
        let logreport = message.guild.channels.find(channel => channel.name === "terminal-reports");
        let reportmsg = args.splice(1).join(' ');
        let rembed = new Discord.RichEmbed()
            .setAuthor(`Administrator Ticket:`)
            .setDescription(reportmsg)
            .setFooter("Report for user: " + message.mentions.users.first().username + ", from: " + message.author.username)
            .setColor('RANDOM')
        logreport.send(rembed);
    } else {
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "There is no `terminal-reports` channel, the report has been sent here.")
        let reportmsg = args.splice(1).join(' ');
        let report = new Discord.RichEmbed()
            .setAuthor(`Administrator Ticket:`)
            .setDescription(reportmsg)
            .setFooter("Report for user: " + message.mentions.users.first().username + ", from: " + message.author.username)
            .setColor('RANDOM')
        message.delete()
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/**")
        message.channel.send(report)
    }

}
module.exports.help = {
    name: "report"
}