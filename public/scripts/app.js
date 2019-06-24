$(document).ready(function () {

  // Loads all tweets from DB by sending
  // AJAX GET '/tweets' back to server
  loadTweets();

  // TToggles visibility of add new tweet element
  // Event listener on the Compose button on the header
  $("#compose-new-tweet").addClass("display-none");
  $(".compose-button").on( "click", () => {
    $(".compose-tweet").slideToggle({
      duration: 200,
      complete: function() {
        $("#compose-tweet-input").focus();
      }
    });
  });
  
});

// Creates a tweet list of elements from list of tweets
function renderTweets(tweets) {
  $('#tweets-container').empty();
  tweets.forEach((entry) => {
    let $tweet = createTweetElement(entry);
    $('#tweets-container').prepend($tweet);
  })
}

// Get Request to retrieve tweet array from DB
function loadTweets() {
  $.ajax({
    type: 'GET',
    url: `/tweets`,
    dataType: 'JSON'
  })
  .done((tweets) => renderTweets(tweets));
}


