$(document).ready(function() {

  const changeCount = function(listType, count) {
    $(`#${listType}`).text(`${count} Items`);
  };

  const retrieveListCount = function(listType) {
    $.ajax(`/api/get-list-count/${listType}`, {
      method: "GET"
    }).then((res)=> {
      console.log(res);
      const listCount = res[0].count;
      console.log("count", res[0].count);
      changeCount(listType, listCount);
    })
  };

  retrieveListCount('e');
  retrieveListCount('r');
  retrieveListCount('w');
  retrieveListCount('b');

  window.retrieveListCount = retrieveListCount;
})
