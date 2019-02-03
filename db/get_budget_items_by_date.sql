select * 
from budget_items 
where TO_CHAR(budget_items.created_at :: DATE, 'Mon') = ${month} 
and TO_CHAR(budget_items.created_at :: DATE, 'yyyy') = ${year} and user_id = ${userId} order by amount desc;