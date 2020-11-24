require('dotenv').config();

const {Client} = require('discord.js');
const Bot = require('./src/Bot.js');

const client = new Client();
const bot = new Bot(10);

client.on('ready', () => {
  console.log('READY');
});

client.on('message', message => {
  bot.notify(message.channel.id, new Date());

  switch(message.content){

    case '!autobump':
      bot.configure(message.channel.id, msg =>{
          message.channel.send(msg);
      });
      break;

    case '!debump':
      bot.remove(message.channel.id, msg => {
        message.channel.send(msg);
      });
      break;

    case '!bump':
      message.channel.send('TheCodersThrone');
      break;
  }
});

const bumpLoop = () => {
  bot.reviveChannels(new Date());
};

setInterval(bumpLoop, 1000); // Nasty nasty nasty

client.login();
