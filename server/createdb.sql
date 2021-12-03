DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tables;
DROP TABLE IF EXISTS table_combinations;

CREATE TABLE reservations (
    user_id VARCHAR,
    name CHAR(100),
    phone_num CHAR(10),
    email CHAR(100),
    date DATE,
    time TIME,
    guests INT,
    table_id VARCHAR
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

CREATE TABLE table_combinations (
    table_a VARCHAR,
    table_b VARCHAR,
    seats INT,
    available BOOLEAN,
    table_id VARCHAR
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

INSERT INTO table_combinations (table_a, table_b)
SELECT t1.table_id, t2.table_id 
FROM tables t1 
JOIN tables t2 
ON t1.table_id < t2.table_id;

ALTER TABLE table_combinations ADD combi_id serial;

UPDATE table_combinations
SET seats = ((SELECT seats FROM tables WHERE table_id = table_a) + (SELECT seats FROM tables WHERE table_id = table_b));

UPDATE table_combinations
SET available = ((SELECT available FROM tables WHERE table_id = table_a) AND (SELECT available FROM tables WHERE table_id = table_b));

update table_combinations set table_id = concat(table_a, ', ', table_b); 