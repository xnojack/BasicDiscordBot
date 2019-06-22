//Bring in packages for node to use
const Discord = require("discord.js");
const fs = require("fs");

//Import settings
const botsettings = require("./botsettings.json");

//Initialize Bot Object
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err,files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0){
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f,i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i+1}: ${f} loaded.`);
        bot.commands.set(props.help.name,props);
    });
});

bot.on("ready",() => {
	console.log("I'm online")
})

bot.on("message",message => {
	if(message.author.bot) return;
	if(message.content == "ayy lmao")
	{
		message.channel.send("ayy lmao")
	}
	if(!message.content.startsWith(botsettings.prefix)) return;
	let args = message.content.split(/\s+/g);
	let command = args[0].toLowerCase().slice(1);
	args = args.slice(1);

	if(command == "help")
	{
		message.channel.send("I don't have any commands")
	}
	cmd = bot.commands.get(command);
    if(cmd)
    {
        cmd.run(bot,message,args)
            .catch(error =>{
                console.error("This command failed: "+command+"\n"+error);
            })
    }
})

//Login to discord
bot.login(botsettings.token);