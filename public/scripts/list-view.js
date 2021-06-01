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
  const handleCheckBoxClick = function ($el) {
    $el.toggleClass("fa-square fa-check-square");
      //Send to server
      $.ajax(`/api/update-item/${$el.attr('data-id')}`, {
        method: "POST",
        data: {isChecked:$el.hasClass("fa-check-square") }
      });
  };

  // Create the to-do list html items
  const createRows = function (listName) {
    $.ajax(`/api/items/${listName}`, {
      method: "GET",
      dataType: "json"
    })
    .then((listItems)=>{
      console.log(listItems);
      for (const item of listItems) {
        let boxStyle = "fa-square";
        if (item.is_checked) {
          boxStyle = "fa-check-square";
        }
        // Appends a new element to the list container
        $(".todo-list").append(
          `<div class='todo-item'>
            <i data-id="${item.id}" class="check-box fas ${boxStyle} fa-lg"></i>
            <p>${item.name}</p>
          </div>`
        );
      }
      $(".check-box").click(function () {
        handleCheckBoxClick($(this));
      });
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
      $(".page").slideUp();
    });

  };
  showList('eat');
  showList('buy');
  showList('watch');
  showList('read');


});
