insert into users
(username, email, password, budget)
values (${username}, ${email}, ${hashedPassword}, ${budget})
returning *;
