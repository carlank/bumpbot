import {MessageEmbed} from 'discord.js';

import commands from '../commands';

export default {
    name: 'Help',
    cmds: ['help', '?', 'man'],
    args: '[command]',
    helptext: 'Shows general help, or help for `command`.',
    description: 'Lists all available commands!',
    execute(client, message, args) {
        if(! commands.has(args[0])){
            const commandFields = [...new Set(commands.values())].map(command => ({
                name: `${command.name}`,
                value: `${command.cmds.map(cmd => `\`${cmd}\``).join(', ')}\n${command.description}`
            }));
            const embed = new MessageEmbed()
                .setTitle('Help')
                .setDescription(`Run a command with \`${client.prefix}<command>\`\nUse \`${client.prefix}help <command>\` for more info!`)
                .addFields(...commandFields);
            message.channel.send(embed);
        } else {
            const command = commands.get(args[0]);
            const embed = new MessageEmbed()
                .setTitle(command.name)
                .setDescription(`${command.cmds.map(cmd => `\`${cmd}\``).join('|')}${command?.args ? ` \`${command.args}\``: ''}\n${command.helptext}`);
            message.channel.send(embed);
        }
    }
};
