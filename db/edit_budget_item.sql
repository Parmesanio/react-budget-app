update budget_items
set title = ${title}, color = ${color}, amount = ${amount}, spent = ${spent}
where id = ${id};
select * from budget_items where user_id = ${user_id} ORDER BY amount DESC;