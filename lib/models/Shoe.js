const pool = require('../utils/pool');
module.exports = class Shoe {
    id;
    shoes_brand;
    shoe_type;

    constructor(row) {
        this.id = row.id;
        this.shoe_brand = row.shoe_brand;
        this.shoe_type = row.shoe_type;
    }

    static async insert({ shoe_brand, shoe_type }) {
        const { rows } = await pool.query(
            `INSERT 
            INTO
            shoes
            (shoe_brand, shoe_type)
            VALUES
            ($1, $2)
            RETURNING
            *;`, [shoe_brand, shoe_type]
        );
        return new Shoe(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            `SELECT 
            *
            FROM
            shoes`
        );
        return rows.map((item) => new Shoe(item));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT
            *
            FROM
            shoes
            WHERE
            id=$1`,
            [id]
        );
        if(!rows[0]) return null;
        return new Shoe(rows[0]);
}

static async updateById(id, { shoe_brand, shoe_type }) {
    const existingShoe = await Shoe.getById(id);
    if(!existingShoe) return null;

    const newShoe_brand = shoe_brand ?? existingShoe.shoe_brand;
    const newShoe_type = shoe_type ?? existingShoe.shoe_type;

    const { rows } = await pool.query(
        'UPDATE shoes SET shoe_brand=$2, shoe_type=$3 WHERE id=$1 RETURNING *;', [id, newShoe_brand, newShoe_type]
    );
    return new Shoe(rows[0]);
}

static async deleteById(id) {
    const { rows } = await pool.query(
        `DELETE
        FROM
        shoes
        WHERE
        id=$1
        RETURNING *;`, [id]
    );
    if(!rows[0]) return null;
    return new Shoe(rows[0]);
 }
};