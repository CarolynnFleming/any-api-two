const pool = require('../utils/pool');
module.exports = class Book {
    id;
    title;
    author;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.author = row.author;
    }

    static async insert({ title, author }) {
        const { rows } = await pool.query(
            `INSERT 
            INTO
            books
            (title, author)
            VALUES
            ($1, $2)
            RETURNING
            *;`, [title, author]
        );
        return new Book(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            `SELECT 
            *
            FROM
            books`
        );
        return rows.map((item) => new Book(item));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT
            *
            FROM
            books
            WHERE
            id=$1`,
            [id]
        );
        if(!rows[0]) return null;
        return new Book(rows[0]);
}

static async updateById(id, { title, author }) {
    const existingBook = await Book.getById(id);
    if(!existingBook) return null;

    const newTitle = title ?? existingBook.title;
    const newAuthor = author ?? existingBook.author;

    const { rows } = await pool.query(
        'UPDATE books SET title=$2, author=$3 WHERE id=$1 RETURNING *;', [id, newTitle, newAuthor]
    );
    return new Book(rows[0]);
}

static async deleteById(id) {
    const { rows } = await pool.query(
        `DELETE
        FROM
        books
        WHERE
        id=$1
        RETURNING *;`, [id]
    );
    if(!rows[0]) return null;
    return new Book(rows[0]);
 }
};