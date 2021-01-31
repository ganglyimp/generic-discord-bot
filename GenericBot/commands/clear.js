const config = require('../config.json');

module.exports = {
	name: 'clear',
	description: 'Clears a given amount of messages in a channel. Must have Manage Messages permission to use.',
	usage: 'clear [num_messages] [#channel-name (optional)]',
	execute(message, args) {
		if(!message.member.permissions.has('MANAGE_MESSAGES') && !(message.member.id == config.botCreator)) {
			message.reply("Whoops, looks like you don't got the right perms.");
			console.log("Response: User did not have permission to perform command.");
			return;
		}

		let amt = parseInt(args[0]) + 1; //default +1, to account for initial command call

		let respondChannel = message.channel; //default, if no channel argument is given
		if(args[1] && message.mentions.channels.first() != message.channel) {
			respondChannel = message.mentions.channels.first();
			amt--;
		}


		let response = "Something went wrong.";

		if(!args[0]) {
			response = "Please indicate how many messages you want cleared.";
		}
		else if(isNaN(amt)) {
			response = "That isn't a number.";
		}
		else if(amt > 100 || amt < 1) {
			response = "Please only use a number between 1 and 100.";
		}
		else {
			respondChannel.bulkDelete(amt, true).catch(err => {
				console.error(err);
				message.reply("An error occured when trying to clear messages.");
			});
			response = `Deleting ${args[0]} messages in ${respondChannel} ...`;
		}

		message.reply(response);
		console.log("Response: " + response);
	},
};