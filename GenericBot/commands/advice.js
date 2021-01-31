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
	let responses = ["Yes, queen. You know it.",
					"Of fucking course, yes. Why are you asking me? You already know what's up.",
					"YES YES YES YES.",
					"I dunno, I guess?",
					":heart:",
					"Look, I got my sources, very good sources, the best sources, and they're all giving me a hell yeah on this.",
					":clown:",
					"My guy, you better believe your bottom dolla that's gonna be an absolute yes.",
					"Yes.",
					"Queen, the universe is singing to you. Do you hear it? **YES**",
					"Hunny, what was that? You gotta rephrase that.",
					"Why the fuck do you think *I'd* know?",
					"Bitch, I'm not your therapist. I got a PhD in tits and ass, not listening to you moan bout your petty issues.",
					"Fuck if I know.",
					"Hell no.",
					"Fuck off with that shit. No fucking way.",
					"**Absolutely not.**",
					"Fuck no. And these tits don't lie.",
					"Not in a million years, herbo."];

	var rando = Math.floor(Math.random() * responses.length);
	return responses[rando];
}