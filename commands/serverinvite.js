module.exports.run = async (client, message, args) => {
    message.channel.createInvite().then(invite => message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + invite.url))
};
module.exports.help = {
    name: "serverinvite"
};