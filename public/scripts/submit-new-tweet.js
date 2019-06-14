$(document).ready(function() {
  $("form").submit(function(e) {
    e.preventDefault();
    
    const $tweetValue = $('#compose-tweet-input').val();

    switch (true) {
      case $tweetValue.length === 0:
        $("#compose-tweet-error").html( "<h4>Nothing to tweet!</h4>" ).addClass("red");
        break;
      case $tweetValue.length > 140:
          $("#compose-tweet-error").html( "<h4>Tweet too big!</h4>" ).addClass("red");
        break;
      case $tweetValue.length <= 140:
        submitTweet();
        break;
    }

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
  });
});