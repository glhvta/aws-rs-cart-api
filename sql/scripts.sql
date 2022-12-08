-- create extension if not exists "uuid-ossp";

-- DROP TABLE cart_items;
-- DROP TABLE carts;

-- CREATE TABLE carts (
-- 	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
-- 	user_id uuid NOT NULL,
-- 	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- 	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE cart_items (
--     product_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     cart_id uuid,
--     count integer,
--     foreign key ("cart_id") references "carts" ("id") ON DELETE CASCADE
-- )

-- INSERT INTO carts (created_at, updated_at, user_id) values 
-- ('2022-12-01', '2022-12-01', '2b69dc63-7148-4056-b7ba-c0ff262dffb0'),
-- ('2022-12-02', '2022-12-02', '2b69dc63-7148-4056-b7ba-c0ff262dffb0'),
-- ('2022-12-02', '2022-12-06', '2b69dc63-7148-4056-b7ba-c0ff262dffb0')
-- ;

-- insert into cart_items (cart_id, count) values
-- ('fffb21e0-5408-4ea1-93a8-1f9ebf8b5f07', 10),
-- ('fffb21e0-5408-4ea1-93a8-1f9ebf8b5f07', 5),
-- ('fffb21e0-5408-4ea1-93a8-1f9ebf8b5f07', 50)
-- ;

CREATE TABLE users (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	name text NOT NULL,
    password text NOT NULL,
    email text
);