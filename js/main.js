function toggleSearch() {
  $('#search').click(function() {
    $('#search-container').toggleClass("show-for-sr");
    $('#search-input').focus();
  });
}