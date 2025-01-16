CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE IF NOT EXISTS cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value INT NOT NULL,
    content TEXT NOT NULL
);

INSERT INTO cards (name, value, content) VALUES 
    ('Card 1', 1, 'Some content for Card 1'),
    ('Card 2', 2, 'Some content for Card 2'),
    ('Card 3', 3, 'Some content for Card 3'),
    ('Card 4', 4, 'Some content for Card 4'),
    ('Card 5', 5, 'Some content for Card 5'),
    ('Card 6', 6, 'Some content for Card 6'),
    ('Card 7', 7, 'Some content for Card 7'),
    ('Card 8', 8, 'Some content for Card 8'),
    ('Card 9', 9, 'Some content for Card 9'),
    ('Card 10', 10, 'Some content for Card 10');

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (email, password) VALUES ('admin@gmail.com', 'admin');