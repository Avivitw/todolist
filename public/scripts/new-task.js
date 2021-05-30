$(document).ready(function(){
  let appended = false;

  const addButton = function() {
    const text = $('.new-task-text').val();
    if (text.length > 0 && !appended) {
      $('.new-todo').append(`<button class='add-task-button'for='new-todo-form'type="submit">Add</button>`);
      appended = true;
    }
    if (text.length === 0) {
      $('.add-task-button').remove();
      appended = false;
    }
  }

  $('.new-task-text').keydown(addButton);
  $('.new-task-text').keyup(addButton);
});
