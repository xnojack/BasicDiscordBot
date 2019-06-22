const Discord = module.require("discord.js");

module.exports.run = async (bot,message,args) =>
{
    message.channel.send("Pong")
    	.then(msg => {
    		msg.edit(`Pong! \`${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}ms\``);
    	})
}
module.exports.help = {
    name: "ping",
    usage: "ping",
    description: "Tests the bot's ping to discord"
}