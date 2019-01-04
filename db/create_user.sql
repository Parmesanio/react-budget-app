insert into users
(auth0_id, name, email, picture)
values (${auth0Id}, ${name}, ${email}, ${picture})
returning *;
