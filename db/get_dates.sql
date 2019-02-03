select distinct TO_CHAR(budget_items.created_at :: DATE, 'Mon yyyy')
FROM budget_items
WHERE (SELECT min(TO_CHAR(budget_items.created_at :: DATE, 'Mon yyyy')) from budget_items) < (SELECT max(TO_CHAR(budget_items.created_at :: DATE, 'Mon yyyy')) from budget_items) and user_id=${userId} order by to_char asc;