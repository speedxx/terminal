const fs = require("fs");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You do not have sufficient permissions to whitelist a channel.");
	let whitelist = JSON.parse(fs.readFileSync("./whitelist.json", "utf8"));
	if (!args[0]) { 
		whitelist[message.guild.id] = {
			toggle: 0,
			channel: 0
		};
		fs.writeFile("./whitelist.json", JSON.stringify(whitelist), (err) => {
			if (err) console.log(err);
		});
		message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Unignored this channel.");
	}
	if (args[0].includes("commands")) { 
			if (message.guild.channels.exists('name', 'terminal-logs')) {
		whitelist[message.guild.id] = {
			toggle: 1,
			channel: message.channel.id
		};
		fs.writeFile("./whitelist.json", JSON.stringify(whitelist), (err) => {
			if (err) console.log(err)
		});
		message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Whitelisted this channel from **commands**.`);
		const helloworld = message.guild.channels.find(channel => channel.name === "terminal-logs");
		helloworld.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Ignored the channel: ` + message.channel)
		} else {
			message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Please create a channel named **terminal-logs**.`)
		}}
	if (args[0].includes("invites")) { 
		if (message.guild.channels.exists('name', 'terminal-logs')) {
	whitelist[message.guild.id] = {
		toggle: 2,
		channel: message.channel.id
	};
	fs.writeFile("./whitelist.json", JSON.stringify(whitelist), (err) => {
		if (err) console.log(err)
	});
	message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Whitelisted this channel from **invites**.`);
	const helloworld = message.guild.channels.find(channel => channel.name === "terminal-logs");
	helloworld.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Ignored the channel: ` + message.channel)
	} else {
		message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Please create a channel named **terminal-logs**.`)
	}}
	if (args[0].includes("both")) { 
		if (message.guild.channels.exists('name', 'terminal-logs')) {
	whitelist[message.guild.id] = {
		toggle: 3,
		channel: message.channel.id
	};
	fs.writeFile("./whitelist.json", JSON.stringify(whitelist), (err) => {
		if (err) console.log(err)
	});
	message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Whitelisted this channel from **invites and commands**.`);
	const helloworld = message.guild.channels.find(channel => channel.name === "terminal-logs");
	helloworld.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Ignored the channel: ` + message.channel)
	} else {
		message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Please create a channel named **terminal-logs**.`)
	}}
}
module.exports.help = {
    name: "whitelist"
}
