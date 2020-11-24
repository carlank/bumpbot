require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();


client.on('message', message => {
  switch(message.content){
    case '!bump':
<<<<<<< Updated upstream
      message.channel.send('BUMP');
=======
      message.channel.send('Don't be a party pooper, send a message!!);
>>>>>>> Stashed changes
      break;
  }
});

client.login();