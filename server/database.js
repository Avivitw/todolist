const db = require('./dbconnect');

// Get all the lists for a user
const getAllMyLists = function(userId) {
  const query = db.query(
    `SELECT name, description,priority, is_checked
    FROM lists
    JOIN users On lists.user_id = users.id
    Where users.id = $1;
    GROUP BY list_type
    LIMIT 4
    ORDER BY lists.id DESC
    ;`, [userId])
  .then(res=>{
    return res.rows;
  })
  .catch(err=>{console.log(err)});
  return query;
};

//Get a specific list for a user
const getList = function(userId, listType) {
  const query = db.query(
    `SELECT name, description,priority, is_checked
    FROM lists
    JOIN users On lists.user_id = users.id
    Where users.id = $1
    AND list_type = $2
    GROUP BY list_type
    LIMIT 4
    ORDER BY lists.id DESC;`, [userId, listType])
  .then(res=>{
    return res.rows;
  })
  .catch(err=>{console.log(err)});
  return query;
};

//Insert an item to a list
const insertToDoITEm = function(property) {
  const query = db.query(
    ` INSERT INTO lists(name)
    VALUES($1)
    RETURNING *;`, [property.name])
  .then(res=>{
    return res.rows;
  })
  .catch(err=>{console.log(err)});
  return query;
};

//update an item to in a list
const updateItem = function(userId, listType, listId) {
  const query = db.query(
    `UPDATE  lists
    SET list_type = $2
    WHERE users.id = $1
    AND lists.id = $3
    RETURNING *;
    `, [userId, listType, listId])
  .then(res=>{
    return res.rows;
  })
  .catch(err=>{console.log(err)});
  return query;
};


exports.getAllMyLists = getAllMyLists;
exports.getList = getList;
exports.insertToDoITEm = insertToDoITEm;



