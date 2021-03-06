insert into budget_items
(title, amount, color, spent, user_id)
values (${title}, ${amount}, ${color}, ${spent}, ${userId});

select * from budget_items where user_id = ${userId} 
and extract(month from created_at) = extract(month from current_date)
and extract(year from created_at) = extract(year from current_date) order by amount desc;