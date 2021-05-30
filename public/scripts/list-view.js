$(document).ready(function(){
  // Dummy data for to do lists
  const lists = {
    "eat": {
      "title": "Eat List",
      "items": [
        {
        "name": "Spaghetti",
        "checkedOff": false
      },
      {
        "name": "Wendy's",
        "checkedOff": false
      },
      {
        "name": "McDonalds",
        "checkedOff": false
      }
    ]
    },
    "buy": {
      "title": "Shopping List",
      "items": [
        {
        "name": "Soccer Ball",
        "checkedOff": false
      },
      {
        "name": "New camping gear",
        "checkedOff": false
      },
      {
        "name": "That new Xbox game",
        "checkedOff": false
      }
    ]
    },
    "watch": {
      "title": "Watch List",
      "items": [
        {
        "name": "The Titanic",
        "checkedOff": false
      },
      {
        "name": "Home Alone 2",
        "checkedOff": false
      },
      {
        "name": "Superbad",
        "checkedOff": false
      }
    ]
    },
    "read": {
      "title": "Reading List",
      "items": [
        {
        "name": "Moby Dick",
        "checkedOff": false
      },
      {
        "name": "The Great Gatsby",
        "checkedOff": false
      },
      {
        "name": "To Kill a Mockingbird",
        "checkedOff": false
      }
    ]
    }
  }
  // Create the to-do list html items
  const createRows = function(list) {
    for (const item of list) {
      $('.todo-list').append(
        `<div class='todo-item'>
        <i class="check-box fas fa-square fa-lg"></i>
        <p>${item.name}</p>
      </div>`);
  };
};

  // Slide down the list view when the icon is clicked
  $('.collapse-icon').click(function() {
    $('.page').slideDown();
    $('.todo-item').remove();
  });

  // Set the title of the list view
  $('#eat-list').click(function() {
    $('.list-title').html(lists.eat.title);
    // Create the to-do list html items and add them to the page
    createRows(lists.eat.items);
  });
  $('#read-list').click(function() {
    $('.list-title').html(lists.read.title);
    createRows(lists.read.items);
  });
  $('#watch-list').click(function() {
    $('.list-title').html(lists.watch.title);
    createRows(lists.watch.items);
  });
  $('#buy-list').click(function() {
    $('.list-title').html(lists.buy.title);
    createRows(lists.buy.items);
  });
});
