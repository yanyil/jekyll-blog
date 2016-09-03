$(document).ready(function($) {
  $(document).foundation();

  // carousel
  $('#carousel').slick({
    autoplay: true
  });

  // focus search input
  $('#search, #mobile-search').click(function() {
    $('#search-container').on('open.zf.reveal', function() {
      $('#search-input').focus();
    });
  });

  // smooth scrolling
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 800);
        return false;
      }
    }
  });
});