const fs = require("fs");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to watch a channel.");

	let watch = JSON.parse(fs.readFileSync("./watch.json", "utf8"));

	if (!args[0]) {
		watch[message.guild.id] = {
			toggle: 0
		};
		fs.writeFile("./watch.json", JSON.stringify(watch), (err) => {
			if (err) console.log(err);
		});

		message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Ended all watch sessions.");
		if (message.guild.channels.exists('name', 'terminal-logs')) {
			const byeworld = message.guild.channels.find(channel => channel.name === "terminal-logs");
			byeworld.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `No longer watching a channel`)
		}
	}

	if (args[0]) {
		if (message.guild.channels.exists('name', 'terminal-logs')) {
			watch[message.guild.id] = {
				toggle: args[0]
			};
			fs.writeFile("./watch.json", JSON.stringify(watch), (err) => {
				if (err) console.log(err)
			});
			message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Turned on the watch feature for the channel id: ` + args[0]);
			const helloworld = message.guild.channels.find(channel => channel.name === "terminal-logs");
			helloworld.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Now watching the channel id: ` + args[0])
		} else {
			message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Please create a channel named **terminal-logs**.`)
		}
	}

}
module.exports.help = {
	name: "watch"
}