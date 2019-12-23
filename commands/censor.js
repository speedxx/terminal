const fs = require("fs");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to add censorship on words.");

	if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to delete messages.");

	let censor = JSON.parse(fs.readFileSync("./censor.json", "utf8"));
	if (!args[0]) {
		censor[message.guild.id] = {
			toggle: 0
		};
		fs.writeFile("./censor.json", JSON.stringify(censor), (err) => {
			if (err) console.log(err);
		});
		message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Cleared all censorship of words.");
	}

	if (args[0]) {
		censor[message.guild.id] = {
			toggle: 1
		};
		fs.writeFile("./censor.json", JSON.stringify(censor), (err) => {
			if (err) console.log(err)
		});
		message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Censored all ethnic slurs.`);
	}
}
module.exports.help = {
	name: "censor"
}
