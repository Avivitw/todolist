UPDATE  lists
SET list_type = value1
WHERE users.id = 1
AND lists.id = 1
RETURNING *;






