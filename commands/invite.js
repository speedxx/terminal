module.exports.run = async (client, message, args) => {
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Sent you an invite link in your DMs.")
    message.author.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "https://discordapp.com/oauth2/authorize?&client_id=521023036812558356&scope=bot&permissions=8");
}
module.exports.help = {
    name: "invite"
};