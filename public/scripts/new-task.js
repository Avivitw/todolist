$(document).ready(function(){
  let appended = false;

  const addButton = function() {
    const text = $('.new-task-text').val();
    if (text.length > 0 && !appended) {
      $('.new-todo').append(`<button class='add-task-button'for='new-todo-form'type="submit"><i class="fas fa-plus"></i></button>`);
      $('.add-task-button').click(()=>{
        const fullText = $('.new-task-text').val();
        const encodedText = encodeURIComponent(fullText);
        $.ajax(`/api/add-item/${fullText}`, {
          method: "POST",
          data: {
            name: fullText
          }
        });
      })
      appended = true;
    }
    if (text.length === 0) {
      $('.add-task-button').remove();
      appended = false;
    }
  }



  // Listeners to show the add task button
  $('.new-task-text').keydown(addButton);
  $('.new-task-text').keyup(addButton);

});
