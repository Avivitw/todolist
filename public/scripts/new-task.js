$(document).ready(function(){
  let appended = false;

  const addButton = function() {
    const text = $('.new-task-text').val();
    if (text.length > 0 && !appended) {
      $('.new-todo').append(`<button class='add-task-button'for='new-todo-form'type="submit"><i class="fas fa-plus"></i></button>`);
      $('.add-task-button').click(()=>{
        // Listener for the add task button
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

  $('.add-task-button').click(()=>{
    console.log('add clicked');
    // $.ajax({
    //   url:"https://api.monkeylearn.com/v3/classifiers/cl_o46qggZq/classify/",
    //   method:"POST",
    //   data: ["Grapefruit"],
    //   beforeSend: function (xhr) {
    //     xhr.setRequestHeader("Authorization", "Token " + "11284b94944fd21cd3e16ad2771c02106ec38995");
    //   }
    // });
  })
});
