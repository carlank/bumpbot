const Source = require('./Source.js');

class StaticSource extends Source {
    /**
     * @param {string} message The message to respond with
     * @param {string[]} tags  The tags to respond to
     */
    constructor(message, tags) {
        super(tags);
        this.message = message;
    }

    /**
     * @return {string}
     */
    getMessage() {
        return this.message;
    }
}

module.exports = StaticSource;
