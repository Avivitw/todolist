$(document).ready(function(){

  // Listeners to show the history list
  $('.nav-icon').click(function() {
    $.ajax(`/api/history-list`, {
      method: "GET",
      dataType: "json"
    })
    .then((listItems)=>{
      $(".list-title").html('History');
      $(".todo-item").remove();
      let $todoList = $(".todo-list");
      for (const item of listItems) {
        // Appends a new element to the list container
        let $todoItem = $(
        `<div class='todo-item'>
          <p>${item.name}</p>
        </div>`);
        $todoList.append($todoItem);
      }
      $(".page").slideUp();
    });
  });

});
