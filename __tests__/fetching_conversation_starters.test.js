const Bot = require('../src/Bot.js');
const StaticSource = require('../src/Source/StaticSource.js');

test('fetches the source with the matching tag', () => {
    let message = '';
    const bot = new Bot();

    bot.addSource(new StaticSource('expected', ['tag']));
    bot.addSource(new StaticSource('unexpected', ['no']));

    bot.configureChannel('test-channel', {
        delay: 10,
        callback: msg => {
            message = msg;
        },
        tags: ['tag']
    });

    bot.notify('test-channel', new Date(0));
    bot.reviveChannels(new Date(15 * 1000));

    expect(message).toBe('expected');
});