$(document).ready(function(){

  const addButton = function() {
    const text = $('.new-task-text').val();
    if (text.length > 0 ) {
      $('.add-task-button').show();
    }
    else {
      $('.add-task-button').hide();
    }
  }

  // Listeners to show the add task button
  $('.new-task-text').keyup(addButton);

  $('.add-task-button').click(()=>{
    const fullText = $('.new-task-text').val();
    const encodedText = encodeURIComponent(fullText);
    $.ajax(`/api/add-item/${encodedText}`, {
      method: "POST",
       data: {
        name: fullText
      }
    }).then(()=> {
      console.log('ajax success function was called');
      $('.new-task-text').val("");
      $('.add-task-button').hide();

    })
  });

});
