require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();


client.on('message', message => {
  switch(message.content){
    case '!bump':
      message.channel.send('TheCodersThrone');
      break;
  }
});

client.login();