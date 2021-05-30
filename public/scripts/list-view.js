$(document).ready(function(){
  // Dummy data for to do lists
  const lists = {
    "eat": {
      "title": "Eat List",
      "item1": {
        "name": "Spaghetti",
        "checkedOff": false
      },
      "item2": {
        "name": "Wendy's",
        "checkedOff": false
      },
      "item3": {
        "name": "McDonalds",
        "checkedOff": false
      }
    },
    "buy": {
      "title": "Shopping List",
      "item1": {
        "name": "Soccer Ball",
        "checkedOff": false
      },
      "item2": {
        "name": "New camping gear",
        "checkedOff": false
      },
      "item3": {
        "name": "That new Xbox game",
        "checkedOff": false
      }
    },
    "watch": {
      "title": "Watch List",
      "item1": {
        "name": "The Titanic",
        "checkedOff": false
      },
      "item2": {
        "name": "Home Alone 2",
        "checkedOff": false
      },
      "item3": {
        "name": "Superbad",
        "checkedOff": false
      }
    },
    "read": {
      "title": "Reading List",
      "item1": {
        "name": "Moby Dick",
        "checkedOff": false
      },
      "item2": {
        "name": "The Great Gatsby",
        "checkedOff": false
      },
      "item3": {
        "name": "To Kill a Mockingbird",
        "checkedOff": false
      }
    }
  }
  console.log(lists);

  // Slide down the list view when the icon is clicked
  $('.collapse-icon').click(function() {
    console.log('click handled');
    $('.page').slideDown();
  });

  // Set the title of the list view
  $('#eat-list').click(function() {
    $('.list-title').html(lists.eat.title);
  });
  $('#read-list').click(function() {
    $('.list-title').html(lists.read.title);
  });
  $('#watch-list').click(function() {
    $('.list-title').html(lists.watch.title);
  });
  $('#buy-list').click(function() {
    $('.list-title').html(lists.buy.title);
  });
});
