const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
  if (msg.content === '!help') {
    msg.reply('What can I do for you?');
  }
  if(msg.content.startsWith('!clear')){
    msg.channel.messages.fetch({ limit: 100 }).then(messages => {
      msg.channel.bulkDelete(messages)
    });
  }
});

client.login('Nzc1MDY5MDgyMDMzODQ4NDAy.X6g9VQ.GhYff6X4hWZOm_bKlIuEfQ7c8bg');
