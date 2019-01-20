-- Randomize IDs
-- Taken from http://wiki.postgresql.org/wiki/Pseudo_encrypt
CREATE OR REPLACE FUNCTION pseudo_encrypt(VALUE int) returns bigint AS $$
DECLARE
l1 int;
l2 int;
r1 int;
r2 int;
i int:=0;
BEGIN
 l1:= (VALUE >> 16) & 65535;
 r1:= VALUE & 65535;
 WHILE i < 3 LOOP
   l2 := r1;
   r2 := l1 # ((((1366.0 * r1 + 150889) % 714025) / 714025.0) * 32767)::int;
   l1 := l2;
   r1 := r2;
   i := i + 1;
 END LOOP;
 RETURN ((l1::bigint << 16) + r1);
END;
$$ LANGUAGE plpgsql strict immutable;
-- create sequence random_int_seq;
create function make_random_id() returns bigint as $$
  select pseudo_encrypt(nextval('random_int_seq')::int)
$$ language sql;

-- User
create table users (
    id bigint primary key default make_random_id(),
    username text,
    email text,
    password text,
    budget int,
    created_at date not null default current_date
);
CREATE SEQUENCE users_id_seq OWNED BY users.id;
select * from users

-- Budget Items
create table budget_items (
    id bigint primary key default make_random_id(),
    title text,
    amount int,
    color text,
    user_id int references users(id),
    created_at date not null default current_date
)
CREATE SEQUENCE budget_items_id_seq OWNED BY budget_items.id;
select * from budget_items