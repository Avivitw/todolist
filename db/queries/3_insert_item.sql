`INSERT INTO lists(name, description, list_type)
VALUES($1, $2, $3)
RETURNING *;
`;

