const fs = require("fs");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to lockdown a channel.");

	if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + " I do not have sufficient permissions to manage messages.");

	let lockdown = JSON.parse(fs.readFileSync("./lockdown.json", "utf8"));
	if (!args[0]) {
		lockdown[message.guild.id] = {
			lock: "none"
		};
		fs.writeFile("./lockdown.json", JSON.stringify(lockdown), (err) => {
			if (err) console.log(err);
		});
		return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Removed lockdown from all channels.");
	}

	if (args[0] = "lock") {
		lockdown[message.guild.id] = {
			lock: message.channel.id
		};
		fs.writeFile("./lockdown.json", JSON.stringify(lockdown), (err) => {
			if (err) console.log(err)
		});
		message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Locked down this channel.`);
		let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
		if (!logs[message.guild.id]) {
			logs[message.guild.id] = {
				toggle: 0
			};
		}
		if (logs[message.guild.id].toggle === 1) {
			const logchannel = message.guild.channels.find(channel => channel.name === "terminal-logs");
			let eventembed = new Discord.RichEmbed()
				.setColor(0xff0000)
				.setTitle("Lockdown Event:")
				.addField("Channel Locked:", message.channel)
				.addField("Admin:", message.author)
				.setTimestamp()
			logchannel.send(eventembed);
		}
	}
}
module.exports.help = {
	name: "lockdown"
}