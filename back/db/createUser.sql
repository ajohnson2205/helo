INSERT INTO users
(email, authid, firstname, lastname, picture)
VALUES($1, $2, '', '', $3)
RETURNING *;
