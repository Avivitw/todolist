$(document).ready(function() {

  const changeCount = function(listType, count) {
    $(`#${listType}`).text(`${count} Items`);
  };

  const retrieveListCount = function() {
    $.ajax(`/api/get-list-count`, {
      method: "GET"
    }).then((res)=> {
      for (const list of res) {
        let listCount = list.count;
        let listType = list.list_type;
        changeCount(listType, listCount);
      }
    })
  };

  retrieveListCount();
  window.retrieveListCount = retrieveListCount;
})
