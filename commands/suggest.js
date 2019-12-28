module.exports.run = async (client, message, args) => {
    if (args.length < 1)
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "What would you like to suggest?")

    let suggestion = args.join(' ');

    client.users.get("365274392680333329").send("Suggestion from " + "**" + message.author.tag + " (" + message.author.id + ")**:" + ` ${suggestion}`);
    client.users.get("147765181903011840").send("Suggestion from " + "**" + message.author.tag + " (" + message.author.id + ")**:" + ` ${suggestion}`);
    client.users.get("372078453236957185").send("Suggestion from " + "**" + message.author.tag + " (" + message.author.id + ")**" + ` ${suggestion}`);
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Sent your suggestion to the bot developers")
}
module.exports.help = {
    name: "suggest"
}