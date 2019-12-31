const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

        let prefixjson = JSON.parse(fs.readFileSync("./prefix.json", "utf8"));
        if (!prefixjson[message.guild.id]) {
                prefixjson[message.guild.id] = {
                        prefix: ">_"
                };
        }
        let prefix = prefixjson[message.guild.id].prefix

        if (args.includes("kick")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Kick:** A command that kicks an user. -s = silenced (don't dm the user). Usage: >_kick (user) (reason) (-s)")
            } else {
            if (args.includes("ban")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Ban:** A command that bans an user. -s = silenced (don't dm the user), -u = include person who banned in ban reason. Usage: >_ban (user) (reason) (-s/-u)")
            } else {
            if (args.includes("purge")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Purge:** A command that purges messages. Usage: >_purge (interger)")
            } else {
            if (args.includes("softban")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Softban:** A command that bans and unbans a user. -s = silenced (don't dm the user), -u = include person who banned in ban reason. Usage: >_softban (user) (reason) (-s/-u)")
            } else {
            if (args.includes("mute")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Mute:** A command that mutes an user from typing. Usage: >_mute (user) (time)")
            } else {
            if (args.includes("blind")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Blind:** A command that blinds an user from typing or seeing future messages. Usage: >_blind (user) (time)")
            } else {
            if (args.includes("addrole")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Addrole:** A command that adds a role to an user. Usage: >_addrole (user) (role name)")
            } else {
            if (args.includes("removerole")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Removerole:** A command that removes a role from an user. Usage: >_removerole (user) (rolename)")
            } else {
            if (args.includes("censor")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Censor:** A command that censors all ethnic slurs. Usage: >_censor (on)")
            } else {
             if (args.includes("developers")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Developers:** A command that shows the developers and owners of Terminal. Usage: >_developers")
            } else {
             if (args.includes("help")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Help:** A command that lists all commands. Usage: >_help")
            } else {
             if (args.includes("uptime")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Uptime:** A command that shows the bot uptime. Usage: >_uptime")
            } else {
             if (args.includes("autorole")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Autorole:** A command which toggles autorole for the server. Usage: >_autorole (role name)")
            } else {
             if (args.includes("invites")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Invites:** A command which blocks/allows invites to be advertised. Usage: >_invites (block)/>_invites")
            } else {
             if (args.includes("unban")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Unban:** A command which unbans an user. Usage: >_unban (user)")
            } else {
             if (args.includes("unmute")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Unmute:** A command which unmutes an user. Usage: >_unmute (user)")
            } else {
             if (args.includes("ping")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Ping:** A command which shows the bot's ping. Usage: >_ping")
            } else {
            if (args.includes("lockdown")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Lockdown:** A command which locks down a channel, preventing anyone but admins to speak. You have to unlock via another channel to properly unlock the channel. Usage: >_lockdown lock/>_lockdown")
            } else {
            if (args.includes("prefix")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Prefix:** A command which changes the bot's prefix. Example: *'Hey Bot_'* would make *'Hey Bot_help'*. Usage: >_prefix (prefix)")
            } else {
            if (args.includes("announce")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Announce:** A command which announces a message in a specific channel. Usage: >_announce (channel) (message)")
            } else {
            if (args.includes("poll")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Poll:** A command which creates a poll. Usage: >_poll (question)")
            } else {
            if (args.includes("timer")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Timer:** A command which creates a timer for seconds/minutes/days/months/years and adds a message. Usage: >_timer (time)")
            } else {
               if (args.includes("serverinfo")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Server Info:** A command that shows all the information about the current guild. Usage: >_serverinfo")
            } else {
            if (args.includes("image")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Image Embed:** A command that puts an image URL into an embed. This is used to get around the explicit message blocker for images. Usage: >_image (url)")
            } else {
            if (args.includes("report")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Report:** A command that creates a ticket to report rulebreakers. Usage: >_report (mention) (report)")
            } else {
            if (args.includes("hackban")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Hackban:** A command that bans a user ID. -u = include person who banned in ban reason. Usage: >_hackban (user id) (reason) (-u)")
            } else {
             if (args.includes("github")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Github:** A command that directs you to our github page. Usage: >_github")
            } else {
             if (args.includes("botinfo")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Bot Info:** A command that displays all bot information. Usage: >_botinfo")
            } else {
             if (args.includes("invite")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Invite:** [Not >_invites] A command that sends you an invitation link for the bot in your DMs. Usage: >_invite")
            } else {
             if (args.includes("shutdown")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Shutdown:** [Bot admin command] A command that shuts the bot down. Usage: >_shutdown")
            } else {
             if (args.includes("blacklist")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Black List:** [Bot admin command] A command that blacklists a user from using any commands. Usage: >_blacklist (id) allow/deny")
            } else {
             if (args.includes("gleave")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Guild Leave:** [Bot admin command] A command that leaves a guild. Usage: >_gleave (id)")
            } else {
             if (args.includes("channelinfo")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Channel Info:** A command that displays all the channel information. Usage: >_channelinfo")
            } else {
             if (args.includes("userinfo")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**User Info:** A command that displays all the information on one user. Usage: >_userinfo (mention) or >_userinfo")
            } else {
             if (args.includes("pg")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**PG Mode:** A command that turns on PG mode. This blocks all swears in the server. Usage: >_pg (on/off)")
            } else {
             if (args.includes("unblind")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Unblind:** A command that unblinds a person. Usage: >_pg (on/off)")
            } else {
             if (args.includes("pin")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Pin:** A command that pins a message by it's ID. Usage: >_pin (id)")
            } else {
             if (args.includes("unpin")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Unpin:** A command that unpins a message by it's ID. Usage: >_unpin (id)")
            } else {
            if (args.includes("warn")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Warn:** A command that warns an user by their DM. It will mention them in chat if failed. It should be used in which: `@mention is spamming`. Usage: >_warn (mention) (reason)")
            } else {
            if (args.includes("createchannel")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Create Channel:** A command that creates a channel. Usage: >_createchannel (name)")
            } else {
            if (args.includes("reload")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Reload:** [Bot admin command] A command that reloads a specific command. Usage: >_reload (command)")
            } else {
            if (args.includes("nick")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Nick:** A command that nicknames the bot to whatever you want it named. Usage: >_nick (name)")
            } else {
            if (args.includes("activity")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Activity:** [Bot admin command] A command that sets the bot activity to whatever you want the activity to be. Usage: >_activity (default) or >_activity (p/w/l) (activity)")
            } else {
            if (args.includes("suggest")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Suggest:** A command that sends the bot developers your suggestions. Usage: >_suggest (suggestion)")
            } else {
            if (args.includes("roleinfo")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Role Info:** A command that supplies all known information about a role. Usage: >_roleinfo (role)")
            } else {
            if (args.includes("avatar")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Avatar:** A command that fetches a users avatar URL. Usage: >_avatar (mention) or >_avatar")
            } else {
            if (args.includes("say")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Say:** [Bot admin command] A command that repeats whatever you say. Usage: >_say (text)")
            } else {
            if (args.includes("logs")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Logs:** A command that logs bans/kicks etc. Usage: >_logs or >_logs on")
            } else {
            if (args.includes("watch")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Watch:** A command that logs a channel. Usage: >_watch (channel id)/>_watch")
            } else {
            if (args.includes("autoreact")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Auto React:** A command that automatically reacts to all messages. Usage: >_autoreact (emotes)")
            } else {
            if (args.includes("vcban")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**VC Ban:** A command that bans a user from using voice chat. Usage: >_vcban (mention)")
            } else {
            if (args.includes("unvcban")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Un VC Ban:** A command that allows users to use voice chat normally again. Usage: >_unvcban (mention)")
            } else {
            if (args.includes("serverinvite")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Server Invite:** A command that generates a server invitation link. Usage: >_serverinvite")
            } else {
            if (args.includes("ctalk")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**C Talk:** [Bot admin command] A command that sends a message to a specific channel. Usage: >_ctalk (channel id) (message)")
            } else {
            if (args.includes("dtalk")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**D Talk:** [Bot admin command] A command that sends a message to a user by ID. Usage: >_dtalk (user id) (message)")
            } else {
            if (args.includes("whrole")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Who Has Role:** A command that shows you all the members in a role. Usage: >_whrole (role name)")
            } else {
            if (args.includes("deletechannel")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Delete Channel:** A command that deletes a channel by mention. Usage: >_deletechannel (channel mention) accept")
            } else {
            if (args.includes("nuke")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Nuke:** A command that deletes and recreates a channel by mention. Usage: >_nuke (channel mention) accept")
            } else {
            if (args.includes("ticket")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Ticket:** A command that creates a ticket for support. Usage: >_ticket (report)")
            } else {
            if (args.includes("tempban")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Temporary ban:** A command that bans a user for a specific time. -s = silenced (don't dm the user), -u = include person who banned in ban reason. Usage: >_tempban (user) (time) (reason) (-s/-u)")
            } else {
            if (args.includes("permmute")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Permanent Mute:** A command that mutes a user. Usage: >_permmute (user)")
            } else {
            if (args.includes("permblind")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Permanent Blind:** A command that blinds a user. Usage: >_permblind (user)")
            } else {
            if (args.includes("createrole")) {
                    message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Create Role:** A command that creates a role. Usage: >_createrole (role)")
            } else {
            if (args.includes("reactrole")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Reaction Role:** A command that gives a role when a reaction is added to a message and removes it when the reaction has been removed. Usage: >_reactrole (message ID) (role name) or >_reactrole off")
            } else {
            if (args.includes("serverlist")) {
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + "**Server List:** [Bot admin command] A command that filters guild size to 100 in all the servers terminal is in, and displays it. Usage: >_serverlist")
            } else {


        fs.readdir("./commands/", (err, files) => {

                let jsfiles = files.filter(f => f.split(".").pop() === "js");
                let serverembed = new Discord.RichEmbed()
                        .setColor(Math.floor(Math.random() * 16777214) + 1)
                        .setAuthor('Terminal Panel - Prefix: ' + prefix)
                        .setTitle(jsfiles.length + " commands:")
                        .setDescription("Terminal: A moderation bot. Do " + prefix + "help (command) to get more info.")
                        .addField("Bot Admins:", "`activity`, `shutdown`, `restart`, `blacklist`, `gleave`, `reload`, `ctalk`, `dtalk`, `serverlist`")
                        .addField("Punishment:", "`kick`, `ban`, `unban`, `softban`, `tempban`, `hackban`, `mute`, `permmute`, `unmute`, `blind`, `permblind`, `unblind`, `warn`, `vcban`, `unvcban`")
                        .addField("Roles:", "`addrole`, `removerole`, `autorole`, `reactrole`, `whrole`, `createrole`")
                        .addField("Messages:", "`censor`, `pg`, `lockdown`, `purge`, `invites`, `announce`, `report`, `poll`, `pin`, `unpin`, `logs`, `autoreact`")
                        .addField("Info:", "`serverinfo`, `botinfo`, `channelinfo`, `userinfo`, `roleinfo`, `serverinvite`")
                        .addField("Other:", "`developers`, `image`, `help`, `uptime`, `ping`, `prefix`, `github`, `invite`, `createchannel`, `deletechannel`, `nuke`, `nick`, `suggest`, `avatar`")
                message.channel.send("**/" + message.guild + "/" + message.channel.name + "/**");
                message.channel.send(serverembed);

        })
}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
};
module.exports.help = {
        name: "help"
};
