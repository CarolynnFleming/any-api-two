const { Router } = require('express');
const Drink = require('../models/Drink');
const pool = require('../utils/pool');

module.exports = Router()
.post('/', async (req, res) => {
    const drink = await Drink.insert(req.body);

    res.json(drink);
})

.get('/:id', async (req, res) => {
    const drink = await Drink.getById(req.params.id);
    res.json(drink);
})

.get('/', async (req, res) => {
    const drinks = await Drink.getAll();
    res.json(drinks);
})

.patch('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;

        const existingDrink = await Drink.updateById(id, req.body);

        if(!existingDrink) {
            const error = new Error(`Drink ${id} not found `);
            error.status = 404;
            throw error;
        }
        res.json(existingDrink);
    } catch (error) {
        next(error);
    }
})

.delete('/:id', async (req, res) => {
    const { rows } = await pool.query(
        'DELETE FROM DRINKS WHERE id=$1 RETURNING *;', [req.params.id]
    );
    if(!rows[0]) return null;
    const drink = new Drink(rows[0]);

    res.json(drink);
});
