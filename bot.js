const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const config = require("./config.json");
const fs = require("fs");
const ms = require("ms");

client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  if (jsfiles.length <= 0) return console.log("No commands to load.");

  console.log(`loading ${jsfiles.length} commands...`);
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`The command ${f} has loaded.`);
    client.commands.set(props.help.name, props);
  });
});

client.on("guildMemberAdd", member => {
    const autoRole = require ("./commands/autorole.js")
    let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
    if (!autorole[member.guild.id]) { 
      autorole[member.guild.id] = {
        autorole: "none"
      };
    }
    var role = autorole[member.guild.id].role;
    if (!role) return;
    member.addRole(role);
  });

client.on('ready', () => {
  client.user.setActivity("your commands", { type: 'WATCHING' })
  console.log(`Terminal booted up sucessfully.`);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
  if (!logs[oldMessage.guild.id]) { 
    logs[oldMessage.guild.id] = {
      toggle: 0
    };
  }
  if (logs[oldMessage.guild.id].toggle === 1) {
  let editchannel = "terminal-logs"
  if (oldMessage.author.id === "521023036812558356") {
    return
  } else {
    if (oldMessage.guild.channels.exists('name', editchannel)) {
      const logedit = oldMessage.guild.channels.find(channel => channel.name === "terminal-logs");
      const dembed3 = new Discord.RichEmbed()
    .setAuthor("Message edit")
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .addField("**/" + oldMessage.guild + "/" + oldMessage.channel.name + "/** \n  ", `From : "${oldMessage.content}" by **${oldMessage.author.tag}**\n To: "${newMessage.content}".`)
    .setTimestamp()
      logedit.send(dembed3);
    } else {
      oldMessage.channel.send("**/" + oldMessage.guild + "/" + oldMessage.channel.name + "/** \n  " + `The message : "${oldMessage.content}" by ${oldMessage.author.tag} was edited to "${newMessage.content}". \n This message will delete in **5 seconds** (there is no terminal-logs channel), so screenshot this message if the user said anything that broke the rules.`).then(msg => { msg.delete(5000)})
 }}}
});

client.on("messageDelete", (messageDelete) => {
  let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
  if (!logs[messageDelete.guild.id]) { 
    logs[messageDelete.guild.id] = {
      toggle: 0
    };
  } 
  if (logs[messageDelete.guild.id].toggle === 1) {
  let deletechannel = "terminal-logs"
  if (messageDelete.author.id === "521023036812558356") {
    return
  } else {
    if (messageDelete.guild.channels.exists('name', deletechannel)) {
      const logdelete = messageDelete.guild.channels.find(channel => channel.name === "terminal-logs");
      const dembed = new Discord.RichEmbed()
  .setAuthor("Message deletion")
  .setColor(Math.floor(Math.random() * 16777214) + 1)
  .addField("**/" + messageDelete.guild + "/" + messageDelete.channel.name + "/** \n  ", `The message : "${messageDelete.content}" by **${messageDelete.author.tag}** was deleted.`)
  .setTimestamp()
    logdelete.send(dembed);
    } else {
      messageDelete.channel.send("**/" + messageDelete.guild + "/" + messageDelete.channel.name + "/** \n  " + `The message : "${messageDelete.content}" by ${messageDelete.author.tag} was deleted. \n This message will delete in **5 seconds** (there is no terminal-logs channel), so screenshot this message if the user said anything that broke the rules.`).then(msg => { msg.delete(5000)})
 }}}
});

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.author.send("**/" + message.author.username + "/DM** \n Sorry, but commands in my DMs have been disabled. Please try it in a server." )
  const Censor = require ("./commands/censor.js")
  let censor = JSON.parse(fs.readFileSync("./censor.json", "utf8"));
  if (!censor[message.guild.id]) { 
    censor[message.guild.id] = {
      word: "terminal sucks"
    };
  }
  let whitelist = JSON.parse(fs.readFileSync("./whitelist.json", "utf8"));
  if (!whitelist[message.guild.id]) {
    whitelist[message.guild.id] = {
			toggle: 0
		};
  whitelist[message.guild.id] = {
    channel: "none"
  };
}

  let watch = JSON.parse(fs.readFileSync("./watch.json", "utf8"));
  if (!watch[message.guild.id]) {
    watch[message.guild.id] = {
			toggle: 0
		};
  }
  if (message.channel.id === watch[message.guild.id].toggle) {
    const watchmsg = message.guild.channels.find(channel => channel.name === "terminal-logs");
    watchmsg.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + `There was a message in the watchlisted channel by ` + message.author.tag + ' (' + message.author.id + ') which contains: **' + message.content + '**')
  }
  if (message.content.toLowerCase().includes(censor[message.guild.id].word)) {
    message.delete(50)
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Sorry, " + message.author + ", you cannot say that word as administrators have blocked it!")
  }
  const PG = require ("./commands/pg.js")
  let pg = JSON.parse(fs.readFileSync("./pg.json", "utf8"));
  if (!pg[message.guild.id]) { 
    pg[message.guild.id] = {
      mode: 0
    };
  }
  if (pg[message.guild.id].mode === 1) {


    // This section will contain swears!
    let swearwords = ["fuck", "ass", "bastard", "bitch", "slut", "pussy", "dick", "penis", "bollocks", "crap", "cunt", "frigger", "shit", "nigg", "niga","niger", "negro", "whore", "twat"]
    for (let word of message.content.toLowerCase().split(/\s+/g)){
    if (swearwords.includes(word)) {
message.delete();
message.channel.send(`**/${message.guild}/${message.channel.name}/**\nSorry, ${message.author}, you cannot swear as this server is in PG mode!`)
}
}
}

  const Prefix = require ("./commands/prefix.js")
  let prefixjson = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));
  if (!prefixjson[message.guild.id]) { 
    prefixjson[message.guild.id] = {
      prefix: ">_"
    };
  }
  let prefix = prefixjson[message.guild.id].prefix

  if (message.content.toLowerCase().includes(prefix + "delete")) {
    if (message.author.bot) return;
    if (message.author.id != "372078453236957185") {
      if (message.author.id != "147765181903011840") 
      if (message.author.id != "365274392680333329") {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/**" + "You may not run this command.")
    }}
    message.channel.bulkDelete(2);
  }
  const Lockdown = require ("./commands/lockdown.js")
  let lockdown = JSON.parse(fs.readFileSync("./lockdown.json", "utf8"));
  if (!lockdown[message.guild.id]) { 
    lockdown[message.guild.id] = {
      lock: "none"
    };
  }
  if (message.channel.id === (lockdown[message.guild.id].lock)) {
    if (message.author.id === "372078453236957185") return
    if (message.author.id === "147765181903011840") return
    if (message.author.id === "365274392680333329") return
    if (message.author.id === "521023036812558356") return
    if (message.member.hasPermission("MANAGE_MESSAGES")) return
    message.delete()
  }
  const Invites = require ("./commands/invites.js")
  let invites = JSON.parse(fs.readFileSync("./invites.json", "utf8"));
  if (!invites[message.guild.id]) { 
    invites[message.guild.id] = {
      block: 0
    };
  }
  if (invites[message.guild.id].block === 1) {
    if (message.content.toLowerCase().includes("discord.gg")) {
      if (message.channel.id === whitelist[message.guild.id].channel) {
        if (whitelist[message.guild.id].toggle === 2) {
        return
      } else {
        if (whitelist[message.guild.id].toggle === 3) {
          return
        }
      }}
      if (message.member.hasPermission("MANAGE_MESSAGES")) return
    message.delete()
    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Sorry, " + message.author + ", you cannot post discord server invites as administrators have blocked it!")
    const logdelete = message.guild.channels.find(channel => channel.name === "terminal-logs");
    const dembed2 = new Discord.RichEmbed()
    .setAuthor("Message deletion")
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .addField("**/" + message.guild + "/" + message.channel.name + "/** \n  ", `${message.author} tried posting an invite in channel **#${message.channel.name}**.`)
    .setTimestamp()
      logdelete.send(dembed2);
  }}

  const Autoreact = require ("./commands/autoreact.js")
  let autoreact = JSON.parse(fs.readFileSync("./autoreact.json", "utf8"));
  if (!autoreact[message.guild.id]) { 
    autoreact[message.guild.id] = {
      toggle: 0,
      emoji: 0,
      emoji2: 0,
      channel: 0
    };
  }
  if (autoreact[message.guild.id]) {
    if (autoreact[message.guild.id].toggle === 1) {
    if (autoreact[message.guild.id].channel === message.channel.id) {
      if (autoreact[message.guild.id].emoji2 === 0) {
       message.react(autoreact[message.guild.id].emoji)
      } else {
       message.react(autoreact[message.guild.id].emoji)
       message.react(autoreact[message.guild.id].emoji2)
      }}
    }
  }


let messageArray = message.content.split(" ");
let command = messageArray[0].toLowerCase();
let args = messageArray.slice(1);
let cmd = client.commands.get(command.slice(prefix.length));

  if (!command.startsWith(prefix)) return;
  if (cmd) {
    let fullCommand = message.content.substr(1) 
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    const Blacklist = require ("./commands/blacklist.js")
    let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
    if (!blacklist[message.author.id]) { 
      blacklist[message.author.id] = {
        person: 0
      };
    }
    if (blacklist[message.author.id].person === 1) {
      return message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Sorry, " + message.author + ", you have been blocked from using Terminal. Please contact square#1255, speed#3413 or fionn#0001 for more information.")
    }
    cmd.run(client, message, args); 
    console.log(`${message.author.tag} (${message.author.id}) ran >${primaryCommand} in the guild: ` + message.guild.id)

    let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
    if (!logs[message.guild.id]) { 
      logs[message.guild.id] = {
        toggle: 0
      };
    } 
    if (logs[message.guild.id].toggle === 1) {
      if (message.channel.id === whitelist[message.guild.id].channel) {
        if (whitelist[message.guild.id].toggle === 1) {
        return
      } else {
        if (whitelist[message.guild.id].toggle === 3) {
          return
        }
      }}
    let deletechannel = "terminal-logs"
      if (message.guild.channels.exists('name', deletechannel)) {
        const logdelete = message.guild.channels.find(channel => channel.name === "terminal-logs");
        const dembed4 = new Discord.RichEmbed()
        .setAuthor("Command logger")
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .addField("**/" + message.guild + "/" + message.channel.name + "/** \n  ", `**${message.author.tag}** (${message.author.id}) ran >${primaryCommand}.`)
        .setTimestamp()
          logdelete.send(dembed4);
      } else {
           return   
}}
 
}});

client.login(config.token);
