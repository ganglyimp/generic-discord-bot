const dialogue = require('./dialogue.json');

module.exports = {
	name: 'chat',
	description: 'Processes simple inputs as if having a basic conversation (greetings, how are you, goodbyes)',
	usage: 'Any message that doesn\'t contain a recognized command will be filtered to this command.',
	execute(message, args) {
		const response = simpleConvo(message.content.toLowerCase());
		console.log("Response: " + response);
		message.channel.send(response);
	},
};

function simpleConvo(userMessage) {
	let convoLists = [dialogue[0].input, dialogue[1].input, dialogue[2].input, 
						dialogue[3].input, dialogue[4].input];

	let dialogueIndex = -1;
	for(var i = 0; i < convoLists.length; i++) {
		for(var j = 0; j < convoLists[i].length; j++) {
			let dialogueWord = convoLists[i][j];
			
			if(userMessage.indexOf(dialogueWord) != -1) {
				dialogueIndex = i;
				return simpleResponse(dialogueIndex);
			}
		}
	}
	return simpleResponse(dialogueIndex);
}

function simpleResponse(index) {
	if(index == -1)
		return "I have no idea what you're trying to tell me.";
	else {
		let response = dialogue[index].output;
		let rando = Math.floor(Math.random() * (response.length));
		return response[rando];
	}
}