const Bot = require('../src/Bot.js');

test('overrides configuration when configuring an already configured channel', () => {
    let message = '';
    const bot = new Bot();

    bot.configureChannel('test-channel', {
        delay: 10,
        callback: () => {
            message = 'should never happen';
        }
    });

    bot.configureChannel('test-channel', {
        delay: 10,
        callback: () => {
            message = 'verified';
        }
    });

    bot.notify('test-channel', new Date(0));
    bot.reviveChannels(new Date(15 * 1000));

    expect(message).toBe('verified');
});

test('refuses to remove an already removed channel', () => {
    const bot = new Bot();
    const successfullyRemoved = bot.removeChannel('test-channel');
    expect(successfullyRemoved).toBe(false);
});

test('refuses timeouts below 10 seconds', () => {
    const bot = new Bot();
    expect(() => {
        bot.configureChannel('test-channel', {
            delay: 5
        });
    }).toThrow('10 seconds');
});
