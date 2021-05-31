$(document).ready(function () {
  // Dummy data for to do lists
  const lists = {
    eat: {
      title: "Eat List",
      items: [
        {
          name: "Spaghetti",
          checkedOff: false,
        },
        {
          name: "Wendy's",
          checkedOff: false,
        },
        {
          name: "McDonalds",
          checkedOff: false,
        },
      ],
    },
    buy: {
      title: "Shopping List",
      items: [
        {
          name: "Soccer Ball",
          checkedOff: false,
        },
        {
          name: "New camping gear",
          checkedOff: false,
        },
        {
          name: "That new Xbox game",
          checkedOff: false,
        },
      ],
    },
    watch: {
      title: "Watch List",
      items: [
        {
          name: "The Titanic",
          checkedOff: false,
        },
        {
          name: "Home Alone 2",
          checkedOff: false,
        },
        {
          name: "Superbad",
          checkedOff: false,
        },
      ],
    },
    read: {
      title: "Reading List",
      items: [
        {
          name: "Moby Dick",
          checkedOff: false,
        },
        {
          name: "The Great Gatsby",
          checkedOff: false,
        },
        {
          name: "To Kill a Mockingbird",
          checkedOff: false,
        },
      ],
    },
  };
  // Controls the checkmark of each generated box
  const checkBox = function (id, list) {
    const index = id.slice(9);
    let $el = $(`#${id}`).toggleClass("fa-square fa-check-square");
    if ($el.hasClass("fa-square")) {
      list.items[index].checkedOff = false;
    }
  };

  // Create the to-do list html items
  const createRows = function (listName) {
    $.ajax(`/api/items/${listName}`, {
      method: "GET",
      dataType: "json"
    })
    .then((listItems)=>{
      let id = 0;
      console.log(listItems);
      for (const item of listItems) {
        let boxStyle = "fa-square";
        if (item.checkedOff) {
          boxStyle = "fa-check-square";
        }
        // Appends a new element to the list container
        $(".todo-list").append(
          `<div id='todo-${id}'class='todo-item'>
            <i id='checkbox-${id}'class="check-box fas ${boxStyle} fa-lg"></i>
            <p>${item.name}</p>
          </div>`
        );
        id++;
      }
      return id;
    });
  };

  // Slide down the list view when the icon is clicked
  $(".collapse-icon").click(function () {
    $(".page").slideDown();
    $(".todo-item").remove();
  });

  // Set the title of the list view
  $("#eat-list").click(function () {
    $(".list-title").html(lists.eat.title);
    // Create the to-do list html items and add them to the page
    createRows('eat');
    // Checkbox controls
    $(".check-box").click(function () {
      const id = this.id;
      const index = id.slice(9);
      lists.eat.items[index].checkedOff = true;
      checkBox(id, lists.eat);
    });
  });
  $("#read-list").click(function () {
    $(".list-title").html(lists.read.title);
    createRows('read');
    // Checkbox controls
    $(".check-box").click(function () {
      const id = this.id;
      const index = id.slice(9);
      lists.eat.items[index].checkedOff = true;
      let state = checkBox(id, lists.read);
    });
  });
  $("#watch-list").click(function () {
    $(".list-title").html(lists.watch.title);
    createRows('watch');
    // Checkbox controls
    $(".check-box").click(function () {
      const id = this.id;
      const index = id.slice(9);
      lists.eat.items[index].checkedOff = true;
      checkBox(id, lists.watch);
    });
  });
  $("#buy-list").click(function () {
    $(".list-title").html(lists.buy.title);
    createRows('buy');
    // Checkbox controls
    $(".check-box").click(function () {
      const id = this.id;
      const index = id.slice(9);
      lists.eat.items[index].checkedOff = true;
      checkBox(id, lists.buy);
    });
  });
});
