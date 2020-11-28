module.exports = {
    name: 'autobump',
    description: 'Starts autobumping',
    execute(client, message, args) {
      const {channel, content, author} = message;

      const firstArgIsNumber = /^\d*$/.test(args[0]);
      let delay, tags;
      if(firstArgIsNumber){
        delay = Number(args[0]);
        tags = args.slice(1);
      } else {
        tags = args;
      }
      try {
        const config = {
          callback: (sourceMsg = "Autobumptastic") => {
            const {lastMessage} = channel;
            if (lastMessage && lastMessage.author === client.user) {
              lastMessage.delete();
            }
            channel.send(sourceMsg);
          }
        };
        if(delay){
          config.delay = delay;
        }
        if(tags){
          config.tags = tags;
        }
        client.bot.configureChannel(channel.id, config);
        channel.send(`Autobumping ${tags ? tags.join(', ') + ' ' : ''}every ${config.delay || client.bot.defaultDelay} seconds!`);
      } catch (e) {
        channel.send(`Not autobumping: ` + e);
      }
    }
}
