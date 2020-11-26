const { bot } = require("../../index");

module.exports = {
    name: "bump",
    description: "bump command",

    async execute(client, message, args) {
        const {channel, content, author} = message;
        channel.send("TheCodersThrone");
    }
}