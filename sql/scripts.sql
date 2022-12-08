-- create extension if not exists "uuid-ossp";

-- CREATE TABLE carts (
-- 	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
-- 	user_id uuid NOT NULL,
-- 	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- 	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

-- DROP TABLE carts;

-- CREATE TABLE cart_items (
--     id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     cart_id uuid,
--     items_count integer,
--     foreign key ("cart_id") references "carts" ("id")
-- );

-- DROP TABLE cart_items;

-- INSERT INTO carts (created_at, updated_at, user_id) values 
-- ('2022-12-01', '2022-12-01', '2b69dc63-7148-4056-b7ba-c0ff262dffb0'),
-- ('2022-12-02', '2022-12-02', '2b69dc63-7148-4056-b7ba-c0ff262dffb0'),
-- ('2022-12-02', '2022-12-06', '2b69dc63-7148-4056-b7ba-c0ff262dffb0')
-- ;

-- insert into cart_items (cart_id, items_count) values
-- ('df5872f3-1af9-487f-808b-b77597f4d385', 10),
-- ('df5872f3-1af9-487f-808b-b77597f4d385', 5),
-- ('e732bf62-c2f7-4fc1-9c01-905ce2ab7517', 50)
-- ;