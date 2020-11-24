require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('message', message => {
  switch(message.content){
    case '!bump':
      message.channel.send('BUMP');
      break;
  }
});