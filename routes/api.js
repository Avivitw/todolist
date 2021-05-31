/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getList, getAllMyLists, insertToDoItem, updateItem } = require('../server/database');
const userId = 1;

module.exports = function(database) {
  // Request made when showing the eat list
  router.get('/eat', (req, res) => {
    getList(userId, 'e')
    .then((queryResults)=>{
      // Send the query results to the front end as json
      res.json(queryResults);
      console.log('API get request results:', queryResults);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.get('/buy', (req, res) => {
    getList(userId, 'b')
    .then((queryResults)=>{
      // Send the query results to the front end as json
      res.json(queryResults);
      console.log(queryResults);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.get('/watch', (req, res) => {
    getList(userId, 'w')
    .then((queryResults)=>{
      // Send the query results to the front end as json
      res.json(queryResults);
      console.log(queryResults);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.get('/read', (req, res) => {
    getList(userId, 'r')
    .then((queryResults)=>{
      // Send the query results to the front end as json
      res.json(queryResults);
      console.log(queryResults);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.get('/all-lists', (req, res) => {
    getAllMyLists(userId)
    .then((queryResults)=>{
      // Send the query results to the front end as json
      res.json(queryResults);
      console.log(queryResults);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.post('/add-item', (req, res) => {
    insertToDoItem(req.body)
    .then(property => {
      res.send(property);
    })
    .catch(e=>{
      console.log(e);
      res.send(e);
    })
  })

  router.post('/update-item/:userid/:itemid', (req, res) => {
    const listType = req.params.userid;
    const itemId = req.params.itemid;
    updateItem(userId, listType, itemId)
    .then(property => {
      res.send(property);
    })
    .catch(e=>{
      console.log(e);
      res.send(e);
    })
  });

  return router;
};
