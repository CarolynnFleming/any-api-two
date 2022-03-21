const { Router } = require('express');
const Shoe = require('../models/Shoe');
const pool = require('../utils/pool');

module.exports = Router()
.post('/', async (req, res) => {
    const shoe = await Shoe.insert(req.body);

    res.json(shoe);
})

.get('/:id', async (req, res) => {
    const shoe = await Shoe.getById(req.params.id);
    res.json(shoe);
})

.get('/', async (req, res) => {
    const shoes = await Shoe.getAll();
    res.json(shoes);
})

.patch('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;

        const existingShoe = await Shoe.updateById(id, req.body);

        if(!existingShoe) {
            const error = new Error(`Shoe ${id} not found `);
            error.status = 404;
            throw error;
        }
        res.json(existingShoe);
    } catch (error) {
        next(error);
    }
})

.delete('/:id', async (req, res) => {
    const { rows } = await pool.query(
        'DELETE FROM SHOES WHERE id=$1 RETURNING *;', [req.params.id]
    );
    if(!rows[0]) return null;
    const shoe = new Shoe(rows[0]);

    res.json(shoe);
});
