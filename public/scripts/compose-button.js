$(document).ready(function () {
  $("#compose-new-tweet").addClass("display-none");
  // $(".compose-button").hover( () => {
  //   $(".compose-button").addClass("tinted");
  // }, () => {
  //   $(".compose-button").removeClass("tinted");
  // });

  $(".compose-button").on( "click", () => {

    $(".compose-tweet").slideToggle({
      duration: 300,
      complete: function() {
        $("#compose-tweet-input").focus();
      }
    });
  });
});