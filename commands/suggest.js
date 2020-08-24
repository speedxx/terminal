module.exports.run = async (client, message, args) => {
    if (args.length < 1)
        return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "What would you like to suggest?")

    let suggestion = args.join(' ');

    client.users.cache.get("365274392680333329").send("Suggestion from " + "**" + message.author.tag + " (" + message.author.id + ")**:" + ` ${suggestion}`);
    client.users.cache.get("147765181903011840").send("Suggestion from " + "**" + message.author.tag + " (" + message.author.id + ")**:" + ` ${suggestion}`);
    client.users.cache.get("372078453236957185").send("Suggestion from " + "**" + message.author.tag + " (" + message.author.id + ")**" + ` ${suggestion}`);
    message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "Your suggestion has been sent to the bot developers. **Please note abusing this feature will get you blacklisted.**")
}
module.exports.help = {
    name: "suggest"
}