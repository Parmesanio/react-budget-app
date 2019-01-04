insert into budget_items
(title, amount, color, user_id)
values (${title}, ${amount}, ${color}, ${userId});
select * from budget_items where user_id = ${userId};