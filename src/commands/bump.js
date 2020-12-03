export default {
    name: 'Bump',
    cmds: ['bump'],
    args: '',
    helptext: 'Bumps the channel once!',
    description: 'Bumps the channel once',
    execute(client, message) {
        message.channel.send('Remember anyone of you guys can become a champion!! Feel free to apply!');
    }
};
