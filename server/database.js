const db = require('./dbconnect');

// Example from lightBNB
const getUserWithEmail = function(email) {
  const query = db.query(
    `SELECT *
    FROM users
    WHERE email LIKE $1;`, [email])
  .then(res=>{
    return res.rows[0];
  })
  .catch(err=>{console.log(err)});
  return query;
};

exports.getUserWithEmail = getUserWithEmail;

// functions that we are going to need

// getUserItems = query the DB for all rows for a user

