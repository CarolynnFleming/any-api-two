const pool = require('../utils/pool');
module.exports = class Shoe {
    id;
    shoes_brand;
    shoe_type;

    constructor(row) {
        this.id = row.id;
        this.shoes_brand = row.shoes_brand;
        this.shoe_type = row.shoe_type;
    }

    static async insert({ shoes_brand, shoe_type }) {
        const { rows } = await pool.query(
            `INSERT 
            INTO
            shoes
            (shoes_brand, shoe_type)
            VALUES
            ($1, $2)
            RETURNING
            *;`, [shoes_brand, shoe_type]
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

static async updateById(id, { shoes_brand, shoe_type }) {
    const existingShoe = await Shoe.getById(id);
    if(!existingShoe) return null;

    const newShoes_brand = shoes_brand ?? existingShoe.shoes_brand;
    const newShoe_type = shoe_type ?? existingShoe.shoe_type;

    const { rows } = await pool.query(
        'UPDATE shoes SET shoes_brand=$2, shoe_type=$3 WHERE id=$1 RETURNING *;', [id, newShoes_brand, newShoe_type]
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