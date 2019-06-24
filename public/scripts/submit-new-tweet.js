$(document).ready(function() {

  // Event Listener on Submit new tweet button
  $("form").submit(function(e) {
    e.preventDefault();
    // Gets the text input from input
    const $tweetValue = $('#compose-tweet-input').val().trim();
    // Form validation for tweet length
    // to make sure value is not 0 or more than 140 character
    switch (true) {
      case $tweetValue.length === 0:
        $("#compose-tweet-error").html( "<h4>Nothing to tweet!</h4>" ).show().addClass("red");
        break;
      case $tweetValue.length > 140:
          $("#compose-tweet-error").html( "<h4>Tweet too big!</h4>" ).show().addClass("red");
        break;
      case $tweetValue.length <= 140:
        submitTweet();
        break;
    }
  });

  // Event listener on Submitting new tweet button
  // Counts the number of characters in the new tweet
  // adds a red css class to the Compose tweet element
  // if the number of characters increase above the limit
  $("#compose-tweet-input").on('change keyup', function(){
    const $textInput = $(this);
    const $textInputLength = $textInput.val().length;
    const $counter = $textInput.siblings(".counter");
    $counter[0].innerHTML = 140 - $textInputLength
    if ($textInputLength > 140) {
      $counter.addClass("red")
    } else {
      $counter.removeClass("red")
      $("#compose-tweet-error").hide()
    }
  })
});

// Sends an AJAX request to server with the new tweet
function submitTweet() {
  const $tweetMessage = $('#compose-tweet-input').serialize();
  $.ajax({
    type: 'POST',
    url: `/tweets`,
    data: $tweetMessage,
    success: function() {
      $("#compose-tweet-input").val('');
      $("#compose-tweet-error").empty().removeClass("red");
      loadTweets();
    }
  })
}