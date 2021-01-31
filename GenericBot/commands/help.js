module.exports = {
	name: 'help',
	description: 'Gives you a list of available commands to choose from',
	usage: 'help [command name]',
	execute(message, args) {
		let msg = "";
		const {commands} = message.client;

		if(!args.length) {
			//Give a list of available commands
			msg = "__**Command List:**__\n*";
			msg += commands.map(command => command.name).join('\n');
			msg += "*\nSend *help [command name]* for more information on an individual command";
		}
		else {
			//Fetch information of specified command
			const command = commands.get(args[0]);

			if(!command) {
				msg = "That command doesn't exist.";
			}
			else {
				msg = "__**" + command.name + "**__\n" +
					   "*Description*: `" + command.description + "`\n" +
					   "*Usage*: `" + command.usage + "`";
			}
		}

		console.log("Response: " + msg);
		message.channel.send(msg);
	},
};