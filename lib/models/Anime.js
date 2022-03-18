const pool = require('../utils/pool');
module.exports = class Anime {
    id;
    name;
    character;
    episodes;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.character = row.character;
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
        return new Anime(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            `SELECT 
            *
            FROM
            animes`
        );
        return rows.map((item) => new Anime(item));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT
            *
            FROM
            animes
            WHERE
            id=$1`,
            [id]
        );
        if(!rows[0]) return null;
        return new Anime(rows[0]);
}
}
    
