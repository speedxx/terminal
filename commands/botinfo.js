const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let bembed = new Discord.MessageEmbed()
	    .setTitle("Bot Information")
      .setColor(Math.floor(Math.random() * 16777214) + 1)
      .setThumbnail(bicon)
      .addField("Bot Member Size", bot.users.cache.size)
      .addField("Bot Guild Size", bot.guilds.cache.size)
      .addField("RAM Usage", `${((process.memoryUsage().heapUsed / 1024) / 1024).toFixed(2)} MB`)
      .addField("Created On", bot.user.createdAt)
      .addField("Owners", "square#1255, speed#3413, and fionn#5126")
      .addField("Discord Version", `v${Discord.version}`)
      .addField("Node Version", `${process.version}`);

    message.channel.send("**/" + message.guild.name + "/" + message.channel.name + "/**")  
    message.channel.send(bembed);
}

module.exports.help = {
  name:"botinfo"
}