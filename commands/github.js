module.exports.run = async (client, message, args) => {
    message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "https://squaregithub.github.io/terminal/");
}
module.exports.help = {
    name: "github"
};