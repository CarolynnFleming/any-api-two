const { Router } = require('express');
const Anime = require('../models/Anime');
const pool = require('../utils/pool');

module.exports = Router()
.post('/', async (req, res) => {
    const anime = await Anime.insert(req.body);

    res.json(anime);
})

.get('/:id', async (req, res) => {
    const anime = await Anime.getById(req.params.id);
    res.json(anime);
})

.get('/', async (req, res) => {
    const animes = await Anime.getAll();
    res.json(animes);
})

.patch('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;

        const existingAnime = await Anime.updateById(id, req.body);

        if(!existingAnime) {
            const error = new Error(`Anime ${id} not found `);
            error.status = 404;
            throw error;
        }
        res.json(existingAnime);
    } catch (error) {
        next(error);
    }
})
