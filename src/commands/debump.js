export default {
    name: 'Stop Autobump',
    cmds: ['debump', 'stop'],
    args: '',
    helptext: 'Stops autobumping the channel this is used in.',
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
