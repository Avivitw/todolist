const express = require('express');
const router  = express.Router();
const { googleSearch } = require('../categorize');
const { getList, getAllMyLists, insertToDoItem, updateItem, getHistoryList, getListCount } = require('../server/database');
const userId = 1;
const categories = {
  eat: "e",
  read: "r",
  watch: "w",
  buy: "b"};

module.exports = function(database) {

  router.get('/items/:category', (req, res) => {
    const category = categories[req.params.category];
    if (!category) {
      res.status(404).send('Sorry, we cannot find that!');
      return;
    }
    getList(userId, category)
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


  router.get('/history-list', (req, res) => {
    getHistoryList(userId)
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

  router.post('/add-item/:itemname', (req, res) => {
    const searchQuery = req.params.itemname;
    googleSearch(searchQuery)
    .then((response)=>{
      const name = req.body.name;
      const listType = response;
      const dbEntry = {
        name: name,
        listType: listType
      }
      res.json(dbEntry);
        insertToDoItem(dbEntry);
    }).catch(e=>{
      console.log(e);
    });
  })

  router.post('/update-item/:itemid', (req, res) => {
    const listType = req.body.listType;
    const listId = req.params.itemid;
    const name = req.body.name;
    const isChecked = req.body.isChecked;
    const priority = req.body.priority
    updateItem(listId, listType, name, isChecked, priority)
    .then(item => {
      res.send(item);
    })
    .catch(e=>{
      console.log(e);
      res.send(e);
    })
  });

  router.get('/get-list-count', (req, res) => {
    getListCount(userId)
    .then(item=>{
      res.send(item);
    })
    .catch(e=>{
      console.log(e);
      res.send(e);
    })
  })

  return router;
};
