const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Anime = require('../lib/models/Anime');
const Book = require('../lib/models/Book');
const Food = require('../lib/models/Food');
const Drink = require('../lib/models/Drink');
const Shoe = require('../lib/models/Shoe');

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







  it('should be able to create an books', async () => {
    const res = await request(app)
    .post('/api/v1/books')
    .send({ title: 'FairyTale', author:'Natsu' });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'FairyTale',
      author: 'Natsu'
    });
  });

  it('should be able to list an book by id', async () => {
    const book = await Book.insert({ title: 'FairyTale', author: 'Natsu' });
    const res = await request(app).get(`/api/v1/books/${book.id}`);

    expect(res.body).toEqual(book);
  })
  it('should be able to list books', async () => {
    await Book.insert({ title: 'FairyTale', author: 'Natsu' });
    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        title: 'FairyTale',
        author: 'Natsu'
      }
    ]);
  });

  it('should be able to update books', async () => {
    const book = await Book.insert({ title: 'FairyTale', author: 'Natsu' }); 
    const res = await request(app)
    .patch(`/api/v1/books/${book.id}`)
    .send({title: 'Naruto', author: 'Sakura' });

    const expected = {
      id: expect.any(String),
      title: 'Naruto',
      author: 'Sakura',
  
    };

    expect(res.body).toEqual(expected);
    expect(await Book.getById(book.id)).toEqual(expected);
  });

  it('should be able to delete an book', async () => {
    const book = await Book.insert({ title: 'FairyTale', author: 'Natsu' });

  const res = await request(app).delete(`/api/v1/books/${book.id}`);

  expect(res.body).toEqual(book);
  expect(await Book.getById(book.id)).toBeNull();
  });






  it('should be able to create an food', async () => {
    const res = await request(app)
    .post('/api/v1/foods')
    .send({ dish_name: 'FairyTale', dish_type:'Natsu' });

    expect(res.body).toEqual({
      id: expect.any(String),
      dish_name: 'FairyTale',
      dish_type: 'Natsu'
    });
  });

  it('should be able to list an food by id', async () => {
    const food = await Food.insert({ dish_name: 'FairyTale', dish_type: 'Natsu' });
    const res = await request(app).get(`/api/v1/foods/${food.id}`);

    expect(res.body).toEqual(food);
  })
  it('should be able to list foods', async () => {
    await Food.insert({ dish_name: 'FairyTale', dish_type: 'Natsu' });
    const res = await request(app).get('/api/v1/foods');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        dish_name: 'FairyTale',
        dish_type: 'Natsu'
      }
    ]);
  });

  it('should be able to update foods', async () => {
    const food = await Food.insert({ dish_name: 'FairyTale', dish_type: 'Natsu' }); 
    const res = await request(app)
    .patch(`/api/v1/foods/${food.id}`)
    .send({ dish_name: 'Naruto', dish_type: 'Sakura' });

    const expected = {
      id: expect.any(String),
      dish_name: 'Naruto',
      dish_type: 'Sakura',
  
    };

    expect(res.body).toEqual(expected);
    expect(await Food.getById(food.id)).toEqual(expected);
  });

  it('should be able to delete an food', async () => {
    const food = await Food.insert({ dish_name: 'FairyTale', dish_type: 'Natsu' });

  const res = await request(app).delete(`/api/v1/foods/${food.id}`);

  expect(res.body).toEqual(food);
  expect(await Food.getById(food.id)).toBeNull();
  });








  it('should be able to create an drink', async () => {
    const res = await request(app)
    .post('/api/v1/drinks')
    .send({ drink_name: 'FairyTale', drink_type:'Natsu' });

    expect(res.body).toEqual({
      id: expect.any(String),
      drink_name: 'FairyTale',
      drink_type: 'Natsu'
    });
  });

  it('should be able to list an drink by id', async () => {
    const drink = await Drink.insert({ drink_name: 'FairyTale', drink_type: 'Natsu' });
    const res = await request(app).get(`/api/v1/drinks/${drink.id}`);

    expect(res.body).toEqual(drink);
  })
  it('should be able to list drinks', async () => {
    await Drink.insert({ drink_name: 'FairyTale', drink_type: 'Natsu' });
    const res = await request(app).get('/api/v1/drinks');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        drink_name: 'FairyTale',
        drink_type: 'Natsu'
      }
    ]);
  });

  it('should be able to update drinks', async () => {
    const drink = await Drink.insert({ drink_name: 'FairyTale', drink_type: 'Natsu' }); 
    const res = await request(app)
    .patch(`/api/v1/drinks/${drink.id}`)
    .send({ drink_name: 'Naruto', drink_type: 'Sakura' });

    const expected = {
      id: expect.any(String),
      drink_name: 'Naruto',
      drink_type: 'Sakura',
  
    };

    expect(res.body).toEqual(expected);
    expect(await Drink.getById(drink.id)).toEqual(expected);
  });

  it('should be able to delete an drink', async () => {
    const drink = await Drink.insert({ drink_name: 'FairyTale', drink_type: 'Natsu' });

  const res = await request(app).delete(`/api/v1/drinks/${drink.id}`);

  expect(res.body).toEqual(drink);
  expect(await Drink.getById(drink.id)).toBeNull();
  });






  it('should be able to create an shoe', async () => {
    const res = await request(app)
    .post('/api/v1/shoes')
    .send({ shoe_brand: 'FairyTale', shoe_type:'Natsu' });

    expect(res.body).toEqual({
      id: expect.any(String),
      shoe_brand: 'FairyTale',
      shoe_type: 'Natsu'
    });
  });

  it('should be able to list an shoe by id', async () => {
    const shoe = await Shoe.insert({ shoe_brand: 'FairyTale', shoe_type: 'Natsu' });
    const res = await request(app).get(`/api/v1/shoes/${shoe.id}`);

    expect(res.body).toEqual(shoe);
  })
  it('should be able to list shoes', async () => {
    await Shoe.insert({ shoe_brand: 'FairyTale', shoe_type: 'Natsu' });
    const res = await request(app).get('/api/v1/shoes');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        shoe_brand: 'FairyTale',
        shoe_type: 'Natsu'
      }
    ]);
  });

  it('should be able to update shoes', async () => {
    const shoe = await Shoe.insert({ shoe_brand: 'FairyTale', shoe_type: 'Natsu' }); 
    const res = await request(app)
    .patch(`/api/v1/shoes/${shoe.id}`)
    .send({ shoe_brand: 'Naruto', shoe_type: 'Sakura' });

    const expected = {
      id: expect.any(String),
      shoe_brand: 'Naruto',
      shoe_type: 'Sakura',
  
    };

    expect(res.body).toEqual(expected);
    expect(await Shoe.getById(shoe.id)).toEqual(expected);
  });

  it('should be able to delete an shoe', async () => {
    const shoe = await Shoe.insert({ shoe_brand: 'FairyTale', shoe_type: 'Natsu' });

  const res = await request(app).delete(`/api/v1/shoes/${shoe.id}`);

  expect(res.body).toEqual(shoe);
  expect(await Shoe.getById(shoe.id)).toBeNull();
  });
});






