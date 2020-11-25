require('dotenv').config();

const {Client} = require('discord.js');
const Bot = require('./src/Bot.js');
const XkcdSource = require('./src/Source/XkcdSource.js');

const client = new Client();
const bot = new Bot();
console.log('bot made, about to add')
bot.addSource(new XkcdSource());

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
      const firstArgIsNumber = /^\d*$/.test(args[0]);
      let delay, tags;
      if(firstArgIsNumber){
        delay = args[0];
        tags = args.slice(1);
      } else {
        tags = args;
      }
      try {
        const config = {
          callback: (sourceMsg) => {
            const {lastMessage} = channel;
            if (lastMessage && lastMessage.author === client.user) {
              lastMessage.delete();
            }
            channel.send(sourceMsg || 'Autobumptastic');
          }
        };
        if(delay){
          config.delay = Number(delay);
        }
        if(tags){
          config.tags = tags;
        }
        bot.configureChannel(channel.id, config);
        channel.send(`Autobumping ${tags ? tags.join(', ') + ' ' : ''}every ${config.delay || bot.defaultDelay} seconds!`);
      } catch (e) {
        channel.send(`Not autobumping: ` + e);
      }
      break;

    case '!debump':
      if(bot.removeChannel(channel.id)){
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

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});
