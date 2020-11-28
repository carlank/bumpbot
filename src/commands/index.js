const fs = require('fs');

const commands = new Map();
const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./${file}`);
    commands.set(command.name, command);
}

module.exports = commands;