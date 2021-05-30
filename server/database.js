const db = require('./dbconnect');

// Get all the lists for a user
const getAllMyLists = function(id) {
  const query = db.query(
    `SELECT name, description,priority, is_checked
    FROM lists
    JOIN users On lists.user_id = users.id
    Where users.id = $1;
    GROUP BY list_type
    LIMIT 4
    ORDER BY lists.id DESC
    ;`, [id])
  .then(res=>{
    return res.rows;
  })
  .catch(err=>{console.log(err)});
  return query;
};

//Get a specific list for a user
const getList = function(id, list_type) {
  const query = db.query(
    `SELECT name, description,priority, is_checked
    FROM lists
    JOIN users On lists.user_id = users.id
    Where users.id = $1
    AND list_type = $2
    GROUP BY list_type
    LIMIT 4
    ORDER BY lists.id DESC;`, [id, list_type])
  .then(res=>{
    return res.rows;
  })
  .catch(err=>{console.log(err)});
  return query;
};

//Insert an item to a list
const insertToDoITEm = function(property) {
  const query = db.query(
    ` INSERT INTO lists(name, description)
    VALUES($1, $2)
    RETURNING *;`, [property])
  .then(res=>{
    return res.rows;
  })
  .catch(err=>{console.log(err)});
  return query;
};

exports.getAllMyLists = getAllMyLists;
exports.getList = getList;
exports.insertToDoITEm = insertToDoITEm;



