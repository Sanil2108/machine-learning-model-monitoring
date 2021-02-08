-- Creating tables
CREATE TABLE IF NOT EXISTS user (
  users_id SERIAL PRIMARY_KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  registered_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS api_key (
  api_key_id SERIAL PRIMARY KEY,
  api_key TEXT NOT NULL UNIQUE,
  last_used TIMESTAMP,
  created_on TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS users_api_key (
  users_api_key_id SERIAL PRIMARY KEY,
  api_key_id INT NOT NULL,
  users_id INT NOT NULL
);

