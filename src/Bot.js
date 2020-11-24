class Bot {

    /**
     * @param  {Number} waitingTime Time in seconds to wait before reviving
     */
    constructor(waitingTime) {
        this.channels = new Map();
        this.waitingTime = waitingTime * 1000;
    }

    /**
     * Update a channel's last updated time.
     * @param  {String} channel Channel ID
     * @param  {Date} date    Date to update to
     */
    notify(channel, date) {
        if (this.channels.has(channel)) {
            this.channels.get(channel).updated = date;
        }
    }
    /**
     * Configure a new channel
     * @param  {String}   channel  Channel ID
     * @param  {Function} callback Callback to execute upon revival
     */
    configure(channel, callback) {
        this.channels.set(channel, {callback, updated: new Date()});
    }

    /**
     * Remove a channel from the watchlist
     * @param  {String}   channel  Channel ID
     * @return {Boolean}           True if removed, false if not present
     */
    remove(channel, callback) {
        return this.channels.delete(channel);
    }

    /**
     * Revive all watched channels
     * @param  {Date}    date  Date of revival, normally now.
     */
    reviveChannels(date) {
        // console.log('revive');
        this.channels.forEach(channel => {
            // console.log(date.getTime(), channel.updated.getTime(), this.waitingTime)
            if (date.getTime() - channel.updated.getTime() > this.waitingTime) {
                channel.callback();
            }
        });
    }
}

module.exports = Bot;