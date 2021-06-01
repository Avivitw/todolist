$(document).ready(function () {
  // Dummy data for to do lists
  const lists = {
    eat: {
      title: "Eat List",
      buttonId: "#eat-list"
    },
    buy: {
      title: "Shopping List",
      buttonId: "#buy-list"
    },
    watch: {
      title: "Watch List",
      buttonId: "#watch-list"
    },
    read: {
      title: "Reading List",
      buttonId: "#read-list"
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


  const showList = function(listName) {
    let listObj = lists[listName];
    $(listObj.buttonId).click(function () {
      $(".list-title").html(listObj.title);
      // Create the to-do list html items and add them to the page
      createRows(listName);
      // Checkbox controls
      $(".check-box").click(function () {
        const id = this.id;
        const index = id.slice(9);
        lists.eat.items[index].checkedOff = true;
        checkBox(id, lists.eat);
      });
      $(".page").slideUp();
    });

  };
  showList('eat');
  showList('buy');
  showList('watch');
  showList('read');


});
