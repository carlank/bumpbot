import axios from 'axios';
const {MessageEmbed} = require('discord.js');

import Source from './Source.js';

export default class XkcdSource extends Source {
    /**
     * @return {string}
     */
    async getMessage() {
        let embed = 'Failed to create new embed';
        const response = await axios.get('https://xkcd.com/info.0.json');
        const latestComic = response.data['num'];
        let randomComicID = Math.floor((Math.random() * latestComic) + 1);
        if (randomComicID === 404.0) { randomComicID = 0; } // Avoid 404 page
        const url = `https://xkcd.com/${randomComicID}/info.0.json`;

        const comicResponse = await axios.get(url);
        const {title, img, alt, num} = comicResponse.data;
        embed = new MessageEmbed()
            .setImage(img)
            .setURL(`https://xkcd.com/${num}`)
            .setTitle(title)
            .setFooter(alt);
        return embed;
    }
}
