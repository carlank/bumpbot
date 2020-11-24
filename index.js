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
      if(delay < 10){
        channel.send(`That's too often! Choose a time over 10 seconds.`)
        break;
      }
      channel.send(`Autobumping every ${delay} seconds!`);
      bot.configure(channel.id, delay, () =>{
          const {lastMessage} = channel;
          // console.log('message', lastMessage.author, client.user);
          if(lastMessage && lastMessage.author === client.user){
            lastMessage.delete();
          }
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

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});
