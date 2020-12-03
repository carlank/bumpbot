export default {
    name: 'Configure',
    cmds: ['config', 'set'],
    args: 'key value',
    helptext:
    `Set configuration options`,
    description: 'Configures options',
    execute(client, message, args) {
        const {channel, author} = message;
        if(!client.isMod(author.id)){
            channel.send(`You do not have permissions for that action!`);
            return;
        }

        try {
            console.log(args)
            const key = args[0];
            const value = args.slice(0).join(' ')
            switch(key){
                case 'bump':
                    client.bumpMessage = value;
                    channel.send(`Bump message set to "${value}".`);
                    break;
                case 'mod':
                    client.addMod(message.mentions.users.first());
                    channel.send(`${message.mentions.users.first()} is now a mod.`)
            }
        } catch (e) {
            channel.send('Failed to set command: ' + e);
        }
    }
};
