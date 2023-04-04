$(function () {
  var $Navbar = $("#Navbar");
  var scrollSize = 800; //超えると表示
  $(window).on("load scroll", function () {
    var value = $(this).scrollTop();
    if (value > scrollSize) {
      $Navbar.addClass("scroll");
    } else {
      $Navbar.removeClass("scroll");
    }
  });
});