CREATE TABLE IF NOT EXISTS webcams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    date TIMESTAMPTZ,
    url TEXT,
    location TEXT
);