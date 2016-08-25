$(document).foundation();

$('#search').click(function() {
  $('#search-container').on('open.zf.reveal', function() {
    $('#search-input').focus();
  });
});