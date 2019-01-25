update users
set budget = 0
where id = 1821603273;

delete from budget_items where user_id = 1821603273;