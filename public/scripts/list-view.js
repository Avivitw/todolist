$(document).ready(function () {
  // Dummy data for to do lists
  const lists = {
    eat: {
      title: "Eat List",
      buttonId: "#eat-list",
      code: "e"
    },
    buy: {
      title: "Shopping List",
      buttonId: "#buy-list",
      code: "b"
    },
    watch: {
      title: "Watch List",
      buttonId: "#watch-list",
      code: "w"
    },
    read: {
      title: "Reading List",
      buttonId: "#read-list",
      code: "r"
    },
  };
  // Controls the checkmark of each generated box
  const handleCheckBoxClick = function ($el, item) {
    $el.toggleClass("fa-square fa-check-square");
      //Send to server
      $.ajax(`/api/update-item/${item.id}`, {
        method: "POST",
        data: {isChecked:$el.hasClass("fa-check-square") }
      });
  };

  //Controls the star button - priority
  const handlePriorityIconClick = function($el, item) {
    $el.toggleClass("fas");
      //Send to server
      $.ajax(`/api/update-item/${item.id}`, {
        method: "POST",
        data: {priority:$el.hasClass("fas") }
      }).then((res)=>{
        const isPriority = res[0].priority;
        const itemToMove = $el.parent('div');
        // Passed the item that needs to move and if it has priority checked off already
        movePriorityItemToTop(itemToMove, isPriority);
      });
  };

  // Moves row to top when priority icon is clicked
  const movePriorityItemToTop = function($item, isPriority) {
    if (isPriority) {
      $item.slideUp(()=>{
        $('.todo-list').prepend($item);
      });
      $item.slideDown();
    }
  };

  //Controls the edit icon
  const handleEditIconClick = function($el, item, listName) {
    let editForm = `<div class='todo-item edit-item' style="display:none;">
      <textarea name="editname" class="edit-task-text">${item.name}</textarea>
      <select name="listType" id="list-select">`
      for(const k in lists){
        let selected = '';
        if(k === listName) {
          selected = 'selected="selected" '
        }
        editForm += `<option ${selected}value="${lists[k].code}">${lists[k].title}</option>`;
      }
      editForm += `</select>
      <button class="cancel">Cancel</button>
      <button class="save">Save</button>
    </div>`;
    let $editForm = $(editForm);
    $el.parent().after($editForm).slideUp();
    $editForm.slideDown();
    $editForm.find("button.cancel").click(function() {
      $editForm.slideUp(function() {$editForm.remove()});
      $el.parent().slideDown();
    });
    $editForm.find("button.save").click(function() {
      //Send to the server
      $.ajax(`/api/update-item/${item.id}`, {
        method: "POST",
        data: {name:$editForm.find(".edit-task-text").val(), listType:$editForm.find("#list-select").val()}
      }).then(function() {
        $(".todo-item").remove();
        createRows(listName);
      })
    });
  }

  const drawRows = function (listItems, listName) {
    let $todoList = $(".todo-list");
    for (const item of listItems) {
      let boxStyle = "fa-square";
      if (item.is_checked) {
        boxStyle = "fa-check-square";
      }
      let starStyle = "";
      if (item.priority){
        starStyle = "fas";
      }
      let historyClass = '';
      if (!listName) {
        historyClass = "history-item";
      }
      // Appends a new element to the list container
      let $todoItem = $(`<div class='todo-item ${historyClass}'>
      <i class="check-box fas ${boxStyle} fa-lg"></i>
      <i class="priority-star far fa-star ${starStyle}"></i>
      <p>${item.name}</p>
      <i class="edit-icon far fa-edit"></i>
      </div>`);

      $todoItem.find(".check-box").click(function () {
        handleCheckBoxClick($(this), item);
      });
      if (listName) {
        $todoItem.find("i.priority-star").click(function() {
          handlePriorityIconClick($(this), item);
        });
        $todoItem.find("i.edit-icon").click(function() {
          handleEditIconClick($(this), item, listName);
        });
      }
      $todoList.append($todoItem);
    }
  }


  // Create the to-do list html items
  const createRows = function (listName) {
    $.ajax(`/api/items/${listName}`, {
      method: "GET",
      dataType: "json"
    })
    .then((listItems)=>{
      drawRows(listItems, listName);
    });
  };

  // Slide down the list view when the icon is clicked
  $(".collapse-icon").click(function () {
    window.retrieveListCount('e');
    window.retrieveListCount('r');
    window.retrieveListCount('w');
    window.retrieveListCount('b');
    $(".page").slideDown();
    $(".todo-item").remove();
  });

  //register click handler for button-id per list name
  const registerListButtonClick = function(listName) {
    let listObj = lists[listName];
    $(listObj.buttonId).click(function () {
      $(".list-title").text(listObj.title);
      // Create the to-do list html items and add them to the page
      createRows(listName);
      $(".page").slideUp();
    });

  };
  registerListButtonClick('eat');
  registerListButtonClick('buy');
  registerListButtonClick('watch');
  registerListButtonClick('read');

  // register history-list handler
  $('.nav-icon').click(function() {
    $.ajax(`/api/history-list`, {
      method: "GET",
      dataType: "json"
    })
    .then((listItems)=>{
      $(".list-title").text('History');
      //clear rows if exist
      $(".todo-item").remove();
      drawRows(listItems)
      $(".page").slideUp();
    });
  });

});
