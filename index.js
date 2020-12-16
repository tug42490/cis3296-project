const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();
let blockedWords = [];

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (commandName === 'banword') {
		if (!args.length) {
			let reply = 'You didn\'t provide any arguments, ${message.author}!';
			reply += '\nThe proper usage would be: \'${prefix}${command.name} wordToBan\'';
			message.channel.send(reply);
		}
		else if (!blockedWords.includes(args[0])) {
			blockedWords.push(args[0]);
			message.channel.send('The word ' + args[0] + ' has been added to the filter list.');
		}
		return;
	}
	if (commandName === 'unbanword') {
		if (!args.length) {
			let reply = 'You didn\'t provide any arguments, ${message.author}!';
			reply += '\nThe proper usage would be: \'${prefix}${command.name} wordToUnban\'';
			message.channel.send(reply);
		}
		else if (blockedWords.includes(args[0])) {
			blockedWords = blockedWords.filter(item => item !== args[0]);
			message.channel.send('The word ' + args[0] + ' has been removed from the filter list.');
		}
		return;
	}
	if (commandName === 'seebannedwords') {
		let reply = 'Banned Words: ';
		for (var i = 0; i < blockedWords.length; i++) {
			reply += '\n' + blockedWords[i];
		}
		message.channel.send(reply);
		return;
	}

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
	for (var i = 0; i < blockedWords.length; i++) {
		if (blockedWords.filter((word) => {
			const regex = new RegExp(`\\b${word}\\b`, 'i');
			// \b is an escape sequence (backspace) within a string. In order to actually
			// include \b in the string, the \ needs to be escaped with another \ .
		  
			return regex.test(message.content.toLowerCase);
		  })) {
			message.delete();
			message.channel.send('Sorry, that message included a banned word.');
		}
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	if (!command) return;
	
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside a DM.');
	}
	
	if (command.args && !args.length) {
		let reply = 'You didn\'t provide any arguments, ${message.author}!';
		
		if (command.usage) {
			reply += '\nThe proper usage would be: \'${prefix}${command.name} ${command.usage}\'';
		}
		return message.channel.send(reply);
	}
	
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply('Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \'${command.name}\' command.');
		}
	}
	
	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command.');
	}
});

client.login(token);