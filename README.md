# generic-discord-bot
A generic, general purpose discord bot I built using the [Discord.js tutorials](https://discordjs.guide) as a guide. 
Works with Discord.js V12
Some code, like the command handler, was taken straight from the Discord.js tutorials. 

This is a stripped down version of a joke bot I made for a personal server, which is why the json files are so sparse. 

## Currently Implemented Commands: 
*Help*: Dynamic help command. Code repurposed from [here](https://discordjs.guide/command-handling/adding-features.html#a-dynamic-help-command).
*Clear*: Bulk deletes a specified number of messages from a channel.
*Kick*: Kicks a specified member from the server.
*Say*: Tell the bot to send a specific message to a specific channel.
*Roll*: Dice rolling simulator. Can roll with modifiers or with advantage or disadvantage (DnD style). 
*Advice*: 8-ball. Ask a yes or no question and get a response.  
*You*: Intended to be used to parse direct compliments/insults to the bot (Ex. You are beautiful). Bot will respond accordingly. 
*Chat*: Any input that isn't covered by an existing command gets sent here. Will parse the message and see if it recognizes a greeting/goodbye and response appropriately.
