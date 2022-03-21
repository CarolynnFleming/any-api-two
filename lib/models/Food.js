const pool = require('../utils/pool');
module.exports = class Food {
    id;
    dish_name;
    dish_type;

    constructor(row) {
        this.id = row.id;
        this.dish_name = row.dish_name;
        this.dish_type = row.dish_type;
    }

    static async insert({ dish_name, dish_type }) {
        const { rows } = await pool.query(
            `INSERT 
            INTO
            food
            (dish_name, dish_type)
            VALUES
            ($1, $2)
            RETURNING
            *;`, [dish_name, dish_type]
        );
        return new Food(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            `SELECT 
            *
            FROM
            food`
        );
        return rows.map((item) => new Food(item));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT
            *
            FROM
            food
            WHERE
            id=$1`,
            [id]
        );
        if(!rows[0]) return null;
        return new Food(rows[0]);
}

static async updateById(id, { dish_name, dish_type }) {
    const existingFood = await Food.getById(id);
    if(!existingFood) return null;

    const newDish_name = dish_name ?? existingFood.dish_name;
    const newDish_type = dish_type ?? existingFood.Dish_type;

    const { rows } = await pool.query(
        'UPDATE food SET dish_name=$2, dish_type=$3 WHERE id=$1 RETURNING *;', [id, newDish_name, newDish_type]
    );
    return new Food(rows[0]);
}

static async deleteById(id) {
    const { rows } = await pool.query(
        `DELETE
        FROM
        food
        WHERE
        id=$1
        RETURNING *;`, [id]
    );
    if(!rows[0]) return null;
    return new Food(rows[0]);
 }
};