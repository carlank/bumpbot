require('dotenv').config();

const {Client} = require('discord.js');
const Bot = require('./src/Bot.js');

const client = new Client();
const bot = new Bot();

client.on('ready', () => {
  console.log('READY');
});

client.on('message', message => {
  const {channel, content, author} = message;
  bot.notify(channel.id, new Date());

  if(author.bot || !content.startsWith('!')){
    return;
  }

  const args = content.trim().split(' ');
  const command = args.shift().toLowerCase();

  switch(command){

    case '!autobump':
      const delay = args[0] || 10 * 60; // Ten minute default delay
      try {
        bot.configure(channel.id, delay, () => {
          const {lastMessage} = channel;
          if (lastMessage && lastMessage.author === client.user) {
            lastMessage.delete();
          }
          channel.send('Autobumptastic');
        });
        channel.send(`Autobumping every ${delay} seconds!`);
      } catch (e) {
        channel.send(`Cannot autobump: ` + e);
      }
      break;

    case '!debump':
      try{
        if(bot.remove(channel.id)){
          channel.send('Stopping autobumping');
        } else {
          channel.send(`I wasn't doing anything?`);
        }
      } catch (e) {
        channel.send(`Cannot debump: ` + e);
      }
      break;

    case '!bump':
      channel.send('TheCodersThrone');
      break;
  }
});

const bumpLoop = () => {
  try{
    bot.reviveChannels(new Date());
  } catch (e) {
    console.error(`Failed to revive: ` + e);
  }
};

setInterval(bumpLoop, 1000); // Nasty nasty nasty

client.login();

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});
