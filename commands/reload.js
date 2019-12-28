module.exports.run = async (client, message, args) => {
  if (message.author.id !== "372078453236957185")
  if (message.author.id !== "147765181903011840")
  if (message.author.id !== "365274392680333329")
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "You are not a Terminal developer.")

  if (args.length < 1)
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Supply a command name.");

  let cmd = args[0].toLowerCase()
  try {
    delete require.cache[require.resolve(`./${cmd}.js`)];
    client.commands.delete(cmd)
    const command = require(`./${cmd}.js`)
    client.commands.set(cmd, command)
  } catch (e) {
    return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `${args[0]} didn't reload successfully (Try manually reloading?)`);
  }
  message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `Reloaded **${args[0]}.js** successfully.`);
}
module.exports.help = {
  name: "reload"
}