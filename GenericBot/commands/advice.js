module.exports = {
	name: 'advice',
	description: 'Works like a basic 8-ball. Ask yes or no questions and get a response.',
	usage: '[advice] [question]',
	execute(message, args) {
		const response = giveAdvice();
		console.log("Response: " + response);
		message.channel.send(response);
	},
};

function giveAdvice() {
	let responses = ["Yes, you know it.",
					"Of fucking course, yes. Why are you asking me? You already know what's up.",
					"YES YES YES YES.",
					"I dunno, I guess?",
					":heart:",
					"Look, I got my sources, very good sources, the best sources, and they're all giving me a hell yeah on this.",
					":clown:",
					"My guy, you better believe your bottom dolla that's gonna be an absolute yes.",
					"Yes.",
					"Queen, the universe is singing to you. Do you hear it? **YES**",
					"What was that? You gotta rephrase that.",
					"Why the heck do you think *I'd* know?",
					"I'm not your therapist. I'm not listening to you moan bout your petty issues.",
					"Hell if I know.",
					"Hell no.",
					"No.",
					"**Absolutely not.**",
					"NO.",
					"Not in a million years."];

	var rando = Math.floor(Math.random() * responses.length);
	return responses[rando];
}
