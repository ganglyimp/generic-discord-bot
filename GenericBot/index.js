const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}



client.login(config.token);

client.on('ready', () => {
	console.log("================================");
	console.log("Connected as " + client.user.tag);
	console.log("================================");
	console.log();

	client.user.setActivity("you :)", {type: "WATCHING"});
});

client.on('message', async receivedMessage => { 

	//Ignores messages from users with "discriminated" role, only reacts passive-aggressively to message
	if(receivedMessage.member.roles.cache.has(config.discriminatedRole)) {
		console.log("Input: [DISCRIMINATED CLASS SENT A MESSAGE]");

		if(Math.random() >= 0.5) {
			receivedMessage.react(randomEmote());
			console.log("Response: " + emoteReaction + "\n");
		}
		else
			console.log("Response: [NO REACTION]\n");
		
		return;
	}

	let userMessage = receivedMessage.content.toLowerCase();
	
	//Ignores (messages that don't start with prefix OR messages it's not mentioned in) AND (its own messages)
	if((!userMessage.startsWith(config.prefix) && !receivedMessage.mentions.has(client.user)) || receivedMessage.author.bot) {
		return;
	}

	//Removes prefix or text of @ mention
	if(receivedMessage.mentions.has(client.user))
		userMessage = userMessage.substring(client.user.toString().length + 1);
	else
		userMessage = userMessage.substring(config.prefix.length);
	
	const args = userMessage.trim().split(/ +/); //list of arguments, separated by space
	const commandName = args.shift(); //trims out first item in argument list

	console.log("Input: " + userMessage); 
	console.log("\tCommand: " + commandName);
	console.log("\tArguments: " + args);

	if(!client.commands.has(commandName)) {
		client.commands.get('chat').execute(receivedMessage, args);

		console.log();
		return;
	}
	

	const command = client.commands.get(commandName);
	try {
		command.execute(receivedMessage, args);
	} catch (error) {
		console.error(error);
		receivedMessage.reply('Man, something broke. I\'m broken. HELP ME IM BROKEN');
	}

	console.log();
});

//Sends a message & logs when a member is removed from server
client.on('guildMemberRemove', async member => {
	const generalChannel = client.channels.cache.get(config.botChannel);

	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	})

	const kickLog = fetchedLogs.entries.first();

	//No log entry -> left willingly
	if(!kickLog) {
		generalChannel.send("<@" + member.id + "> has left the server.");
		console.log(`${member.user.tag} has left the server.`);
		console.log();
		return;
	}

	const {executor, target} = kickLog;
	//Double checks audit log and also makes sure it isn't using an old log entry
	if((target.id == member.id) && (Date.now() - kickLog.createdTimestamp < 5000)) {
		generalChannel.send("Byebye <@" + member.id + "> !");
		console.log(`${member.user.tag} has left the server; kicked by ${executor.tag}`);
	}
	else {
		generalChannel.send("<@" + member.id + "> left the server.");
		console.log(`${member.user.tag} has left the server`);
	}

	console.log();
});


function randomEmote() {
	const emoteList = ["🙃", "😒", "😬", "😴", 
					   "🤢", "🥱", "😡", "💩", 
					   "🤡", "👎", "👀", "🔫", 
					   "🆗", "🆒", "🤨", "🙄"];

	let rando = Math.floor(Math.random() * emoteList.length);

	return emoteList[rando];
}
