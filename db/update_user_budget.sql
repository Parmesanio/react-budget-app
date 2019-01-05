update users
set budget = ${budget}
where users.id = ${userId}
returning *;