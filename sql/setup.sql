-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS anime;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS food;
DROP TABLE IF EXISTS drinks;
DROP TABLE IF EXISTS shoes;

CREATE TABLE anime(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    episodes  INT NOT NULL,
    character TEXT NOT NULL
);

CREATE TABLE books(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Title TEXT NOT NULL,
    Author TEXT NOT NULL
);

CREATE TABLE food(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    dish_name TEXT NOT NULL,
    dish_type TEXT NOT NULL
);

CREATE TABLE drinks(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    drink_name TEXT NOT NULL,
    drink_type TEXT NOT NULL
);

CREATE TABLE shoes(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    shoe_brand TEXT NOT NULL,
    shoe_type TEXT NOT NULL
);