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
            anime`
        );
        return rows.map((item) => new Anime(item));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT
            *
            FROM
            anime
            WHERE
            id=$1`,
            [id]
        );
        if(!rows[0]) return null;
        return new Anime(rows[0]);
}

static async updateById(id, { name, character, episodes }) {
    const existingAnime = await Anime.getById(id);
    if(!existingAnime) return null;

    const newName = name ?? existingAnime.name;
    const newCharacter = character ?? existingAnime.character;
    const newEpisodes = episodes ?? existingAnime.episodes;

    const { rows } = await pool.query(
        'UPDATE anime SET name=$2, character=$3, episodes=$4, where id=$1 returning *;', [id, newName, newCharacter, newEpisodes]
    );
    return new Anime(rows[0]);
}
}
    
