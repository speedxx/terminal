const Discord = require("discord.js")

module.exports.run = (client, message, args) => {
    switch(args[0]){
        case 'p': //setting activity to "playing"
        client.user.setActivity(args.splice(1).join(' '), {type: 'playing'});
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + '**Playing** status ready.');
        break;
        case 'w': //setting activity to "watching"
        client.user.setActivity(args.splice(1).join(' '), {type: 'watching'});
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + '**Watching** status ready.')
        break;
        case 'l': //setting activity to "listening"
        client.user.setActivity(args.splice(1).join(' '), {type: 'listening'});
        message.channel.send("**/" + message.guild + "/" + message.channel.name + "/** \n  " + '**Listening** status ready.');
        break;
    }
}
exports.help = {
name: "activity"
}
