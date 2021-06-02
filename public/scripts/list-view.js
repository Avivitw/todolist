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
      });
  }

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
      <button>
      <button>
    </div>`;
    let $editForm = $(editForm);
    $el.parent().after($editForm).slideUp();
    $editForm.slideDown();
  }




  // Create the to-do list html items
  const createRows = function (listName) {
    $.ajax(`/api/items/${listName}`, {
      method: "GET",
      dataType: "json"
    })
    .then((listItems)=>{
      console.log(listItems);
      let $todoList = $(".todo-list");
      for (const item of listItems) {
        let boxStyle = "fa-square";
        if (item.is_checked) {
          boxStyle = "fa-check-square";
        }
        let starStyle = "";
        if(item.priority){
          starStyle = "fas";
        }
        // Appends a new element to the list container
        let $todoItem = $(`<div class='todo-item'>
        <i class="check-box fas ${boxStyle} fa-lg"></i>
        <i class="priority-star far fa-star ${starStyle}"></i>
        <p>${item.name}</p>
        <i class="edit-icon far fa-edit"></i>
        </div>`);

        $todoItem.find(".check-box").click(function () {
          handleCheckBoxClick($(this), item);
        });
        $todoItem.find("i.priority-star").click(function() {
          handlePriorityIconClick($(this), item);
        });
        $todoItem.find("i.edit-icon").click(function() {
          handleEditIconClick($(this), item, listName);
        });
        $todoList.append($todoItem);
      }
    });
  };

  // Slide down the list view when the icon is clicked
  $(".collapse-icon").click(function () {
    $(".page").slideDown();
    $(".todo-item").remove();
  });


    // Slide down the list view when the Edit icon is clicked
    $(".fa-edit").click(function () {
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
