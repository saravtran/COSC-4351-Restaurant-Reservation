DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS users;

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