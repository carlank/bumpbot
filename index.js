require('dotenv').config();

const {Client} = require('discord.js');
const Bot = require('./src/Bot.js');

const client = new Client();
const bot = new Bot(10);

client.on('ready', () => {
  console.log('READY');
});

client.on('message', message => {
  const {channel} = message;

  bot.notify(channel.id, new Date());

  switch(message.content){

    case '!autobump':
      bot.configure(channel.id, () =>{
          channel.send('Autobumptastic');
      });
      break;

    case '!debump':
      if(bot.remove(channel.id)){
        channel.send('Stopping autobumping');
      } else {
        channel.send(`I wasn't doing anything?`);
      }
      break;

    case '!bump':
      channel.send('TheCodersThrone');
      break;
  }
});

const bumpLoop = () => {
  bot.reviveChannels(new Date());
};

setInterval(bumpLoop, 1000); // Nasty nasty nasty

client.login();