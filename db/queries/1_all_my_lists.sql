SELECT name, description,priority, is_checked
FROM lists
JOIN users On lists.user_id = users.id
Where users.id = 1
GROUP BY list_type
LIMIT 4
ORDER BY lists.id DESC
;
