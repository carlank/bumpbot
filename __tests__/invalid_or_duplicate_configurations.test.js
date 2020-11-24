const Bot = require('../src/Bot.js');

test('overrides configuration when configuring an already configured channel', () => {
    let message = '';
    const bot = new Bot(120);

    bot.configure('test-channel', function () {
        message = 'should never happen';
    });

    bot.configure('test-channel', function () {
        message = 'verified'
    });

    bot.notify('test-channel', new Date(10000000));
    bot.reviveChannels(new Date(20000000));

    expect(message).toBe('verified');
});