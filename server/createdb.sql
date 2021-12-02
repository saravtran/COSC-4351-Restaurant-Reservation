DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tables;

CREATE TABLE reservations (
    user_id VARCHAR,
    name CHAR(100),
    phone_num CHAR(10),
    email CHAR(100),
    date DATE,
    time TIME,
    guests INT
);

CREATE TABLE users (
    user_id VARCHAR,
    username CHAR(100),
    name CHAR(100),
    email CHAR(100),
    password VARCHAR NOT NULL
);

CREATE TABLE tables (
    table_id VARCHAR,
    available BOOLEAN,
    seats INT
);

INSERT INTO tables (table_id, available, seats) 
VALUES 
    ('1', TRUE, 2),
    ('2', TRUE, 2),
    ('3', TRUE, 2),
    ('4', TRUE, 2),
    ('5', TRUE, 4),
    ('6', TRUE, 4),
    ('7', TRUE, 4),
    ('8', TRUE, 6),
    ('9', TRUE, 6),
    ('10', TRUE, 8);