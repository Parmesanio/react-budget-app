delete from budget_items where id = $1;

select * from budget_items where user_id = $2
and extract(month from created_at) = extract(month from current_date)
and extract(year from created_at) = extract(year from current_date) order by amount desc;