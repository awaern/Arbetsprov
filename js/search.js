
$(function() {

  // Remove list item
  $(document).on('click','.remove', function() {
    $(this).parent().remove();
  });
 
  // Append search result to list
  function searchResult( message ) {
    var date = new Date();
    $( '<li>' ).html('<span class="title">' + message + '</span>' + '<span class="date">' + date.toLocaleString() + '</span>' + '<span class="remove"></span>').prependTo( '.result-list' );
    $( 'result-list' ).scrollTop( 0 );
  }

  $( '#search' ).autocomplete({
    source: function( request, response ) {
      $.ajax({
        url: "https://api.instagram.com/v1/tags/search?q=" + request.term + "&access_token=266700136.1677ed0.bf22fd0f700e4c19bbd96270789a52ae",
        dataType: "jsonp",
        data: {
          q: request.term
        },
        success: function( data ) {
          response($.map(data.data, function(item){
            return {
              label: item.name,
              value: item.name
            };
          }));
        }
      });
    },
    minLength: 3,
    select: function( event, ui ) {
      searchResult( ui.item ?
        ui.item.label :
        "Nothing selected, input was " + this.value);
    }
  });
});
