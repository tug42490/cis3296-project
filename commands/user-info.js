module.exports = {
	name: 'user-info',
	description: 'user info',
	execute(message, args) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};