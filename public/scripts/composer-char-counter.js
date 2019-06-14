$(document).ready(function() {
  // --- our code goes here ---

  $("#compose-tweet-input").on('keyup', function(){
    const $textInput = $(this);
    const $textInputLength = $textInput.val().length;
    const $counter = $textInput.siblings(".counter");
    $counter[0].innerHTML = 140 - $textInputLength
    if ($textInputLength > 140) {
      $counter.addClass("red")
    } else {
      $counter.removeClass("red")
    }
  })

});