const Discord = require("discord.js");

module.exports.run = async (client, message, args, ) => {
    if (message.author.id !== "372078453236957185")
    if (message.author.id !== "365274392680333329")
    if (message.author.id !== "147765181903011840")
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You are not a Terminal developer.")

    if (!args)
        return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Please state an image URL to change the bot's avatar.")

    let avatar = args[0]

    if (avatar === "reset") {
        client.user.setAvatar("https://cdn.discordapp.com/attachments/543555036509241365/562316671902154802/ezgif.com-gif-to-apng.png");
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Reset the bot's avatar.")
    }
    
    client.user.setAvatar(avatar);

}
module.exports.help = {
    name: "setavatar"
}