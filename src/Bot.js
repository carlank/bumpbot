class Bot {
    constructor(waitingTime) {
        this.channels = new Map();
        this.waitingTime = waitingTime;
    }

    notify(channel, date) {
        if (this.channels.has(channel)) {
            this.channels.get(channel).updated = date;
        }
    }

    configure(channel, callback) {
        if (this.channels.has(channel)) {
            this.channels.get(channel).callback('Already autobumping!');
            return;
        }
        this.channels.set(channel, {"callback": callback, "updated": new Date()});
        callback('Autobumping!');
    }

    remove(channel, callback) {
        if (!this.channels.has(channel)) {
            callback('I wasn\'t doing anything?');
            return;
        }
        this.channels.delete(channel);
        callback('Stopped bumping');
    }

    reviveChannels(date) {
        this.channels.forEach((channel) => {
            if (date.getTime() - channel.updated.getTime() > this.waitingTime) {
                channel.callback();
            }
        });
    }
}

module.exports = Bot;