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
