module.exports.run = (client, message, args, ops) => {
    if (message.author.id !== "372078453236957185")
        if (message.author.id !== "365274392680333329")
            if (message.author.id !== "147765181903011840")
                return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "You are not a Terminal developer.")

    if (args.length < 1)
        return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "Please supply a server ID.")

    client.guilds.cache.get(args.join(" ")).leave()
        .then(g => message.channel.send(("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + `Left ${g.name} successfully`)).catch(console.error));
}
module.exports.help = {
    name: "gleave"
}