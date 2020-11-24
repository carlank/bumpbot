class Bot {
    constructor(waitingTime) {
        this.channels = {};
        this.waitingTime = waitingTime;
    }

    notify(channel, date) {
        if (this.channels.hasOwnProperty(channel)) {
            this.channels[channel].updated = date;
        }
    }

    configure(channel, callback) {
        if (this.channels[channel]) {
            this.channels[channel].callback('Already autobumping!');
            return;
        }
        this.channels[channel] = {"callback": callback, "updated": new Date()};
        callback('Autobumping!');
    }

    remove(channel, callback) {
        if (!this.channels[channel]) {
            callback('I wasn\'t doing anything?');
            return;
        }
        delete this.channels[channel];
        callback('Stopped bumping');
    }

    reviveChannels(date) {
        for (let channel in this.channels) {
            if (date.getTime() - this.channels[channel].updated.getTime() > this.waitingTime) {
                this.channels[channel].callback();
            }
        }
    }
}

module.exports = Bot;