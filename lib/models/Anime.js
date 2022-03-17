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
        const { rows } = await pool.query(
            `INSERT 
            INTO
            anime
            (name, character, episodes)
            VALUES
            ($1, $2, $3)
            RETURNING
            *;`, [name, character, episodes]
        );
        return new Anime(row[0]);
    }
}