const config = require('../config.json');

module.exports = {
	name: 'say',
	description: 'Feed bot a message to send in a specified channel. Must have Manage Messages permission',
	usage: 'say [@channel] [message]',
	execute(message, args) {
		if(!message.member.permissions.has('MANAGE_MESSAGES') && !(message.member.id == config.botCreator)) {
			message.reply("You don't have the right permissions to do this.");
			console.log("Response: User did not have permission to perform command.");
			return;
		}

		let respondChannel = message.channel; //default, if no channel argument is given
		if(args[0] && message.mentions.channels.first()) {
			respondChannel = message.mentions.channels.first();
			args.shift();
		}

		let msg = args.join(' ');

		let response = "Something went wrong.";

		if(!args[0] || msg.length < 1) {
			msg = "What do you want me to say?";
		}
		else {
			//Delete the evidence. 
			message.channel.bulkDelete(1, true).catch(err => {
				console.error(err);
				message.reply("An error occured when trying to clear the evidence.");
			});

			response = `Sent \"${msg}\" to ${respondChannel} `;
		}

		respondChannel.send(msg);
		console.log("Response: " + response);
	},
};