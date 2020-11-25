const Bot = require('../src/Bot.js');
const StaticSource = require('../src/Source/StaticSource.js');

test('fetches the source with the matching tag', () => {
    let message = '';
    const bot = new Bot();

    const correctSource = new StaticSource('expected', ['tag']);

    bot.addSource(correctSource);
    bot.addSource(new StaticSource('unexpected', ['no']));

    bot.configureChannel('test-channel', {
        delay: 10,
        callback: msg => {
            message = msg;
        },
        tags: ['tag']
    });
    expect(bot.chooseSourceFor(bot.channels.get('test-channel'))).toBe(correctSource);
});