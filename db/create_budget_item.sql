insert into budget_items
(title, amount, color, spent, user_id)
values (${title}, ${amount}, ${color}, ${spent}, ${userId});
select * from budget_items where user_id = ${userId} ORDER BY amount DESC;;