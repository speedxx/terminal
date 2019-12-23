const fs = require("fs");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to create an autoreact channel.");
	let autoreact = JSON.parse(fs.readFileSync("./autoreact.json", "utf8"));
	if (!args[0]) {
		autoreact[message.guild.id] = {
			toggle: 0,
			emoji: 0,
			channel: 0
		};
		fs.writeFile("./autoreact.json", JSON.stringify(autoreact), (err) => {
			if (err) console.log(err);
		});
		message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "The channel autoreact has been turned off.");
	}

	if (args[0]) {
		if (args[1]) {
			autoreact[message.guild.id] = {
				toggle: 1,
				emoji: args[0],
				emoji2: args[1],
				channel: message.channel.id
			};
			fs.writeFile("./autoreact.json", JSON.stringify(autoreact), (err) => {
				if (err) console.log(err)
			});
			message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `The channel autoreact has been turned on.`);
		} else {
			autoreact[message.guild.id] = {
				toggle: 1,
				emoji: args[0],
				emoji2: 0,
				channel: message.channel.id
			};
			fs.writeFile("./autoreact.json", JSON.stringify(autoreact), (err) => {
				if (err) console.log(err)
			});
			message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `The channel autoreact has been turned on.`);
		}
	}
}
module.exports.help = {
	name: "autoreact"
}
