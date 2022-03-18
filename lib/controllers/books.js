const { Router } = require('express');
const Book = require('../models/Book');
const pool = require('../utils/pool');

module.exports = Router()
.post('/', async (req, res) => {
    const book = await Book.insert(req.body);

    res.json(book);
})

.get('/:id', async (req, res) => {
    const book = await Book.getById(req.params.id);
    res.json(book);
})

.get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
})

.patch('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;

        const existingBook = await Book.updateById(id, req.body);

        if(!existingBook) {
            const error = new Error(`Book ${id} not found `);
            error.status = 404;
            throw error;
        }
        res.json(existingBook);
    } catch (error) {
        next(error);
    }
})

.delete('/:id', async (req, res) => {
    const { rows } = await pool.query(
        'DELETE FROM BOOKS WHERE id=$1 RETURNING *;', [req.params.id]
    );
    if(!rows[0]) return null;
    const book = new Book(rows[0]);

    res.json(book);
});
