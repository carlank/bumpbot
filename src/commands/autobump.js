const { bot } = require("../../index")
module.exports = {
    name: "autobump",
    // I'll fix descriptions later
    description: 'the autobump command',

    async execute(client, message, args) {
      const {channel, content, author} = message;
      bot.notify(channel.id, new Date());


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
    }
}