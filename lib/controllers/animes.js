const { Router } = require('express');
const Anime = require('../models/Anime');
const pool = require('../utils/pool');

module.exports = Router()
.post('/', async (req, res) => {
    const anime = await Anime.insert(req.body);

    res.json(anime);
})
.get('/', async (req, res) => {
    const animes = Anime.getAll();
    res.json(animes);
})

