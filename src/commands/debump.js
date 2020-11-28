module.exports = {
    name: 'debump',
    description: 'Stops autobumping.',
    execute(client, message, args) {
      const {channel, content, author} = message;
      if(client.bot.removeChannel(channel.id)){
        channel.send('Stopping autobumping');
      } else {
        channel.send(`I wasn't doing anything?`);
      }
    }
}
