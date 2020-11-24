require('dotenv').config()

const {Client, MessageEmbed} = require('discord.js');
const client = new Client();

// ChannelID : Timestamp
const monitoredChannels = new Map();

// in ms
const bumpInterval = 1 * 1000;

client.on('ready', () => {
  console.log('READY');
})

client.on('message', message => {
  const monitored = monitoredChannels.has(message.channel.id);

  if(monitored){ // Update timestamp is channel is being monitored
    monitoredChannels.set(message.channel.id, Date.now());
  }

  switch(message.content){

    case '!autobump':
      if(monitored){
        message.channel.send('Already autobumping!');
      } else {
        message.channel.send(`Autobumping #${message.channel.name}`)
        monitoredChannels.set(message.channel.id, Date.now());
      }
      break;

    case '!debump':
      if(monitoredChannels.delete(message.channel.id)){
        message.channel.send(`Stopped bumping #${message.channel.name}`);
      } else {
        message.channel.send(`I wasn't doing anything?`);
      }
      break;

    case '!bump':
      message.channel.send('test');
      break;
  }
});

const bumpLoop = () => {
  /* Get the current timestamp */
  const now = Date.now();

  /* Iterate over all monitored channels */
  for(const [channelID, timestamp] of monitoredChannels){
    /* If enough time has passed since the last message */
    if(now > timestamp + bumpInterval){
      console.log(`Bumping ${channelID}`)
      /* Update last message timestamp */
      monitoredChannels.set(channelID, now);
      /* Send a bump message */
      client.channels.fetch(channelID)
        .then(channel => channel.send('autobump'));
    }
  }
}

setInterval(bumpLoop, 1000); // Nasty nasty nasty

client.login();