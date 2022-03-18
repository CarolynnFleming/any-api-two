const { Router } = require('express');
const Food = require('../models/Food');
const pool = require('../utils/pool');

module.exports = Router()
.post('/', async (req, res) => {
    const food = await Food.insert(req.body);

    res.json(food);
})

.get('/:id', async (req, res) => {
    const food = await Food.getById(req.params.id);
    res.json(food);
})

.get('/', async (req, res) => {
    const foods = await Food.getAll();
    res.json(foods);
})

.patch('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;

        const existingFood = await Food.updateById(id, req.body);

        if(!existingFood) {
            const error = new Error(`Food ${id} not found `);
            error.status = 404;
            throw error;
        }
        res.json(existingFood);
    } catch (error) {
        next(error);
    }
})

.delete('/:id', async (req, res) => {
    const { rows } = await pool.query(
        'DELETE FROM FOOD WHERE id=$1 RETURNING *;', [req.params.id]
    );
    if(!rows[0]) return null;
    const food = new Food(rows[0]);

    res.json(food);
});
