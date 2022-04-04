CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id REFERENCES users(id),
  order_status VARCHAR(100)
);  