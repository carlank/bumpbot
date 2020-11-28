import fs from 'fs';

const commands = new Map();
const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    import(`./${file}`).then(commandModule => {
        const command = commandModule.default;
        commands.set(command.name, command);
    });
}

export default commands;