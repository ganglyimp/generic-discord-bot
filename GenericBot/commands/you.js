const youLists = require('./youLists.json');

module.exports = {
	name: 'you',
	description: 'When command is "you", figures out if the user is insulting or complimenting the bot.',
	usage: 'Compliment or insult the bot. Ex. "You are beautiful."',
	execute(message, args) {
		const response = parseInput(args);
		console.log("Response: " + response);
		message.channel.send(response);
	},
};

function parseInput(input) {
	const compliments = youLists[0].input;
	const insults = youLists[1].input;


	//Note: response() takes an index. 0 corresponds to compliments, 1 corresponds to insults
	//YouLists MUST be in alphabetical order or else binary search won't work
	for(var i = 0; i < input.length; i++) {
		var lo = 0;
		var hi = compliments.length - 1;

		while(lo <= hi) {
			if(input[i] == "not")
				return response(1);

			var mid = Math.floor(lo + (hi - lo)/2);

			if(compliments[mid] == input[i])
				return response(0);

			if(compliments[mid] > input[i])
				hi = mid - 1;
			else
				lo = mid + 1;
		}
	}

	for(var i = 0; i < input.length; i++) {
		var lo = 0;
		var hi = insults.length - 1;

		while(lo <= hi) {
			var mid = Math.floor(lo + (hi - lo)/2);

			if(insults[mid] == input[i])
				return response(0);

			if(insults[mid] > input[i])
				hi = mid - 1;
			else
				lo = mid + 1;
		}
	}

	return response(-1);
}

function response(index) {
	if(index == -1) {
		return "What does that even mean?";
	}
	else {
		let response = youLists[index].output;
		let rando = Math.floor(Math.random() * response.length);
		return response[rando];
	}									 
}