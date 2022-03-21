const pool = require('../utils/pool');
module.exports = class Drink {
    id;
    drink_name;
    drink_type;

    constructor(row) {
        this.id = row.id;
        this. drink_name = row. drink_name;
        this.drink_type = row.drink_type;
    }

    static async insert({  drink_name, drink_type }) {
        const { rows } = await pool.query(
            `INSERT 
            INTO
            drinks
            ( drink_name, drink_type)
            VALUES
            ($1, $2)
            RETURNING
            *;`, [ drink_name, drink_type]
        );
        return new Drink(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            `SELECT 
            *
            FROM
            drinks`
        );
        return rows.map((item) => new Drink(item));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT
            *
            FROM
            drinks
            WHERE
            id=$1`,
            [id]
        );
        if(!rows[0]) return null;
        return new Drink(rows[0]);
}

static async updateById(id, {  drink_name, drink_type }) {
    const existingDrink = await Drink.getById(id);
    if(!existingDrink) return null;

    const newDrink_name =  drink_name ?? existingDrink.drink_name;
    const newDrink_type = drink_type ?? existingDrink.drink_type;

    const { rows } = await pool.query(
        'UPDATE drinks SET  drink_name=$2, drink_type=$3 WHERE id=$1 RETURNING *;', [id, newDrink_name, newDrink_type]
    );
    return new Drink(rows[0]);
}

static async deleteById(id) {
    const { rows } = await pool.query(
        `DELETE
        FROM
        drinks
        WHERE
        id=$1
        RETURNING *;`, [id]
    );
    if(!rows[0]) return null;
    return new Drink(rows[0]);
 }
};
