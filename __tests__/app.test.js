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

  it
});
