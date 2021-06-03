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
    console.log(addedItem.listType);
    let listName = 'u';
    if (addedItem.listType === 'e') {
      listName = 'eat';
    };
    if (addedItem.listType === 'r') {
      listName = 'read';
    };
    if (addedItem.listType === 'w') {
      listName = 'watch';
    };
    if (addedItem.listType === 'b') {
      listName = 'shopping';
    };
    let msg = `<h1>Added ${addedItem.name} to ${listName} list<i class="check-icon fas fa-check-circle"></i></h1>`
    if (addedItem.listType === 'u') {
      msg = `<h1>Couldn't categorize, not added to list<i class="fas fa-times-circle"></i></h1>`
    }
    // Need to get the google data as a response to the post api request
    $('.user-msg').append(msg);
    setTimeout(()=>{
    $('.user-msg').fadeOut(()=>{
      $('.user-msg').css("display", "flex");
      $('.user-msg').empty();
    });
    }, 3000)
  };

  const taskAddedAnimation = function(){
    $('#eat-list').css({
      "background-color": "#2B394A",
      "color": "white",
      "box-shadow": "none"
    })
    setTimeout(()=>{
      $('#eat-list').css({
        "background-color": "white",
        "color": "#2B394A",
        "box-shadow": "12px 12px rgb(187, 187, 187)"
      })
    }, 350)
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
      const listType = res.listType;
      console.log(res);
      window.retrieveListCount(listType);
      console.log('json response', res);
      console.log('ajax success function was called');
      console.log('full text', fullText);
      $('.new-task-text').val("");
      $('.add-task-button').hide();
      messageBox(res);
    })
  });

});
