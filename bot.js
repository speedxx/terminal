const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const config = require("./config.json");
const fs = require("fs");
const ms = require("ms");

const autoRole = require("./commands/autorole.js")
const Censor = require("./commands/censor.js")
const PG = require("./commands/pg.js")
const Invites = require("./commands/invites.js")
const Prefix = require("./commands/prefix.js")
const Lockdown = require("./commands/lockdown.js")
const Blacklist = require("./commands/blacklist.js")

// Command Handler
client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  if (jsfiles.length <= 0)
    return console.log("No commands to load.");

  console.log(`Loading ${jsfiles.length} commands...`);
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`The command ${f} has loaded.`);
    client.commands.set(props.help.name, props);
  });
});

client.on('messageReactionAdd', (messageReaction, user) => {
  let reactrole = JSON.parse(fs.readFileSync("./react.json", "utf8"));
  if (!reactrole[messageReaction.message.guild.id]) {
    reactrole[messageReaction.message.guild.id] = {
      messageID: 0,
      role: 0
    }
  }
  if (messageReaction.message.id === reactrole[messageReaction.message.guild.id].messageID) {
    var reactionrole = reactrole[messageReaction.message.guild.id].role.id
    let member = messageReaction.message.guild.member(user);
    member.addRole(reactionrole)
    return user.send("**/" + user.username + "/DM** \n You have been given a role on " + messageReaction.message.guild + " from a reactrole.")
  }

  if (messageReaction.emoji.name === "🚩") {
    messageReaction.message.channel.send("**/" + messageReaction.message.guild + "/" + messageReaction.message.channel.name + "/** \n  " + "Flagged the post.").then(msg => {
      msg.delete(3000)
    })

    let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
    if (!logs[messageReaction.message.guild.id]) {
      logs[messageReaction.message.guild.id] = {
        toggle: 0
      };
    }

    if (logs[messageReaction.message.guild.id].toggle === 1) {
      const logchannel = messageReaction.message.guild.channels.find(channel => channel.name === "terminal-logs");
      let eventembed = new Discord.RichEmbed()
        .setColor(0x00ff00)
        .setTitle("Flag Event:")
        .addField("Flagged Message:", messageReaction.message)
        .addField("Flagged Message Author:", messageReaction.message.author)
        .addField("By:", user)
        .setTimestamp()
      logchannel.send(eventembed);
    }
  }
});

client.on('messageReactionRemove', (messageReaction, user) => {
  let reactrole = JSON.parse(fs.readFileSync("./react.json", "utf8"));
  if (!reactrole[messageReaction.message.guild.id]) {
    reactrole[messageReaction.message.guild.id] = {
      messageID: 0,
      role: 0
    }
  }

  if (messageReaction.message.id === reactrole[messageReaction.message.guild.id].messageID) {
    var reactionrole = reactrole[messageReaction.message.guild.id].role.id
    let member = messageReaction.message.guild.member(user);
    member.removeRole(reactionrole)
    return user.send("**/" + user.username + "/DM** \n You have been removed from a role on " + messageReaction.message.guild + " from removing a reactrole.")
  }
})

client.on("guildMemberAdd", member => {
  let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
  if (!logs[member.guild.id]) {
    logs[member.guild.id] = {
      toggle: 0
    };
  }
  if (logs[member.guild.id].toggle === 1) {
    const logchannel = member.guild.channels.find(channel => channel.name === "terminal-logs");
    let eventembed = new Discord.RichEmbed()
      .setColor(0x00ff00)
      .setAuthor("Member Join Event:", member.user.displayAvatarURL)
      .addField("User:", member + " (" + member.user.tag + ")")
      .setFooter("User ID: " + member.id)
      .setTimestamp()
    logchannel.send(eventembed);
  }
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

client.on("guildMemberRemove", member => {
  let logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
  if (!logs[member.guild.id]) {
    logs[member.guild.id] = {
      toggle: 0
    };
  }
  if (logs[member.guild.id].toggle === 1) {
    const logchannel = member.guild.channels.find(channel => channel.name === "terminal-logs");
    let eventembed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setAuthor("Member Leave Event:", member.user.displayAvatarURL)
      .addField("User:", member + " (" + member.user.tag + ")")
      .setFooter("User ID: " + member.id)
      .setTimestamp()
    logchannel.send(eventembed);
  }
})

client.on('ready', () => {
  client.user.setActivity("your commands", { type: 'WATCHING' })
  console.log(`Terminal booted up sucessfully.`);
});

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.author.send("**/" + message.author.username + "/DM** \n Sorry, but commands in my DMs have been disabled. Please try it in a server.")
  let censor = JSON.parse(fs.readFileSync("./censor.json", "utf8"));
  if (!censor[message.guild.id]) {
    censor[message.guild.id] = {
      word: 0
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

  let pg = JSON.parse(fs.readFileSync("./pg.json", "utf8"));
  if (!pg[message.guild.id]) {
    pg[message.guild.id] = {
      mode: 0
    };
  }
  if (pg[message.guild.id].mode === 1) {

    // This section will contain swears!
    let swearwords = ["fuck", "nignog", "nig-nog", "nigger", "nig-nog", "ass", "bastard", "bitch", "slut", "pussy", "vagina", "dick", "penis", "bollocks", "crap", "cunt", "frigger", "shit", "niga", "niqqer", "nigqer", "niqger", "niger", "negro", "niglet", "whore", "twat", "gypsy", "fag", "faggot"]
    for (var i = 0; i < swearwords.length; i++) {
      if (message.content.toLowerCase().includes(swearwords[i])) {
        message.delete();
        let censor = "[swear word]"
        let edit = message.content.replace(new RegExp(swearwords[i], "g"), censor);
        message.delete();
        return message.channel.send(`**/${message.guild}/${message.channel.name}/**\n**${message.author.username}:** ${edit}`);
      }
    }
  } else {
    if (censor[message.guild.id].toggle === 1) {
      // This section will contain slurs!
      let slurs = ["slut", "nignog", "nig-nog", "niger", "nigger", "niqqer", "nigqer", "niqger", "negro", "niglet", "whore", "gypsy", "fag", "faggot"]
      for (var i = 0; i < slurs.length; i++) {
        if (message.content.toLowerCase().includes(slurs[i])) {
          message.delete();
          let censor = "[slur]"
          let edit = message.content.toLowerCase().replace(new RegExp(slurs[i], 'g'), censor);
          message.delete();
          return message.channel.send(`**/${message.guild}/${message.channel.name}/**\n**${message.author.username}:** ${edit}`);
        }
      }
    }
  }

  let prefixjson = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));
  if (!prefixjson[message.guild.id]) {
    prefixjson[message.guild.id] = {
      prefix: ">_"
    };
  }
  let prefix = prefixjson[message.guild.id].prefix

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
        }
      }
      if (message.member.hasPermission("MANAGE_MESSAGES")) return
      message.delete()
      message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "Sorry, " + message.author + ", you cannot post discord server invites as administrators have blocked it!")
      const logdelete = message.guild.channels.find(channel => channel.name === "terminal-logs");
      const dembed2 = new Discord.RichEmbed()
        .setAuthor("Attempted Invite")
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .addField("**/" + message.guild + "/" + message.channel.name + "/** \n  ", `${message.author} (${message.author.tag}) tried posting an invite in channel **#${message.channel.name}**.`)
        .setTimestamp()
      logdelete.send(dembed2);
    }
  }

  const Autoreact = require("./commands/autoreact.js")
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
        }
      }
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

  }
});

client.login(config.token);
