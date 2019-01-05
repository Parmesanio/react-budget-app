insert into users
(auth0_id, name, email, picture, budget)
values (${auth0Id}, ${name}, ${email}, ${picture}, ${budget})
returning *;
