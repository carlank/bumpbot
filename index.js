require('dotenv').config();
const fs = require("fs");
const {Client, Collection} = require('discord.js');
const Bot = require('./src/Bot.js');
const XkcdSource = require('./src/Source/XkcdSource.js');

const client = new Client();
client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`)

  client.commands.set(command.name, command)
}

const bot = new Bot();
module.exports = bot;
console.log('bot made, about to add')
bot.addSource(new XkcdSource());

client.on('ready', () => {
  console.log('READY');
});

client.on('message', message => {
  const prefix = "!";
  if(!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }
  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()
  if (!client.commands.has(command)){
    return;
  }

  try {
    client.commands.get(command).execute(client, message, args)
  } catch (e) {

  }
});

const bumpLoop = () => {
  bot.reviveChannels(new Date());
};

setInterval(bumpLoop, 1000); // Nasty nasty nasty

client.login();

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});
