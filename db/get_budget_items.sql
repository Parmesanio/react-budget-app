-- select * from budget_items_function(${userId}, ${month}, ${year});
insert into budget_items
(title, amount, color, user_id, spent, active)
select title, amount, color, user_id, 0, active from budget_items where user_id = ${userId} and extract(month from current_date) != extract(month from created_at) and active = true;
update budget_items set active = false where user_id = ${userId} and extract(month from current_date) != extract(month from created_at) and active = true;

select * from budget_items where user_id = ${userId} 
and extract(month from created_at) = extract(month from current_date)
and extract(year from created_at) = extract(year from current_date) order by amount desc;