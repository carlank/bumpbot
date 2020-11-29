export default {
    name: 'Bump',
    cmds: ['bump'],
    args: '',
    helptext: 'Bumps the channel once!',
    description: 'Bumps the channel once',
    execute(client, message) {
        message.channel.send('Wake up!');
    }
};
