import fs from 'fs';

const commands = new Map();
const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && !/^index.js$/.test(file));

for (const file of commandFiles) {
    import(`./${file}`).then(commandModule => {
        const command = commandModule.default;
        for(const cmd of command.cmds){
            commands.set(cmd, command);
        }
    });
}

export default commands;