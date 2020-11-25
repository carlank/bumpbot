const axios = require('axios');

const {MessageEmbed} = require('discord.js');
const Source = require('./Source.js');

class XkcdSource extends Source {
    constructor() {
        console.log('building xkcdsource')
        super(['xkcd']);
        console.log(this)
    }

    /**
     * @return {string}
     */
    async getMessage() {
        console.log('fetching xkcd')
        let embed = 'Failed to create new embed';
        const response = await axios.get('http://xkcd.com/info.0.json')
        const latestComic = response.data['num'];
        const randomComicID = Math.floor((Math.random() * latestComic) + 1);
        if (randomComicID == 404) { randomComicID = 0; } // Avoid 404 page
        const url = 'http://xkcd.com/' + randomComicID + '/info.0.json';

        const comicResponse = await axios.get(url);
        const {title, img, alt} = comicResponse.data;
        embed = new MessageEmbed()
            .setImage(img)
            .setTitle(title)
            .setDescription(alt);
        return embed;
    }
}

module.exports = XkcdSource;