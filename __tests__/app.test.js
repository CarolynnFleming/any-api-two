const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Anime = require('../lib/models/Anime');

describe('api-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create an anime', async () => {
    const res = await request(app)
    .post('/api/v1/animes')
    .send({ name: 'FairyTale', character:'Natsu', episodes: 328 });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'FairyTale',
      character: 'Natsu',
      episodes: 328
    });
  });

  it('should be able to list an anime by id', async () => {
    const anime = await Anime.insert({ name: 'FairyTale', character: 'Natsu', episodes: 328 });
    const res = await request(app).get(`/api/v1/animes/${anime.id}`);

    expect(res.body).toEqual(anime);
  })
  it('should be able to list animes', async () => {
    await Anime.insert({ name: 'FairyTale', character: 'Natsu', episodes: 328});
    const res = await request(app).get('/api/v1/animes');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: 'FairyTale',
        character: 'Natsu',
        episodes: 328
      }
    ]);
  });

  it('should be able to update anime', async () => {
    const anime = await Anime.insert({ name: 'FairyTale', character: 'Natsu', episodes: 328}); 
    const res = await request(app)
    .patch(`/api/v1/animes/${anime.id}`)
    .send({name: 'Naruto', character: 'Sakura', episodes: 500 });

    const expected = {
      id: expect.any(String),
      name: 'Naruto',
      character: 'Sakura',
      episodes: 500,
    };

    expect(res.body).toEqual(expected);
    expect(await Anime.getById(anime.id)).toEqual(expected);
  });

  it('should be able to delete an anime', async () => {
    const anime = await Anime.insert({ name: 'FairyTale', character: 'Natsu', episodes: 328 });

  const res = await request(app).delete(`/api/v1/animes/${anime.id}`);

  expect(res.body).toEqual(anime);
  expect(await Anime.getById(anime.id)).toBeNull();
  });
});
