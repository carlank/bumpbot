export default {
    name: 'debump',
    description: 'Stops autobumping.',
    execute(client, message) {
        const {channel} = message;
        if(client.bot.removeChannel(channel.id)){
            channel.send('Stopping autobumping');
        } else {
            channel.send('I wasn\'t doing anything?');
        }
    }
};
