-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS lists CASCADE;
CREATE TABLE lists (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  priority BOOLEAN DEFAULT FALSE,
  is_checked BOOLEAN DEFAULT FALSE,
  list_type VARCHAR(1)
);
