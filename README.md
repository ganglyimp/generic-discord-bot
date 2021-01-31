# generic-discord-bot
A generic, general purpose discord bot I built using the [Discord.js tutorials](https://discordjs.guide) as a guide. 
<p>Works with Discord.js V12</p>
<p>Some code, like the command handler, was taken straight from the Discord.js tutorials.</p> 

This is a stripped down version of a joke bot I made for a personal server, which is why the json files are so sparse. 

## Currently Implemented Commands: 
<p><i>Help</i>: Dynamic help command. Code repurposed from [here](https://discordjs.guide/command-handling/adding-features.html#a-dynamic-help-command).</p>
<p><i>Clear</i>: Bulk deletes a specified number of messages from a channel.</p>
<p><i>Kick</i>: Kicks a specified member from the server.</p>
<p><i>Say</i>: Tell the bot to send a specific message to a specific channel.</p>
<p><i>Roll</i>: Dice rolling simulator. Can roll with modifiers or with advantage or disadvantage (DnD style).</p>
<p><i>Advice</i>: 8-ball. Ask a yes or no question and get a response.</p>
<p><i>You</i>: Intended to be used to parse direct compliments/insults to the bot (Ex. You are beautiful). Bot will respond accordingly.</p>
<p><i>Chat</i>: Any input that isn't covered by an existing command gets sent here. Will parse the message and see if it recognizes a greeting/goodbye and response appropriately.</p>
