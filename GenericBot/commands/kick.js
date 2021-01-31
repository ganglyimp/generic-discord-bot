const config = require('../config.json');

module.exports = {
	name: 'kick',
	description: 'Kicks specified user from server. Must have Kick Members permission.',
	usage: 'kick [@user]',
	execute(message, args) {
		if(!message.member.permissions.has('KICK_MEMBERS') && !(message.member.id == config.botCreator)) {
			message.channel.send("Get out of here. You ain't kicking shit.");
			return;
		}
		if(!message.mentions.users.size || args.length < 1) {
			message.reply('You need to tag a user if you\'re trying to kick someone.');
			return;
		}

		//Get user code from arg
		userCode = args[0].substring(3, args[0].length-1);
		toBeKicked = message.guild.member(userCode);

		toBeKicked.kick().then((toBeKicked) => {
			console.log("Successfully kicked member!");
			message.channel.send(":wave: Bye bye " + toBeKicked.displayName + "!");
		}).catch(() => {
			console.log("Could not kick member with user code: " + toBeKicked);
			message.channel.send("Sorry, couldn't kick that member.");
		})
		
	},
};