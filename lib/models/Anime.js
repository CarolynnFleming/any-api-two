const pool = require('../utils/pool');
module.exports = class Anime {
    id;
    name;
    character;
    episodes;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.name = row.character;
        this.episodes = row.episodes;
    }

    static async insert({ name, character, episodes }) {
        
    }
}