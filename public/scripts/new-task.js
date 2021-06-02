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

  const messageBox = function(addedItem) {
    // Need to get the google data as a response to the post api request
    const msg = `<h1>Added ${addedItem} to eat list<i class="check-icon fas fa-check-circle"></i></h1>`
    $('.user-msg').append(msg);
    setTimeout(()=>{
    $('.user-msg').fadeOut();
    }, 3000)
  };


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
    }).then((res)=> {
      console.log('ajax success function was called');
      console.log('full text', fullText);
      $('.new-task-text').val("");
      $('.add-task-button').hide();
      messageBox(fullText);
    })
  });

});
