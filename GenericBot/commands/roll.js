module.exports = {
	name: 'roll',
	description: 'Rolls a virtual dice. Can roll with mods or with advantage (optional). Ex. roll 1d20',
	usage: 'roll [num-dice]d[num-dice-sides][+modifier] [adv/dis]',
	execute(message, args) {
		const response = parseInput(args);
		console.log("Response: " + response);
		message.channel.send(response);
	},
};

function parseInput(input) {
	let bonusMult = -1;
	if(input[0].indexOf('+') != -1)
		bonusMult = 1;

	const separators = ['d', '\\\+', '-'];
	diceNumbers = input[0].split(new RegExp(separators.join('|'), 'g'));

	if(diceNumbers.length <= 1) {
		return "Incorrect format. Try something like: `roll 1d20`";
	}

	let numDice = diceNumbers[0];
	let diceIndex = diceNumbers[1];
	let bonus = 0;

	if(diceNumbers.length > 2)
		bonus = diceNumbers[2] * bonusMult;
	
	if(input.length > 1) {
		let roll1 = rollDice(numDice, diceIndex, bonus);
		let roll2 = rollDice(numDice, diceIndex, bonus);

		if(input[1].startsWith("a")) {
			let max = Math.max(roll1, roll2);
			let result = "Rolling with advantage: `[" + roll1 + " | " + roll2 + "]` Result: **" + max + "**";
			return result;
		}
		else {
			let min = Math.min(roll1, roll2);
			let result = "Rolling with disadvantage: `[" + roll1 + " | " + roll2 + "]` Result: **" + min + "**";
			return result;
		}
	}
	else {
		if(numDice < 20)
			return rollDiceExpanded(numDice, diceIndex, bonus);
		else
			return "Result: **" + rollDice(numDice, diceIndex, bonus) + "**";
	}		
						 
}

function rollDice(numDice, diceIndex, bonus) {
	let total = 0;
	while(numDice > 0) {
		rando = Math.floor(Math.random() * diceIndex) + 1
		total += rando;
		numDice--;
	}

	return total + bonus;
}

function rollDiceExpanded(numDice, diceIndex, bonus) {
	let total = 0;
	let diceMath = "`[ ";
	while(numDice > 0) {
		rando = Math.floor(Math.random() * diceIndex) + 1
		total += rando;
		diceMath += rando + " ";
		numDice--;
	}

	diceMath += "]`";
	result = total + bonus;
	return diceMath + "Result: **" + result + "**";
}