const fs = require("fs");
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

	let gRole = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()

	if (args.includes("@everyone"))
		return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + ' **Error**');

	if (args.includes("@here"))
		return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + ' **Error** ');

	if (!message.member.hasPermission("MANAGE_ROLES"))
		return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to add an autorole.");

	if (!message.guild.me.hasPermission("MANAGE_ROLES"))
		return message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to manage roles.");

	let autorole = JSON.parse(fs.readFileSync("./json/autorole.json", "utf8"));

	if (!args[0]) {
		autorole[message.guild.id] = {
			role: 0
		};
		fs.writeFile("./json/autorole.json", JSON.stringify(autorole), (err) => {
			if (err) console.log(err);
		});
		message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + "The server autorole has been turned off.");
	}

	if (args[0]) {
		autorole[message.guild.id] = {
			role: gRole.id
		};
		fs.writeFile("./json/autorole.json", JSON.stringify(autorole), (err) => {
			if (err) console.log(err)
		});
		message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/** \n  " + `The server autorole has been set to **${gRole.name}**`);
		let logs = JSON.parse(fs.readFileSync("./json/logs.json", "utf8"));
		if (!logs[message.guild.id]) {
			logs[message.guild.id] = {
				toggle: 0
			};
		}
		if (logs[message.guild.id].toggle === 1) {
			const logchannel = message.guild.channels.cache.find(channel => channel.name === "terminal-logs");
			let eventembed = new Discord.MessageEmbed()
				.setColor(0x00ff00)
				.setTitle("Role Event:")
				.addField("Auto Role:", gRole)
				.addField("Admin:", message.author.username)
				.setTimestamp()
			logchannel.send(eventembed);
		}
	}
}
module.exports.help = {
	name: "autorole"
}