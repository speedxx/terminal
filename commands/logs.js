const fs = require("fs");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to toggle the log channel.");

	let log = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
	if (!args[0]) {
		log[message.guild.id] = {
			toggle: 0
		};
		fs.writeFile("./logs.json", JSON.stringify(log), (err) => {
			if (err) console.log(err);
		});
		message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "The server log channel has been turned off.");
	}

	if (args[0]) {
		if (message.guild.channels.exists('name', 'terminal-logs')) {
			log[message.guild.id] = {
				toggle: 1
			};
			fs.writeFile("./logs.json", JSON.stringify(log), (err) => {
				if (err) console.log(err)
			});
			message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `The server log channel has been turned on.`);
			const helloworld = message.guild.channels.find(channel => channel.name === "terminal-logs");
			helloworld.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Hello world!`)
		} else {
			message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Please create a channel named **terminal-logs**.`)
		}
	}

}
module.exports.help = {
	name: "logs"
}