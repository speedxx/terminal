const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args, client) => {
    if (message.author.id !== "372078453236957185")
    if (message.author.id !== "365274392680333329") return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You are not a Terminal developer.")
    try {
message.channel.send("**/" + message.guild + "/" + message.channel.name + "/ \n  " + '**Restarting...').then(message => bot.destroy())
    .then(() => {
    	client.commands = new Discord.Collection();
        fs.readdir("./commands/", (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");

        if (jsfiles.length <= 0) return console.log("No commands to restart.");

        console.log(`loading ${jsfiles.length} commands...`);
        jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`The command ${f} has loaded.`);
        client.commands.set(props.help.name, props);
            	bot.login(config.token)

  });
});
    })
} catch (e) {
    mesage.channel.send(`${client.clean(err)}`)
  }
}
module.exports.help = {
    name: "restart"
}
